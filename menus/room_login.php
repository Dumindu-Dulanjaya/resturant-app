<?php
// Include database connection
include_once "db.php";

// Start session
session_start();

if (isset($_GET['room_number'], $_GET['login_credentials'], $_GET['restaurant_id'])) {
    $room_number = $_GET['room_number'];
    $login_credentials = $_GET['login_credentials'];
    $restaurant_id = $_GET['restaurant_id'];

    // Delete all active sessions older than 1 hour
    $stmt = $conn->prepare("DELETE FROM room_active_sessions WHERE last_activity < NOW() - INTERVAL 1 HOUR");
    $stmt->execute();

    // Prepare and execute the database query to validate room number, credentials, and restaurant_id
    $stmt = $conn->prepare("SELECT * FROM rooms_tbl WHERE room_number = ? AND login_credentials = ? AND restaurant_id = ?");
    $stmt->bind_param("isi", $room_number, $login_credentials, $restaurant_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $room = $result->fetch_assoc();

    if ($room) {
        // Check if a session already exists for this room number
        $stmt = $conn->prepare("SELECT * FROM room_active_sessions WHERE room_number = ? AND restaurant_id = ?");
        $stmt->bind_param("ii", $room_number, $restaurant_id);
        $stmt->execute();
        $result = $stmt->get_result();

        // Uncomment if you want to prevent multiple logins for the same room
        // if ($result->num_rows > 0) {
        //     // If a session already exists, prevent a new login
        //     http_response_code(403); // Forbidden
        //     echo "This room is already logged in from another device.";
        //     exit();
        // }

        // Start a new session and store authenticated room number and restaurant_id
        session_regenerate_id(); // Regenerate session ID to prevent session fixation
        $_SESSION['room_number'] = $room_number;
        $_SESSION['restaurant_id'] = $restaurant_id;

        // Save the new session in the database
        $stmt = $conn->prepare("INSERT INTO room_active_sessions (room_number, session_id, restaurant_id) VALUES (?, ?, ?)");
        $session_id = session_id();
        $stmt->bind_param("isi", $room_number, $session_id, $restaurant_id);
        $stmt->execute();

        // Redirect to the main page
        header('Location: ./rooms/request_service.php');
        exit();
    } else {
        // Invalid credentials
        http_response_code(401); // Unauthorized
        echo "Invalid credentials.";
        exit();
    }
} else {
    // Missing parameters
    http_response_code(400); // Bad request
    echo "Missing room number, login credentials, or restaurant ID.";
    exit();
}
