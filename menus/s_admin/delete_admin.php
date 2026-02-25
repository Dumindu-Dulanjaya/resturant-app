<?php
session_start();
include_once "../db.php";

if (!isset($_POST['admin_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Admin ID not provided']);
    exit();
}

$admin_id = $_POST['admin_id'];

// Delete the admin from the database
$sql = "DELETE FROM admin_tbl WHERE admin_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $admin_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete admin']);
}

$stmt->close();
$conn->close();
