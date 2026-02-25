<?php
session_start();

// Redirect users to login if not authenticated
if (!isset($_SESSION['table_number'])) {
    header('Location: ../login.php');
    exit();
}

if (!isset($_SESSION['restaurant_id'])) {
    header("Location: ../login.php");
    exit;
}

$restaurant_id = $_SESSION['restaurant_id'];
$table_number = $_SESSION['table_number'];

// Include database connection
include_once '../db.php';

// Fetch currency for the restaurant
$stmt_currency_id = $conn->prepare('SELECT currency_id FROM restaurant_tbl WHERE restaurant_id = ?');
$stmt_currency_id->bind_param('i', $restaurant_id);
$stmt_currency_id->execute();
$stmt_currency_id->bind_result($currency_id);
$stmt_currency_id->fetch();
$stmt_currency_id->close();

$stmt_currency = $conn->prepare('SELECT currency FROM currency_types_tbl WHERE currency_id = ?');
$stmt_currency->bind_param('i', $currency_id);
$stmt_currency->execute();
$stmt_currency->bind_result($currency);
$stmt_currency->fetch();
$stmt_currency->close();

// Fetch restaurant details
$stmt_restaurant = $conn->prepare('SELECT restaurant_name, logo FROM restaurant_tbl WHERE restaurant_id = ?');
$stmt_restaurant->bind_param('i', $restaurant_id);
$stmt_restaurant->execute();
$stmt_restaurant->bind_result($restaurant_name, $logo);
$stmt_restaurant->fetch();
$stmt_restaurant->close();

// Fetch completed orders for this table that haven't been paid yet
$sql_orders = "SELECT o.order_id, o.food_item_id, o.quantity, o.total_price, o.customer_name, o.customer_number, 
               f.food_items_name, f.price as unit_price, o.order_date, o.note
               FROM orders_tbl o
               JOIN food_items_tbl f ON o.food_item_id = f.food_items_id
               WHERE o.table_number = ? 
               AND o.restaurant_id = ? 
               AND o.payment_method = 'pending'
               AND o.completed = 1
               ORDER BY o.order_date DESC";

$stmt_orders = $conn->prepare($sql_orders);
$stmt_orders->bind_param('ii', $table_number, $restaurant_id);
$stmt_orders->execute();
$result_orders = $stmt_orders->get_result();

$orders = [];
$grand_total = 0;
$customer_name = '';
$customer_number = '';

while ($row = $result_orders->fetch_assoc()) {
    $orders[] = $row;
    $grand_total += $row['total_price'];
    if (empty($customer_name)) {
        $customer_name = $row['customer_name'];
        $customer_number = $row['customer_number'];
    }
}

