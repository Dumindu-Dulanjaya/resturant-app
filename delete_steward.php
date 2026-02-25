<?php
session_start();
require './menus/db.php'; // Include your database connection file

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Ensure the user is logged in
        if (!isset($_SESSION['restaurant_id'])) {
            throw new Exception('User is not logged in.');
        }

        // Get the restaurant_id from the session (not from the client side)
        $restaurant_id = $_SESSION['restaurant_id']; 

        // Prepare SQL statement to delete the steward for the authenticated restaurant
        $stmt = $conn->prepare("DELETE FROM admin_tbl WHERE restaurant_id = ? AND role = 'steward'");
        $stmt->bind_param("i", $restaurant_id); // Bind the restaurant_id from the session

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Steward deleted successfully']);
        } else {
            throw new Exception('Failed to delete steward: ' . $stmt->error);
        }

        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method.']);
}
?>
