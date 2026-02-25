<?php
$conn = new mysqli("localhost", "root", "", "restaurant_db");

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

echo "All tables in restaurant_db:\n";
$result = $conn->query("SHOW TABLES");

if ($result) {
    while ($row = $result->fetch_array()) {
        echo "  - {$row[0]}\n";
    }
} else {
    echo "❌ Error: " . $conn->error . "\n";
}

$conn->close();
?>
