<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
require './menus/vendor/autoload.php'; // Stripe SDK
require './menus/db.php'; // Database connection

use Stripe\Stripe;
use Stripe\Checkout\Session as CheckoutSession;

if (!isset($_SESSION['restaurant_id'])) {
    header("Location: error_page.php?error=session_expired");
    exit();
}

if (!isset($_SESSION['package_id'])) {
    header("Location: error_page.php?error=no_package_selected");
    exit();
}

$restaurant_id = $_SESSION['restaurant_id'];
$package_id = $_SESSION['package_id'];

// Load Stripe key from environment variable
$stripeSecretKey = getenv('STRIPE_SECRET_KEY') ?: $_ENV['STRIPE_SECRET_KEY'] ?? '';
if (empty($stripeSecretKey)) {
    die('Error: STRIPE_SECRET_KEY not configured');
}
Stripe::setApiKey($stripeSecretKey);

if (isset($_GET['session_id'])) {
    $session_id = $_GET['session_id'];

    try {
        $checkout_session = CheckoutSession::retrieve($session_id);

        if ($checkout_session->payment_status === 'paid') {
            $current_date = new DateTime();
            $expiry_date = $current_date->modify('+1 month')->format('Y-m-d H:i:s');

            // Update subscription
            $stmt = $conn->prepare("UPDATE restaurant_tbl SET subscription_status = 'active', subscription_expiry_date = ?, package_id = ? WHERE restaurant_id = ?");
            $stmt->bind_param('sii', $expiry_date, $package_id, $restaurant_id);

            if (!$stmt->execute()) {
                error_log("Failed to update subscription: " . $stmt->error);
                header("Location: error_page.php?error=subscription_update_failed");
                exit();
            }

            // Promo code handling
            if (isset($_SESSION['promo_code'])) {
                $promo_code = $_SESSION['promo_code'];
                error_log("Promo Code: $promo_code, Restaurant ID: $restaurant_id");

                $promo_check_stmt = $conn->prepare("SELECT id FROM promo_code_usage_tbl WHERE restaurant_id = ? AND promo_code = ?");
                $promo_check_stmt->bind_param('is', $restaurant_id, $promo_code);

                if (!$promo_check_stmt->execute()) {
                    error_log("Promo check query execution failed: " . $promo_check_stmt->error);
                    header("Location: error_page.php?error=promo_check_failed");
                    exit();
                }

                $promo_check_result = $promo_check_stmt->get_result();

                if ($promo_check_result->num_rows > 0) {
                    $promo_update_stmt = $conn->prepare("UPDATE promo_code_usage_tbl SET used_count = used_count + 1, last_used_at = NOW() WHERE restaurant_id = ? AND promo_code = ?");
                    $promo_update_stmt->bind_param('is', $restaurant_id, $promo_code);

                    if (!$promo_update_stmt->execute()) {
                        error_log("Failed to update promo code usage: " . $promo_update_stmt->error);
                        header("Location: error_page.php?error=promo_update_failed");
                        exit();
                    }
                } else {
                    $promo_insert_stmt = $conn->prepare("INSERT INTO promo_code_usage_tbl (restaurant_id, promo_code, used_count, last_used_at) VALUES (?, ?, 1, NOW())");
                    $promo_insert_stmt->bind_param('is', $restaurant_id, $promo_code);

                    if (!$promo_insert_stmt->execute()) {
                        error_log("Failed to insert promo code usage: " . $promo_insert_stmt->error);
                        header("Location: error_page.php?error=promo_insert_failed");
                        exit();
                    }
                }

                unset($_SESSION['promo_code']);
            }

            header("Location: login.php");
            exit();
        } else {
            echo "Payment failed!";
        }
    } catch (\Stripe\Exception\InvalidRequestException $e) {
        error_log('Stripe Error: ' . $e->getMessage());
        echo 'Stripe Error: ' . $e->getMessage();
    } catch (Exception $e) {
        error_log('General Error: ' . $e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
} else {
    header("Location: error_page.php?error=no_session_id");
    exit();
}
