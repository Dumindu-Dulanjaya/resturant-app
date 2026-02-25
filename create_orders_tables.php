<?php
// Script to create orders tables in restaurant_db

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

echo "✅ Connected to database\n\n";

// Read SQL file
$sqlFile = __DIR__ . '/restaurant-backend-nestjs/sql/create_orders_tables.sql';
if (!file_exists($sqlFile)) {
    die("❌ SQL file not found: $sqlFile\n");
}

$sql = file_get_contents($sqlFile);

// Split into individual statements
$statements = array_filter(
    array_map('trim', explode(';', $sql)),
    function($stmt) { return !empty($stmt) && !preg_match('/^--/', $stmt); }
);

$success = 0;
$failed = 0;

foreach ($statements as $statement) {
    if (empty($statement)) continue;
    
    if ($conn->query($statement) === TRUE) {
        $success++;
        // Extract table name for better output
        if (preg_match('/CREATE TABLE.*?`(\w+)`/i', $statement, $matches)) {
            echo "✅ Created table: {$matches[1]}\n";
        }
    } else {
        $failed++;
        echo "❌ Error: " . $conn->error . "\n";
    }
}

echo "\n";
echo "Summary: $success successful, $failed failed\n";

// Verify tables exist
echo "\nVerifying tables...\n";
$result = $conn->query("SHOW TABLES LIKE 'orders_tbl'");
if ($result->num_rows > 0) {
    echo "✅ orders_tbl exists\n";
}
$result = $conn->query("SHOW TABLES LIKE 'order_items_tbl'");
if ($result->num_rows > 0) {
    echo "✅ order_items_tbl exists\n";
}

$conn->close();
?>
