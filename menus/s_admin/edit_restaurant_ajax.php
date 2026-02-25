<?php
session_start();

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'super_admin') {
    header('Location: ../admin/index.php');
    exit();
}

include_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $restaurant_id = intval($_GET['id']);

    // Fetch restaurant details
    $sql = "SELECT * FROM restaurant_tbl WHERE restaurant_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $restaurant_id);
    $stmt->execute();
    $restaurant = $stmt->get_result()->fetch_assoc();

    // Fetch all privileges
    $privileges = $conn->query("SELECT * FROM privileges_tbl")->fetch_all(MYSQLI_ASSOC);

    // Fetch restaurant's current privileges
    $restaurant_privileges = $conn->query("SELECT privilege_id FROM restaurant_privileges_tbl WHERE restaurant_id = $restaurant_id")
        ->fetch_all(MYSQLI_ASSOC);

    // Prepare response data
    $response = [
        'restaurant_id' => $restaurant['restaurant_id'],
        'subscription_status' => $restaurant['subscription_status'],
        'subscription_expiry_date' => $restaurant['subscription_expiry_date'],
        'all_privileges' => $privileges,
        'restaurant_privileges' => array_column($restaurant_privileges, 'privilege_id')
    ];

    echo json_encode($response);
    exit; // Make sure to exit after echoing the response
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $restaurant_id = intval($_POST['restaurant_id']);
    $subscription_status = $_POST['subscription_status'];
    $subscription_expiry_date = $_POST['subscription_expiry_date'];
    $selected_privileges = isset($_POST['privileges']) ? $_POST['privileges'] : [];

    // Optional: Validate input data here

    // Check if subscription_expiry_date is empty
    if (empty($subscription_expiry_date)) {
        $subscription_expiry_date = null; // Handle it accordingly
    }

    // Update the restaurant's subscription status and expiry date
    $stmt = $conn->prepare("UPDATE restaurant_tbl SET subscription_status = ?, subscription_expiry_date = ? WHERE restaurant_id = ?");
    $stmt->bind_param("ssi", $subscription_status, $subscription_expiry_date, $restaurant_id);
    
    if (!$stmt->execute()) {
        $response = ['success' => false, 'error' => $stmt->error];
        echo json_encode($response);
        exit;
    }

    // Delete existing privileges using prepared statement
    $stmt = $conn->prepare("DELETE FROM restaurant_privileges_tbl WHERE restaurant_id = ?");
    $stmt->bind_param("i", $restaurant_id);
    $stmt->execute();

    // Insert selected privileges
    foreach ($selected_privileges as $privilege_id) {
        $stmt = $conn->prepare("INSERT INTO restaurant_privileges_tbl (restaurant_id, privilege_id) VALUES (?, ?)");
        $stmt->bind_param("ii", $restaurant_id, $privilege_id);
        if (!$stmt->execute()) {
            $response = ['success' => false, 'error' => $stmt->error];
            echo json_encode($response);
            exit;
        }
    }

    // Return a JSON response
    $response = ['success' => true];
    echo json_encode($response);
}
?>
