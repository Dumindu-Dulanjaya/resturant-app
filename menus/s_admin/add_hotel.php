<?php
session_start();

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'super_admin') {
    // Redirect to the admin dashboard if the user is not a super admin
    header('Location: ../admin/login.php');
    exit();
} ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Hotel</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- SweetAlert CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <style>
        body {
            padding-top: 0;
            padding: 0px 20px;
            /* Add padding to the full page */
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <h2>Register a Hotel</h2>

        <?php
        include_once '../db.php';

        // Initialize variables for the alert
        $alert_type = '';
        $alert_title = '';
        $alert_text = '';

        // Check if form is submitted
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Capture and sanitize the form data
            $restaurant_name = $conn->real_escape_string($_POST['restaurant_name']);
            $address = $conn->real_escape_string($_POST['address']);
            $contact_number = $conn->real_escape_string($_POST['contact_number']);
            $email = $conn->real_escape_string($_POST['email']);
            $subscription_expiry_date = $conn->real_escape_string($_POST['subscription_expiry_date']);
            $opening_time = $conn->real_escape_string($_POST['opening_time']);
            $closing_time = $conn->real_escape_string($_POST['closing_time']);

            // Set subscription status to 'inactive' by default
            $subscription_status = 'inactive';

            // Handle the logo upload
            if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
                $logo_tmp_name = $_FILES['logo']['tmp_name'];
                $logo_name = basename($_FILES['logo']['name']);
                $logo_ext = pathinfo($logo_name, PATHINFO_EXTENSION);

                // Set the allowed file types
                $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];

                if (in_array(strtolower($logo_ext), $allowed_extensions)) {
                    // Set the first destination path to save the logo
                    $logo_upload_path1 = '../assets/imgs/logo/' . uniqid() . '.' . $logo_ext;
                    $logo_upload_path2 = 'uploads/logos/' . uniqid() . '.' . $logo_ext; // Second destination path

                    // Move the uploaded file to the first destination folder
                    if (move_uploaded_file($logo_tmp_name, $logo_upload_path1)) {
                        // Copy the file to the second destination
                        if (copy($logo_upload_path1, $logo_upload_path2)) {
                            // Prepare the SQL query (store the path to the first location)
                            $sql = "INSERT INTO restaurant_tbl 
                (restaurant_name, address, contact_number, email, subscription_status, subscription_expiry_date, opening_time, closing_time, logo, created_at) 
                VALUES 
                ('$restaurant_name', '$address', '$contact_number', '$email', '$subscription_status', '$subscription_expiry_date', '$opening_time', '$closing_time', '$logo_upload_path1', NOW())";

                            // Execute the query and check if it was successful
                            if ($conn->query($sql) === TRUE) {
                                // Set success alert
                                $alert_type = 'success';
                                $alert_title = 'Success!';
                                $alert_text = 'Hotel registered successfully.';
                            } else {
                                // Set error alert
                                $alert_type = 'error';
                                $alert_title = 'Error!';
                                $alert_text = 'Error: ' . $sql . '<br>' . $conn->error;
                            }
                        } else {
                            // Set error alert
                            $alert_type = 'error';
                            $alert_title = 'Error!';
                            $alert_text = 'Failed to upload logo to the second destination.';
                        }
                    } else {
                        // Set error alert
                        $alert_type = 'error';
                        $alert_title = 'Error!';
                        $alert_text = 'Failed to upload logo to the first destination.';
                    }
                } else {
                    // Set error alert
                    $alert_type = 'error';
                    $alert_title = 'Error!';
                    $alert_text = 'Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.';
                }
            } else {
                // Set error alert
                $alert_type = 'error';
                $alert_title = 'Error!';
                $alert_text = 'Error in uploading logo.';
            }

            // Close the database connection
            $conn->close();
        }
        ?>

        <form action="" method="POST" enctype="multipart/form-data">
            <!-- Restaurant Name -->
            <div class="mb-3">
                <label for="restaurant_name" class="form-label">Restaurant Name</label>
                <input type="text" class="form-control" id="restaurant_name" name="restaurant_name" required>
            </div>

            <!-- Address -->
            <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <textarea class="form-control" id="address" name="address" rows="3" required></textarea>
            </div>

            <!-- Contact Number -->
            <div class="mb-3">
                <label for="contact_number" class="form-label">Contact Number</label>
                <input type="number" class="form-control" id="contact_number" name="contact_number" required>
            </div>

            <!-- Email -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>

            <!-- Logo Upload -->
            <div class="mb-3">
                <label for="logo" class="form-label">Restaurant Logo</label>
                <input type="file" class="form-control" id="logo" name="logo" accept="image/*" required>
            </div>

            <!-- Subscription Expiry Date -->
            <div class="mb-3">
                <label for="subscription_expiry_date" class="form-label">Subscription Expiry Date</label>
                <input type="date" class="form-control" id="subscription_expiry_date" name="subscription_expiry_date" required>
            </div>

            <!-- Opening Time -->
            <div class="mb-3">
                <label for="opening_time" class="form-label">Opening Time</label>
                <input type="time" class="form-control" id="opening_time" name="opening_time" required>
            </div>

            <!-- Closing Time -->
            <div class="mb-3">
                <label for="closing_time" class="form-label">Closing Time</label>
                <input type="time" class="form-control" id="closing_time" name="closing_time" required>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Register Hotel</button>
        </form>

        <!-- SweetAlert JS -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

        <script>
            // Check if alert variables are set
            <?php if (!empty($alert_type)): ?>
                Swal.fire({
                    icon: '<?php echo $alert_type; ?>',
                    title: '<?php echo $alert_title; ?>',
                    text: '<?php echo $alert_text; ?>',
                    showConfirmButton: false, // Remove the OK button
                    timer: 1500, // Automatically close after 1.5 seconds
                }).then((result) => {
                    // Redirect to index page on success
                    if ('<?php echo $alert_type; ?>' === 'success') {
                        window.location.href = 'index.php'; // Change this to your index page URL
                    }
                });
            <?php endif; ?>
        </script>

        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>