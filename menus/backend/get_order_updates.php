<?php
session_start();

// Check if table number and restaurant ID are in session
if (!isset($_SESSION['table_number']) || !isset($_SESSION['restaurant_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit();
}

$table_number = $_SESSION['table_number'];
$restaurant_id = $_SESSION['restaurant_id'];

// Include database connection
include_once '../db.php';

// Fetch current orders for this table
$sql = "SELECT o.order_id, o.food_item_id, f.food_items_name, o.quantity, o.order_date, 
        o.order_status, o.payment_status, o.total_price, o.completed
        FROM orders_tbl o
        JOIN food_items_tbl f ON o.food_item_id = f.food_items_id
        WHERE o.table_number = ? AND o.restaurant_id = ? AND o.completed = 0
        ORDER BY o.order_date DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Query preparation failed"]);
    exit();
}

$stmt->bind_param("ii", $table_number, $restaurant_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = [
        'order_id' => $row['order_id'],
        'food_items_name' => htmlspecialchars($row['food_items_name']),
        'quantity' => $row['quantity'],
        'order_date' => $row['order_date'],
        'order_status' => $row['order_status'],
        'payment_status' => $row['payment_status'],
        'total_price' => $row['total_price']
    ];
}

$stmt->close();
$conn->close();

// Return orders
echo json_encode([
    "status" => "success",
    "orders" => $orders,
    "count" => count($orders)
]);
?>
