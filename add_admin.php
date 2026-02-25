<?php
session_start(); // Start the session
header('Content-Type: application/json'); // Ensure the content type is JSON

require './menus/db.php'; // Include your database connection file

try {
    // Get the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    // Validate input
    if (!isset($data->email) || !isset($data->password) || !isset($data->role)) {
        throw new Exception('Email, password, and role are required.');
    }

    // Sanitize input
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $password = $data->password; // Raw password, will hash later if necessary
    $role = filter_var($data->role, FILTER_SANITIZE_STRING);

    // Ensure the role is valid
    $validRoles = ['steward', 'admin']; // Define acceptable roles
    if (!in_array($role, $validRoles)) {
        throw new Exception('Invalid role specified.');
    }

    // Retrieve restaurant_id from session
    if (!isset($_SESSION['restaurant_id'])) {
        throw new Exception('Restaurant ID is not set in the session.');
    }
    $restaurant_id = $_SESSION['restaurant_id']; // Get the restaurant_id from session

    // Check if a steward already exists for this restaurant
    $checkStmt = $conn->prepare("SELECT * FROM admin_tbl WHERE restaurant_id = ? AND role = 'steward'");
    $checkStmt->bind_param("i", $restaurant_id);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        // A steward already exists for this restaurant
        throw new Exception('You can only add one steward for this restaurant.');
    }

    // Close the check statement
    $checkStmt->close();

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL statement to add the new steward
    $stmt = $conn->prepare("INSERT INTO admin_tbl (email, password, role, restaurant_id) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $email, $hashedPassword, $role, $restaurant_id);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Admin added successfully']);
    } else {
        throw new Exception('Failed to add admin: ' . $stmt->error);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    http_response_code(500); // Set HTTP status to 500 (Internal Server Error)
    echo json_encode(['error' => $e->getMessage()]); // Return the error as JSON
}
?>
