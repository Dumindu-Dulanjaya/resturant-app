<?php
session_start();
header('Content-Type: application/json');

require './menus/db.php';

try {
    // Check if user is logged in
    if (!isset($_SESSION['restaurant_id'])) {
        throw new Exception('Unauthorized access.');
    }

    $restaurant_id = $_SESSION['restaurant_id'];
    $admin_id = isset($_POST['id']) ? intval($_POST['id']) : 0; // Get the admin_id from the POST request

    if ($admin_id <= 0) {
        throw new Exception('Invalid ID.');
    }

    // Delete the housekeeper for this restaurant
    $stmt = $conn->prepare("DELETE FROM admin_tbl WHERE restaurant_id = ? AND admin_id = ? AND role = 'housekeeper'");
    $stmt->bind_param("ii", $restaurant_id, $admin_id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['message' => 'Housekeeper deleted successfully']);
        } else {
            throw new Exception('No housekeeper found to delete.');
        }
    } else {
        throw new Exception('Failed to delete housekeeper: ' . $stmt->error);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
