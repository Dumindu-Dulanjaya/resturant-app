<?php
$conn = new mysqli("localhost", "root", "", "restaurant_db");

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

echo "Structure of orders_tbl:\n";
$result = $conn->query("DESCRIBE orders_tbl");

if ($result) {
    while ($row = $result->fetch_assoc()) {
        echo "  - {$row['Field']} ({$row['Type']}) {$row['Null']} {$row['Key']} {$row['Extra']}\n";
    }
} else {
    echo "❌ Error: " . $conn->error . "\n";
}

echo "\n";
echo "Structure of order_items_tbl:\n";
$result = $conn->query("DESCRIBE order_items_tbl");

if ($result) {
    while ($row = $result->fetch_assoc()) {
        echo "  - {$row['Field']} ({$row['Type']}) {$row['Null']} {$row['Key']} {$row['Extra']}\n";
    }
} else {
    echo "❌ Error: " . $conn->error . "\n";
}

// Check if restaurant with ID 1 exists
echo "\n";
echo "Checking for restaurant_id 1...\n";
$result = $conn->query("SELECT restaurant_id, restaurant_name FROM restaurant_tbl WHERE restaurant_id = 1");
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo "✅ Restaurant found: ID={$row['restaurant_id']}, Name={$row['restaurant_name']}\n";
} else {
    echo "❌ No restaurant with ID 1 found\n";
}

$conn->close();
?>
