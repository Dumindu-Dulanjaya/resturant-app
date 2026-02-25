<?php
session_start();

// Check if admin is logged in
if (!isset($_SESSION['admin_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}

// Get restaurant ID
$restaurant_id = $_SESSION['restaurant_id'];

// Include database connection
include_once '../db.php';

// Get the last_check timestamp from query parameter
$last_check = isset($_GET['last_check']) ? intval($_GET['last_check']) : 0;
$last_check_datetime = date('Y-m-d H:i:s', $last_check);

// Fetch new orders since last check
$sql = "SELECT o.order_id, o.table_number, f.food_items_name, o.quantity, o.order_date, 
        o.payment_method, o.customer_name, o.customer_number, o.total_price, o.order_status
        FROM orders_tbl o
        JOIN food_items_tbl f ON o.food_item_id = f.food_items_id
        WHERE o.restaurant_id = ? AND o.order_status = 'pending' 
        AND o.order_date > FROM_UNIXTIME(?)
        ORDER BY o.order_date DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Query preparation failed"]);
    exit();
}

$stmt->bind_param("ii", $restaurant_id, $last_check);
$stmt->execute();
$result = $stmt->get_result();

$new_orders = [];
while ($row = $result->fetch_assoc()) {
    $new_orders[] = [
        'order_id' => $row['order_id'],
        'table_number' => $row['table_number'],
        'food_items_name' => htmlspecialchars($row['food_items_name']),
        'quantity' => $row['quantity'],
        'order_date' => $row['order_date'],
        'customer_name' => htmlspecialchars($row['customer_name']),
        'total_price' => $row['total_price'],
        'order_status' => $row['order_status']
    ];
}

$stmt->close();
$conn->close();

// Return current timestamp and new orders
echo json_encode([
    "status" => "success",
    "current_timestamp" => time(),
    "orders" => $new_orders,
    "count" => count($new_orders)
]);
?>
