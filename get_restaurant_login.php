<?php
$conn = new mysqli("localhost", "root", "", "restaurant_db");

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

// Check restaurant_tbl for login
echo "Restaurants in restaurant_tbl:\n";
$result = $conn->query("SELECT restaurant_id, restaurant_name, email FROM restaurant_tbl LIMIT 3");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        echo "  - ID: {$row['restaurant_id']}, Name: {$row['restaurant_name']}, Email: {$row['email']}\n";
    }
}

$conn->close();
?>
