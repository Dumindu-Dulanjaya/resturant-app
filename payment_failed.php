<?php
session_start(); // Start the session

// Check if the user is logged in by checking if the session variable is set
if (!isset($_SESSION['restaurant_id'])) {
    // User is not logged in, redirect to the login page
    header("Location: ./login.php");
    exit(); // Always use exit after header redirection
}

$error_messages = isset($_GET['error_message']) ? $_GET['error_message'] : [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed</title>
    <!-- SweetAlert CDN -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        ._failed {
            border-bottom: solid 4px red !important;
        }

        ._failed i {
            color: red !important;
        }

        ._success {
            box-shadow: 0 15px 25px #00000019;
            padding: 45px;
            width: 100%;
            text-align: center;
            max-width: 400px;
            border-bottom: solid 4px #28a745;
            background-color: #fff;
            border-radius: 10px;
        }

        ._success i {
            font-size: 55px;
            color: #28a745;
        }

        ._success h2 {
            margin-bottom: 12px;
            font-size: 40px;
            font-weight: 500;
            line-height: 1.2;
            margin-top: 10px;
        }

        ._success p {
            margin-bottom: 20px;
            font-size: 18px;
            color: #495057;
            font-weight: 500;
        }

        .btn-back {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28a745;
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .btn-back:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

<script>
    // Display all errors in SweetAlert
    Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        html: '<?php echo implode('<br>', $error_messages); ?>',
    }).then(function() {
        // Redirect to checkout page after closing the alert
        window.location.href = './checkout.php';
    });
</script>

<div class="message-box _success _failed">
    <i class="fa fa-times-circle" aria-hidden="true"></i>
    <h2>Your payment failed</h2>
    <p>Try again later</p>
    <a href="./checkout.php" class="btn-back">Back to Checkout</a>
</div>

</body>
</html>
