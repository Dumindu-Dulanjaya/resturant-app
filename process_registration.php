<?php
session_start();
require './menus/db.php'; // Include your database connection file

// Function to sanitize input
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate all required fields exist before sanitizing
    if (!isset($_POST['restaurant_name']) || !isset($_POST['address']) || !isset($_POST['contact_number']) || 
        !isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['confirm_password']) || 
        !isset($_POST['opening_time']) || !isset($_POST['closing_time'])) {
        $_SESSION['error'] = "All fields are required.";
        header("Location: register_hotel.php");
        exit;
    }

    $restaurant_name = sanitizeInput($_POST['restaurant_name']);
    $address = sanitizeInput($_POST['address']);
    $contact_number = sanitizeInput($_POST['contact_number']);
    $email = sanitizeInput($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $opening_time = sanitizeInput($_POST['opening_time']);
    $closing_time = sanitizeInput($_POST['closing_time']);

    // Validate input data
    if (empty($restaurant_name) || empty($address) || empty($contact_number) || empty($email) || 
        empty($password) || empty($confirm_password) || empty($opening_time) || empty($closing_time)) {
        $_SESSION['error'] = "All fields are required.";
        header("Location: register_hotel.php");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email format.";
        header("Location: register_hotel.php");
        exit;
    }

    if ($password !== $confirm_password) {
        $_SESSION['error'] = "Passwords do not match.";
        header("Location: register_hotel.php");
        exit;
    }

    // Check password strength (optional but recommended)
    if (strlen($password) < 8) {
        $_SESSION['error'] = "Password must be at least 8 characters long.";
        header("Location: register_hotel.php");
        exit;
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Handle logo upload
    if (!isset($_FILES['logo']) || $_FILES['logo']['error'] !== UPLOAD_ERR_OK) {
        $_SESSION['error'] = "Logo file is required.";
        header("Location: register_hotel.php");
        exit;
    }

    $fileTmpPath = $_FILES['logo']['tmp_name'];
    $fileName = $_FILES['logo']['name'];
    $fileSize = $_FILES['logo']['size'];
    $fileType = $_FILES['logo']['type'];
    $fileNameCmps = explode(".", $fileName);
    $fileExtension = strtolower(end($fileNameCmps));

    // Validate file type and size
    $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg', 'ico');
    if (!in_array($fileExtension, $allowedfileExtensions)) {
        $_SESSION['error'] = "Invalid file type. Only JPG, GIF, PNG, JPEG, and ICO files are allowed.";
        header("Location: register_hotel.php");
        exit;
    }

    if ($fileSize > 1048576) { // 1MB
        $_SESSION['error'] = "File size exceeds 1MB limit.";
        header("Location: register_hotel.php");
        exit;
    }

    $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
    $uploadFileDir = './menus/assets/imgs/logo/';
    
    // Create directory if it doesn't exist
    if (!file_exists($uploadFileDir)) {
        mkdir($uploadFileDir, 0755, true);
    }

    $dest_path = $uploadFileDir . $newFileName;

    // Move the file to the uploads directory
    if (!move_uploaded_file($fileTmpPath, $dest_path)) {
        $_SESSION['error'] = "File upload failed. Please try again.";
        header("Location: register_hotel.php");
        exit;
    }

    // Prepare the database path
    $dbLogoPath = '../assets/imgs/logo/' . $newFileName;

    // Set subscription status to 'trial' and calculate expiry date
    $subscription_status = 'trial';
    $expiry_date = date('Y-m-d H:i:s', strtotime('+30 days'));
    $package_id = 3; // Assuming package_id 3 is free trial package

    // Begin transaction for atomic operations
    $conn->begin_transaction();

    try {
        // Prepare SQL insert statement for restaurant_tbl
        $stmt = $conn->prepare("INSERT INTO restaurant_tbl (restaurant_name, address, contact_number, email, password, opening_time, closing_time, logo, subscription_status, subscription_expiry_date, package_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        $stmt->bind_param("ssssssssssi", $restaurant_name, $address, $contact_number, $email, $hashed_password, $opening_time, $closing_time, $dbLogoPath, $subscription_status, $expiry_date, $package_id);

        // Execute the statement
        if (!$stmt->execute()) {
            throw new Exception("Execute failed: " . $stmt->error);
        }

        // Get the inserted restaurant_id
        $restaurant_id = $conn->insert_id;

        // Insert into admin_tbl with role = 'admin'
        $stmt_admin = $conn->prepare("INSERT INTO admin_tbl (email, password, role, restaurant_id) VALUES (?, ?, 'admin', ?)");
        if (!$stmt_admin) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        
        $stmt_admin->bind_param("ssi", $email, $hashed_password, $restaurant_id);

        if (!$stmt_admin->execute()) {
            throw new Exception("Execute failed: " . $stmt_admin->error);
        }

        // Commit the transaction
        $conn->commit();

        $_SESSION['success'] = "Registration successful! Enjoy your 30-day free trial.";
        header("Location: ./login.php");
        exit;

    } catch (Exception $e) {
        // Rollback the transaction on error
        $conn->rollback();
        
        // Delete the uploaded file if the database operation failed
        if (file_exists($dest_path)) {
            unlink($dest_path);
        }

        $_SESSION['error'] = "Registration failed: " . $e->getMessage();
        header("Location: register_hotel.php");
        exit;
    } finally {
        // Close statements if they were created
        if (isset($stmt)) $stmt->close();
        if (isset($stmt_admin)) $stmt_admin->close();
    }
}
