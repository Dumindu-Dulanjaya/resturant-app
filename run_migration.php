<?php
/**
 * Quick Migration Script - Adds image_url column to offers_tbl
 * Run this file by accessing: http://localhost/restaurant-app-main/run_migration.php
 * Or via CLI: php run_migration.php
 */

// Database configuration (update if needed)
$host = '127.0.0.1';
$port = 3306;
$database = 'restaurant_db';
$username = 'root';
$password = ''; // Default WAMP root password is empty

// Migration SQL file path
$migrationFile = __DIR__ . '/restaurant-backend-nestjs/migrations/add_image_to_offers.sql';

echo "<h2>Database Migration - Add image_url to offers_tbl</h2>\n";
echo "<pre>\n";

try {
    // Check if migration file exists
    if (!file_exists($migrationFile)) {
        throw new Exception("Migration file not found: {$migrationFile}");
    }

    // Read migration SQL
    $sql = file_get_contents($migrationFile);
    if ($sql === false) {
        throw new Exception("Failed to read migration file");
    }

    echo "Migration File: {$migrationFile}\n";
    echo "SQL to Execute:\n{$sql}\n\n";
    echo str_repeat('-', 80) . "\n\n";

    // Connect to database
    echo "Connecting to database...\n";
    $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    echo "✓ Connected to database: {$database}\n\n";

    // Check if column already exists
    echo "Checking if image_url column already exists...\n";
    $checkSql = "SHOW COLUMNS FROM offers_tbl LIKE 'image_url'";
    $stmt = $pdo->query($checkSql);
    $columnExists = $stmt->fetch();

    if ($columnExists) {
        echo "⚠ Column 'image_url' already exists in offers_tbl\n";
        echo "✓ Migration has already been applied - nothing to do!\n";
    } else {
        echo "✓ Column does not exist yet - proceeding with migration...\n\n";
        
        // Execute migration
        echo "Executing migration...\n";
        $pdo->exec($sql);
        echo "✓ Migration executed successfully!\n\n";

        // Verify column was added
        echo "Verifying column was added...\n";
        $stmt = $pdo->query($checkSql);
        $columnExists = $stmt->fetch();
        
        if ($columnExists) {
            echo "✓ Column 'image_url' successfully added to offers_tbl\n";
            echo "\nColumn Details:\n";
            print_r($columnExists);
        } else {
            throw new Exception("Migration executed but column not found!");
        }
    }

    echo "\n" . str_repeat('=', 80) . "\n";
    echo "✓✓✓ MIGRATION COMPLETE ✓✓✓\n";
    echo "\nNext steps:\n";
    echo "1. Refresh your frontend in the browser (Press F5)\n";
    echo "2. The offers page should now load without 500 errors\n";
    echo "3. You can now add offers with image URLs\n";
    echo str_repeat('=', 80) . "\n";

} catch (PDOException $e) {
    echo "\n❌ DATABASE ERROR:\n";
    echo "Error: " . $e->getMessage() . "\n\n";
    echo "Common fixes:\n";
    echo "- Make sure WAMP Server is running\n";
    echo "- Check database credentials in this file (lines 9-13)\n";
    echo "- Verify database 'restaurant_db' exists\n";
    echo "- Ensure offers_tbl table exists\n";
} catch (Exception $e) {
    echo "\n❌ ERROR:\n";
    echo $e->getMessage() . "\n";
}

echo "</pre>\n";
?>
