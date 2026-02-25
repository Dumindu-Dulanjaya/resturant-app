<?php
session_start();

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'super_admin') {
    // Redirect to the admin dashboard if the user is not a super admin
    header('Location: ../admin/index.php');
    exit();
}

include_once "../db.php";
// Register super admin (one-time setup)
// Include your database connection here

$name = "Super Admin";
$email = "info@knowebsolutions.com";
$password = password_hash("Knoweb@123", PASSWORD_BCRYPT); // Securely hash the password

$sql = "INSERT INTO super_admin_tbl (name, email, password) VALUES ('$name', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Super Admin Registered Successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
