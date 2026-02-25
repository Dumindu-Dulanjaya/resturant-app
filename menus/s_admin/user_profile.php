<?php
session_start();

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'super_admin') {
    // Redirect to the admin dashboard if the user is not a super admin
    header('Location: ../admin/login.php');
    exit();
}

include_once "../db.php";

// Fetch restaurant details
$restaurant_id = $_GET['restaurant_id']; // Get the restaurant ID from the URL
$sql = "SELECT * FROM restaurant_tbl WHERE restaurant_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $restaurant_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $restaurant = $result->fetch_assoc(); // Fetch the restaurant details
    $restaurant_name = $restaurant['restaurant_name'];
    $email = $restaurant['email'];
    $contact_number = $restaurant['contact_number'];
    $address = $restaurant['address'];
    $subscription_status = $restaurant['subscription_status'];
    $subscription_expiry_date = $restaurant['subscription_expiry_date'];
    $opening_time = $restaurant['opening_time'];
    $closing_time = $restaurant['closing_time'];
    $image_path = $restaurant['logo'];
} else {
    echo "No restaurant found.";
    exit; // Exit if no restaurant is found
}

// Fetch privileges for the restaurant
$sql_privileges = "SELECT p.privilege_name FROM restaurant_privileges_tbl rp
                   JOIN privileges_tbl p ON rp.privilege_id = p.privilege_id
                   WHERE rp.restaurant_id = ?";
$stmt_privileges = $conn->prepare($sql_privileges);
$stmt_privileges->bind_param("i", $restaurant_id);
$stmt_privileges->execute();
$result_privileges = $stmt_privileges->get_result();

$privileges = [];
while ($privilege = $result_privileges->fetch_assoc()) {
    $privileges[] = $privilege['privilege_name'];
}

// Fetch admin details for the restaurant
$sql_admins = "SELECT * FROM admin_tbl WHERE restaurant_id = ?";
$stmt_admins = $conn->prepare($sql_admins);
$stmt_admins->bind_param("i", $restaurant_id);
$stmt_admins->execute();
$result_admins = $stmt_admins->get_result();

$admins = [];
while ($admin = $result_admins->fetch_assoc()) {
    $admins[] = $admin;
}

$stmt->close();
$stmt_privileges->close();
$stmt_admins->close();
$conn->close();
?>
<!-- Bootstrap & SweetAlert -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<style>
    body {
        margin-top: 20px;
        color: #1a202c;
        text-align: left;
        background-color: #e2e8f0;
    }

    .main-body {
        padding: 15px;
    }

    .card {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 0 solid rgba(0, 0, 0, .125);
        border-radius: .25rem;
    }

    .card-body {
        flex: 1 1 auto;
        min-height: 1px;
        padding: 1rem;
    }

    .gutters-sm {
        margin-right: -8px;
        margin-left: -8px;
    }

    .gutters-sm>.col,
    .gutters-sm>[class*=col-] {
        padding-right: 8px;
        padding-left: 8px;
    }

    .mb-3,
    .my-3 {
        margin-bottom: 1rem !important;
    }

    .bg-gray-300 {
        background-color: #e2e8f0;
    }

    .h-100 {
        height: 100% !important;
    }

    .shadow-none {
        box-shadow: none !important;
    }
</style>

<div class="container">
    <div class="main-body">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Restaurant Details</li>
            </ol>
        </nav>
        <!-- /Breadcrumb -->

        <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img src="<?php echo htmlspecialchars($image_path); ?>" alt="Restaurant Logo" class="rounded-circle" width="150">
                            <div class="mt-3">
                                <h4><?php echo htmlspecialchars($restaurant_name); ?></h4>
                                <p class="text-muted font-size-sm"><?php echo htmlspecialchars($address); ?></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-3">
                    <!-- Privileges Section -->
                    <div class="card-body">
                        <h5 class="card-title">Privileges</h5>
                        <ul class="list-group">
                            <?php if (!empty($privileges)): ?>
                                <?php foreach ($privileges as $privilege): ?>
                                    <li class="list-group-item"><?php echo htmlspecialchars($privilege); ?></li>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <li class="list-group-item">No privileges assigned.</li>
                            <?php endif; ?>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card mb-3">
                    <div class="card-body">
                        <!-- Restaurant Details -->
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Restaurant Name</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($restaurant_name); ?></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($email); ?></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Contact Number</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($contact_number); ?></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Address</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($address); ?></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Subscription Status</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($subscription_status); ?></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Subscription Expiry</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo date('Y-m-d', strtotime($subscription_expiry_date)); ?></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Opening Time</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($opening_time); ?></div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Closing Time</h6>
                            </div>
                            <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($closing_time); ?></div>
                        </div>
                        <hr>
                        <!-- Admins Section -->
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Admins</h5>
                                <?php if (!empty($admins)): ?>
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($admins as $admin): ?>
                                                <tr>
                                                    <td><?php echo htmlspecialchars($admin['email']); ?></td>
                                                    <td><?php echo htmlspecialchars($admin['role']); ?></td>
                                                    <td>
                                                        <a href="edit_admin.php?admin_id=<?php echo $admin['admin_id']; ?>" class="btn btn-sm btn-primary">Edit</a>
                                                        <button class="btn btn-sm btn-danger delete-admin" data-id="<?php echo $admin['admin_id']; ?>">Delete</button>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                <?php else: ?>
                                    <p>No admins found for this restaurant.</p>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    // SweetAlert for delete confirmation
    $(document).on('click', '.delete-admin', function(e) {
        e.preventDefault();
        var adminId = $(this).data('id');

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'delete_admin.php', // Your server-side delete script
                    type: 'POST',
                    data: {
                        admin_id: adminId
                    },
                    success: function(response) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The admin has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(function() {
                            location.reload(); // Reload page to update the list
                        });
                    },
                    error: function() {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete admin.',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    });
</script>