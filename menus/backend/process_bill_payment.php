<?php
session_start();

// Check if user is authenticated
if (!isset($_SESSION['table_number']) || !isset($_SESSION['restaurant_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized access"]);
    exit();
}

// Include database connection
include_once '../db.php';

// Validate required POST parameters
if (!isset($_POST['payment_method'], $_POST['table_number'], $_POST['restaurant_id'], $_POST['total_amount'])) {
    echo json_encode(["status" => "error", "message" => "Missing required parameters"]);
    exit();
}

$payment_method = filter_var($_POST['payment_method'], FILTER_SANITIZE_STRING);
$table_number = filter_var($_POST['table_number'], FILTER_SANITIZE_NUMBER_INT);
$restaurant_id = filter_var($_POST['restaurant_id'], FILTER_SANITIZE_NUMBER_INT);
$total_amount = filter_var($_POST['total_amount'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

// Verify that the table number matches the session
if ($table_number != $_SESSION['table_number'] || $restaurant_id != $_SESSION['restaurant_id']) {
    echo json_encode(["status" => "error", "message" => "Invalid table or restaurant"]);
    exit();
}

// Process card payment
$card_transaction_id = null;
if ($payment_method === 'card') {
    $card_data = json_decode($_POST['card_data'], true);
    
    // Basic card validation
    if (empty($card_data['cardNumber']) || empty($card_data['cardName']) || empty($card_data['expiryDate']) || empty($card_data['cvv'])) {
        echo json_encode(["status" => "error", "message" => "Invalid card details"]);
        exit();
    }
    
    // In production, you would integrate with a payment gateway here
    // For now, we'll simulate a successful transaction
    $card_transaction_id = 'TXN_' . strtoupper(uniqid());
    
    // Store masked card details for record keeping (last 4 digits only)
    $masked_card = '**** **** **** ' . substr($card_data['cardNumber'], -4);
    
    // Log card payment details in a separate table (optional)
    $stmt_payment = $conn->prepare("INSERT INTO payment_transactions (restaurant_id, table_number, transaction_id, card_holder, masked_card_number, amount, payment_date) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    if ($stmt_payment) {
        $stmt_payment->bind_param('iisssd', $restaurant_id, $table_number, $card_transaction_id, $card_data['cardName'], $masked_card, $total_amount);
        $stmt_payment->execute();
        $stmt_payment->close();
    }
}

// Update all pending orders for this table to mark as paid
$payment_method_display = ($payment_method === 'card') ? 'Credit Card' : 'Cash';

$stmt_update = $conn->prepare("UPDATE orders_tbl SET payment_method = ?, payment_status = 'complete' WHERE table_number = ? AND restaurant_id = ? AND (payment_method = 'pending' OR payment_status = 'pending')");

$affected_rows = 0;

if ($stmt_update) {
    $stmt_update->bind_param('sii', $payment_method_display, $table_number, $restaurant_id);
    if ($stmt_update->execute()) {
        $affected_rows = $stmt_update->affected_rows;
    }
    $stmt_update->close();
}

// Get customer details from orders
$customer_name = null;
$customer_number = null;
$session_id = null;

$stmt_customer = $conn->prepare("SELECT customer_name, customer_number, session_id FROM orders_tbl WHERE table_number = ? AND restaurant_id = ? LIMIT 1");
if ($stmt_customer) {
    $stmt_customer->bind_param('ii', $table_number, $restaurant_id);
    $stmt_customer->execute();
    $stmt_customer->bind_result($customer_name, $customer_number, $session_id);
    $stmt_customer->fetch();
    $stmt_customer->close();
}

// Save bill record for BOTH cash and card payments
$stmt_bill = $conn->prepare("INSERT INTO bills_tbl (restaurant_id, table_number, total_amount, payment_method, transaction_id, customer_name, customer_number, session_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
if ($stmt_bill) {
    $transaction_id_to_save = ($payment_method === 'card') ? $card_transaction_id : null;
    $stmt_bill->bind_param('iidsssss', $restaurant_id, $table_number, $total_amount, $payment_method_display, $transaction_id_to_save, $customer_name, $customer_number, $session_id);
    if ($stmt_bill->execute()) {
        $bill_id = $stmt_bill->insert_id;
    } else {
        error_log("Bill insert error: " . $stmt_bill->error);
    }
    $stmt_bill->close();
}

// CASH PAYMENTS: ALWAYS RETURN SUCCESS - NO ERROR MESSAGES
if ($payment_method === 'cash') {
    echo json_encode([
        "status" => "success", 
        "message" => "Payment Successful! Thank you for your visit. Come again!",
        "transaction_id" => null,
        "orders_updated" => $affected_rows
    ]);
} else {
    // CARD PAYMENTS: Return success regardless of order count
    echo json_encode([
        "status" => "success", 
        "message" => "Payment Successful! Thank you for your visit. Come again!",
        "transaction_id" => $card_transaction_id,
        "orders_updated" => $affected_rows
    ]);
}

$conn->close();
?>
