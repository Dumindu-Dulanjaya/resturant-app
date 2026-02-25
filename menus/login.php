<?php
// Include database connection
include_once "db.php";

// Start session
session_start();

if (isset($_GET['table_number'], $_GET['login_credentials'], $_GET['restaurant_id'])) {
    $table_number = isset($_GET['table_number']) ? trim($_GET['table_number']) : '';
    $login_credentials = isset($_GET['login_credentials']) ? trim($_GET['login_credentials']) : '';
    $restaurant_id = isset($_GET['restaurant_id']) ? trim($_GET['restaurant_id']) : '';

    // Validate parameters are not empty
    if (empty($table_number) || empty($login_credentials) || empty($restaurant_id)) {
        http_response_code(400);
        echo "Error: Missing or empty parameters. Table: $table_number, Credentials: $login_credentials, Restaurant: $restaurant_id";
        exit();
    }

    // Prepare and execute the database query to validate table number, credentials, restaurant_id, and check if the restaurant is active
    $stmt = $conn->prepare("SELECT t.* 
                            FROM tables_tbl t
                            JOIN restaurant_tbl r ON t.restaurant_id = r.restaurant_id
                            WHERE t.table_number = ? 
                              AND t.login_credentials = ? 
                              AND t.restaurant_id = ? 
                              AND r.subscription_status = 'active'");
    
    if (!$stmt) {
        http_response_code(500);
        echo "Database error: " . $conn->error;
        exit();
    }
    
    $stmt->bind_param("isi", $table_number, $login_credentials, $restaurant_id);
    
    if (!$stmt->execute()) {
        http_response_code(500);
        echo "Execution error: " . $stmt->error;
        exit();
    }
    
    $result = $stmt->get_result();
    $table = $result->fetch_assoc();

    if ($table) {
        // Delete all active sessions older than 1 hour
        $stmt_delete = $conn->prepare("DELETE FROM active_sessions WHERE last_activity < NOW() - INTERVAL 1 HOUR");
        $stmt_delete->execute();
        $stmt_delete->close();

        // Check if a session already exists for this table number
        $stmt_check = $conn->prepare("SELECT * FROM active_sessions WHERE table_number = ? AND restaurant_id = ?");
        $stmt_check->bind_param("ii", $table_number, $restaurant_id);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();
        $stmt_check->close();

        // Start a new session and store authenticated table number and restaurant_id
        session_regenerate_id(); // Regenerate session ID to prevent session fixation
        $_SESSION['table_number'] = $table_number;
        $_SESSION['restaurant_id'] = $restaurant_id;
        $_SESSION['LAST_ACTIVITY'] = time();

        // Save the new session in the database with current time as last_activity
        $stmt_insert = $conn->prepare("INSERT INTO active_sessions (table_number, session_id, restaurant_id, last_activity) VALUES (?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE last_activity = NOW(), session_id = ?");
        $session_id = session_id();
        $stmt_insert->bind_param("isii", $table_number, $session_id, $restaurant_id, $table_number);
        
        if (!$stmt_insert->execute()) {
            http_response_code(500);
            echo "Error saving session: " . $stmt_insert->error;
            exit();
        }
        $stmt_insert->close();

        // Redirect to the main page
        header('Location: ./pages/');
        exit();
    } else {
        // Invalid credentials or inactive restaurant
        http_response_code(401); // Unauthorized
        echo "Invalid credentials or inactive restaurant. Please ensure the QR code is valid and the restaurant subscription is active.";
        exit();
    }
    
    $stmt->close();
} else {
    // Missing parameters
    http_response_code(400); // Bad request
    echo "Missing table number, login credentials, or restaurant ID.";
    exit();
}
