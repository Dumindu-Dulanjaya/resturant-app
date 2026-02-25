<?php
include './menus/db.php';

$response = ['status' => false, 'message' => 'Invalid promo code.'];

// Ensure restaurant_id is available in session
session_start();
if (!isset($_SESSION['restaurant_id'])) {
    $response['message'] = 'Restaurant is not logged in.';
    echo json_encode($response);
    exit();
}

$restaurant_id = $_SESSION['restaurant_id'];

// Sanitize promo code input
if (isset($_POST['promo_code'])) {
    // Sanitize and trim the promo code input
    $promo_code = filter_var(trim($_POST['promo_code']), FILTER_SANITIZE_STRING);

    // Validate promo code format
    if (!preg_match('/^[a-zA-Z0-9]+$/', $promo_code)) {
        $response['message'] = 'Invalid promo code format.';
        echo json_encode($response);
        exit();
    }

    // Query to validate the promo code from the database
    $sql = "SELECT * FROM promo_codes_tbl WHERE promo_code = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        $response['message'] = 'Database query failed.';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("s", $promo_code);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $promo = $result->fetch_assoc();
        $current_date = date("Y-m-d");

        // Check if the promo code is valid (based on the current date)
        if ($current_date >= $promo['valid_from'] && $current_date <= $promo['valid_until']) {

            // If the promo code is "save8", check its usage count for the current restaurant
            if (strtolower($promo_code) === "save8") {
                $usage_sql = "SELECT used_count FROM promo_code_usage_tbl WHERE restaurant_id = ? AND promo_code = ?";
                $usage_stmt = $conn->prepare($usage_sql);

                if ($usage_stmt === false) {
                    $response['message'] = 'Database query failed for checking usage count.';
                    echo json_encode($response);
                    exit();
                }

                $usage_stmt->bind_param("is", $restaurant_id, $promo_code);
                $usage_stmt->execute();
                $usage_result = $usage_stmt->get_result();
                $usage_data = $usage_result->fetch_assoc();

                // If the promo code has been used 12 or more times, prevent further use
                if ($usage_data && $usage_data['used_count'] >= 12) {
                    $response['message'] = "Promo code '$promo_code' has reached its usage limit (12 times) for your restaurant.";
                    $usage_stmt->close();
                    echo json_encode($response);
                    exit();
                }

                $usage_stmt->close();
            }

            // Promo code is valid, apply the discount
            $response['status'] = true;
            $response['message'] = "Promo code '$promo_code' applied! Discount: {$promo['discount_percent']}%";
            $response['discount'] = $promo['discount_percent'];

        } else {
            // Promo code has expired
            $response['message'] = "Promo code '$promo_code' has expired.";
        }
    } else {
        // Promo code does not exist in the database
        $response['message'] = "Invalid promo code.";
    }

    $stmt->close();
}

echo json_encode($response);
?>
