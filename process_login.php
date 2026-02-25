<?php 
session_start(); // Start the session
include './menus/db.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = trim($_POST['password']); // This will remove unnecessary whitespace

    // Prepare and bind
    $stmt = $conn->prepare("SELECT password, restaurant_id, logo, restaurant_name FROM restaurant_tbl WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password, $restaurant_id, $logo, $restaurant_name);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Regenerate session ID to prevent session fixation
            session_regenerate_id(true);
            $_SESSION['restaurant_id'] = $restaurant_id; // Store the restaurant ID in session
            $_SESSION['restaurant_logo'] = $logo; // Store the logo in session
            $_SESSION['restaurant_name'] = $restaurant_name;

            // Redirect to dashboard
            header("Location: profile.php"); // Change to your dashboard page
            exit(); // Always use exit after header redirection
        } else {
            // Log invalid password attempt
            error_log("Invalid password for email: $email"); // Logging for security
            // Redirect with error message for SweetAlert
            header("Location: login.php?message=Invalid login credentials&type=error");
            exit();
        }
    } else {
        // Log account not found
        error_log("No account found with email: $email"); // Logging for security
        // Redirect with error message for SweetAlert
        header("Location: login.php?message=Invalid login credentials&type=error");
        exit();
    }

    $stmt->close();
}
$conn->close();
?>