$stmt_orders->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Bill - <?php echo htmlspecialchars($restaurant_name); ?></title>
    <link rel="stylesheet" href="../assets/css/items.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body {
            background: linear-gradient(135deg, #fdfcfb 0%, #ffffff 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .bill-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .bill-header {
            background: linear-gradient(135deg, #000000 0%, #000000 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .bill-header img {
            max-width: 100px;
            margin-bottom: 15px;
        }
        .bill-body {
            padding: 30px;
        }
        .bill-item {
            padding: 15px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .bill-item:last-child {
            border-bottom: none;
        }
        .item-details {
            flex-grow: 1;
        }
        .item-name {
            font-weight: 600;
            font-size: 16px;
            color: #333;
        }
        .item-price {
            color: #666;
            font-size: 14px;
        }
        .item-total {
            font-weight: 700;
            font-size: 18px;
            color: #ff6b35;
        }
        .grand-total {
            background: #f8f9fa;
            padding: 20px;
            margin-top: 20px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .grand-total h3 {
            margin: 0;
            color: #333;
        }
        .payment-section {
            margin-top: 30px;
            padding: 25px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .payment-btn {
            width: 100%;
            padding: 15px;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-cash {
            background: #28a745;
            color: white;
        }
        .btn-cash:hover {
            background: #218838;
        }
        .btn-card {
            background: #007bff;
            color: white;
        }
        .btn-card:hover {
            background: #0056b3;
        }
        .card-form {
            display: none;
            margin-top: 20px;
            padding: 20px;
            background: white;
            border-radius: 8px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .customer-info {
            background: #e7f3ff;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="bill-container">
        <div class="bill-header">
            <?php if ($logo): 
                $logo_url = htmlspecialchars($logo);
                if (strpos($logo_url, '../') !== 0 && strpos($logo_url, 'http') !== 0) {
                    $logo_url = '../' . $logo_url;
                }
            ?>
                <img src="<?php echo $logo_url; ?>" alt="<?php echo htmlspecialchars($restaurant_name); ?>" onerror="this.src='../assets/imgs/placeholder.jpg'">
            <?php endif; ?>
            <h2><?php echo htmlspecialchars($restaurant_name); ?></h2>
            <p>Final Bill</p>
        </div>

        <div class="bill-body">
            <div class="customer-info">
                <p><strong>Customer Name:</strong> <?php echo htmlspecialchars($customer_name); ?></p>
                <p><strong>Phone:</strong> <?php echo htmlspecialchars($customer_number); ?></p>
                <p><strong>Table Number:</strong> <?php echo htmlspecialchars($table_number); ?></p>
                <p><strong>Date:</strong> <?php echo date('F d, Y h:i A'); ?></p>
            </div>

            <?php if (count($orders) > 0): ?>
                <h4 class="mb-3">Order Summary</h4>
                <?php foreach ($orders as $order): ?>
                    <div class="bill-item">
                        <div class="item-details">
                            <div class="item-name"><?php echo htmlspecialchars($order['food_items_name']); ?></div>
                            <div class="item-price">
                                <?php echo htmlspecialchars($currency); ?><?php echo number_format($order['unit_price'], 2); ?> × <?php echo $order['quantity']; ?>
                            </div>
                            <?php if ($order['note']): ?>
                                <small class="text-muted">Note: <?php echo htmlspecialchars($order['note']); ?></small>
                            <?php endif; ?>
                        </div>
                        <div class="item-total">
                            <?php echo htmlspecialchars($currency); ?><?php echo number_format($order['total_price'], 2); ?>
                        </div>
                    </div>
                <?php endforeach; ?>

                <div class="grand-total">
                    <h3>Grand Total</h3>
                    <h3><?php echo htmlspecialchars($currency); ?><?php echo number_format($grand_total, 2); ?></h3>
                </div>

                <div class="payment-section">
                    <h4 class="mb-3">Select Payment Method</h4>
                    <button class="payment-btn btn-cash" onclick="processCashPayment()">
                        <i class="fas fa-money-bill-wave"></i> Pay with Cash
                    </button>
                    <button class="payment-btn btn-card" onclick="showCardForm()">
                        <i class="fas fa-credit-card"></i> Pay with Card
                    </button>

                    <div class="card-form" id="cardForm">
                        <h5>Card Payment Details</h5>
                        <form id="cardPaymentForm" onsubmit="processCardPayment(event)">
                            <div class="form-group">
                                <label>Cardholder Name</label>
                                <input type="text" class="form-control" id="cardName" required placeholder="John Doe">
                            </div>
                            <div class="form-group">
                                <label>Card Number</label>
                                <input type="text" class="form-control" id="cardNumber" required 
                                       placeholder="1234 5678 9012 3456" maxlength="19" 
                                       onkeyup="formatCardNumber(this)">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Expiry Date</label>
                                        <input type="text" class="form-control" id="expiryDate" required 
                                               placeholder="MM/YY" maxlength="5" onkeyup="formatExpiry(this)">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>CVV</label>
                                        <input type="text" class="form-control" id="cvv" required 
                                               placeholder="123" maxlength="4" pattern="[0-9]{3,4}">
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="payment-btn btn-card mt-3">
                                Complete Card Payment
                            </button>
                            <button type="button" class="payment-btn btn-secondary mt-2" onclick="hideCardForm()">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            <?php else: ?>
                <div class="alert alert-info">
                    <h4>No pending bill</h4>
                    <p>You don't have any completed orders pending payment.</p>
                    <a href="index.php" class="btn btn-primary">Go to Menu</a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        function showCardForm() {
            document.getElementById('cardForm').style.display = 'block';
        }

        function hideCardForm() {
            document.getElementById('cardForm').style.display = 'none';
        }

        function formatCardNumber(input) {
            let value = input.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            input.value = formattedValue;
        }

        function formatExpiry(input) {
            let value = input.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substr(0, 2) + '/' + value.substr(2, 2);
            }
            input.value = value;
        }

        function processCashPayment() {
            Swal.fire({
                title: 'Confirm Cash Payment',
                text: 'Total amount: <?php echo $currency . number_format($grand_total, 2); ?>',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Pay with Cash'
            }).then((result) => {
                if (result.isConfirmed) {
                    processPayment('cash', {});
                }
            });
        }

        function processCardPayment(event) {
            event.preventDefault();
            
            const cardData = {
                cardName: document.getElementById('cardName').value,
                cardNumber: document.getElementById('cardNumber').value.replace(/\s/g, ''),
                expiryDate: document.getElementById('expiryDate').value,
                cvv: document.getElementById('cvv').value
            };

            // Validate card number (basic validation)
            if (cardData.cardNumber.length < 13 || cardData.cardNumber.length > 19) {
                Swal.fire('Invalid Card', 'Please enter a valid card number', 'error');
                return;
            }

            processPayment('card', cardData);
        }

        function processPayment(method, cardData) {
            $.ajax({
                url: '../backend/process_bill_payment.php',
                method: 'POST',
                data: {
                    payment_method: method,
                    card_data: JSON.stringify(cardData),
                    table_number: <?php echo $table_number; ?>,
                    restaurant_id: <?php echo $restaurant_id; ?>,
                    total_amount: <?php echo $grand_total; ?>
                },
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: response.message + '<br><br><strong>Come Again!</strong>',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#ff6b35'
                        }).then(() => {
                            window.location.href = 'index.php';
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Payment Failed',
                            text: response.message || 'An error occurred during payment processing.'
                        });
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Payment error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred. Please try again.'
                    });
                }
            });
        }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</body>
</html>
