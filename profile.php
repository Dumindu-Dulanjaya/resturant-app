<?php
session_start(); // Start the session

// Check if the user is logged in by checking if the session variable is set
if (!isset($_SESSION['restaurant_id'])) {
    // User is not logged in, redirect to the login page
    header("Location: login.php");
    exit(); // Always use exit after header redirection
}

include_once "./menus/db.php";

// Fetch restaurant details
$restaurant_id = $_SESSION['restaurant_id']; // Get the restaurant ID from the session
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
    $country = $restaurant['country_id'];
    $currency = $restaurant['currency_id'];
    $package_id = $restaurant['package_id'];

    // Calculate days remaining for trial users
    $days_remaining = 0;
    $trial_active = false;
    if ($subscription_status == 'trial' && !empty($subscription_expiry_date)) {
        $today = new DateTime();
        $expiry_date = new DateTime($subscription_expiry_date);
        $interval = $today->diff($expiry_date);
        $days_remaining = $interval->days;
        $trial_active = $expiry_date > $today;
    }

    // Step 2: Fetch the package name using package_id
    $package_name = ''; // Initialize the package_name variable
    if (!empty($package_id)) {
        $package_query = "SELECT package_name FROM packages_tbl WHERE package_id = ?";
        $stmt = $conn->prepare($package_query);
        $stmt->bind_param("i", $package_id); // Bind package_id as an integer
        $stmt->execute();
        $package_result = $stmt->get_result();
        if ($package_result->num_rows > 0) {
            $package = $package_result->fetch_assoc();
            $package_name = $package['package_name'];
        } else {
            $package_name = "No package";
        }
        $stmt->close();
    }
} else {
    echo "No restaurant found.";
    exit; // Exit if no restaurant is found
}

// Check if country or currency are missing
$showPopup = false;
if (empty($country) || empty($currency)) {
    $showPopup = true;
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

// Fetch available countries
$countries = [];
$sql_countries = "SELECT country_id, country_name FROM countries_tbl"; // Select country_id and country_name
$result_countries = $conn->query($sql_countries);
if ($result_countries->num_rows > 0) {
    while ($row = $result_countries->fetch_assoc()) {
        $countries[] = $row; // Store each country in the array
    }
}

// Fetch available currency types (using `currency` field)
$currencies = [];
$sql_currencies = "SELECT currency_id, currency FROM currency_types_tbl"; // Select currency_id and currency
$result_currencies = $conn->query($sql_currencies);
if ($result_currencies->num_rows > 0) {
    while ($row = $result_currencies->fetch_assoc()) {
        $currencies[] = $row; // Store each currency in the array
    }
}

// Fetch country name
$sql_country = "SELECT country_name FROM countries_tbl WHERE country_id = ?";
$stmt_country = $conn->prepare($sql_country);
$stmt_country->bind_param("i", $country);
$stmt_country->execute();
$result_country = $stmt_country->get_result();

if ($result_country->num_rows > 0) {
    $country_data = $result_country->fetch_assoc();
    $country_name = $country_data['country_name'];
} else {
    $country_name = "Unknown Country"; // Handle case if country not found
}

$stmt_country->close();

// Fetch currency name
$sql_currency = "SELECT currency FROM currency_types_tbl WHERE currency_id = ?";
$stmt_currency = $conn->prepare($sql_currency);
$stmt_currency->bind_param("i", $currency);
$stmt_currency->execute();
$result_currency = $stmt_currency->get_result();

if ($result_currency->num_rows > 0) {
    $currency_data = $result_currency->fetch_assoc();
    $currency_name = $currency_data['currency'];
} else {
    $currency_name = "Unknown Currency"; // Handle case if currency not found
}

// Check and update subscription status if trial has expired
if (($subscription_status == 'trial' || $subscription_status == 'active')&& !empty($subscription_expiry_date)) {
    $today = new DateTime();
    $expiry_date = new DateTime($subscription_expiry_date);
    
    if ($today > $expiry_date) {
        // Update status to inactive in database
         $update_sql = "UPDATE restaurant_tbl 
                          SET subscription_status = 'inactive', 
                              package_id = NULL,
                              subscription_expiry_date = NULL
                          WHERE restaurant_id = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("i", $restaurant_id);
            $update_stmt->execute();
        
        // Update local variable to reflect the change
        $subscription_status = 'inactive';
    }
}

// Function to update privileges in restaurant_privileges_tbl
function updateRestaurantPrivileges($conn, $restaurant_id, $package_id)
{
    // Delete existing privileges for the restaurant
    $sql_delete = "DELETE FROM restaurant_privileges_tbl WHERE restaurant_id = ?";
    $stmt_delete = $conn->prepare($sql_delete);
    $stmt_delete->bind_param("i", $restaurant_id);
    $stmt_delete->execute();

    // Fetch privileges from package_privileges_tbl
    $sql_package_privileges = "SELECT privilege_id FROM package_privileges_tbl WHERE package_id = ?";
    $stmt_package_privileges = $conn->prepare($sql_package_privileges);
    $stmt_package_privileges->bind_param("i", $package_id);
    $stmt_package_privileges->execute();
    $result_package_privileges = $stmt_package_privileges->get_result();

    // Insert new privileges for the restaurant
    $sql_insert = "INSERT INTO restaurant_privileges_tbl (restaurant_id, privilege_id) VALUES (?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);

    while ($row = $result_package_privileges->fetch_assoc()) {
        $privilege_id = $row['privilege_id'];
        $stmt_insert->bind_param("ii", $restaurant_id, $privilege_id);
        $stmt_insert->execute();
    }

    // Close statements
    $stmt_delete->close();
    $stmt_package_privileges->close();
    $stmt_insert->close();
}

// Call the function when updating or adding a restaurant's package
updateRestaurantPrivileges($conn, $restaurant_id, $package_id);

$stmt_currency->close();
$stmt_privileges->close();
$stmt_admins->close();
$conn->close();
?>

<!--====== Title ======-->
<title>Anawuma | Profile</title>
<!--====== Favicon Icon ======-->
<link rel="shortcut icon" href="assets/images/favicon.png" type="image/x-icon">
<!--====== Google Fonts ======-->
<link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600;700&display=swap"
    rel="stylesheet">
<!--====== Font Awesome ======-->
<link rel="stylesheet" href="assets/css/fontawesome.5.9.0.min.css">
<!--====== Flaticon CSS ======-->
<link rel="stylesheet" href="assets/css/flaticon.css">
<!--====== Bootstrap css ======-->
<link rel="stylesheet" href="assets/css/bootstrap.4.5.3.min.css">
<!--====== Magnific Popup ======-->
<link rel="stylesheet" href="assets/css/magnific-popup.css">
<!--====== Slick Slider ======-->
<link rel="stylesheet" href="assets/css/slick.css">
<!--====== Animate CSS ======-->
<link rel="stylesheet" href="assets/css/animate.min.css">
<!--====== Nice Select ======-->
<link rel="stylesheet" href="assets/css/nice-select.css">
<!--====== Padding Margin ======-->
<link rel="stylesheet" href="assets/css/spacing.min.css">
<!--====== Menu css ======-->
<link rel="stylesheet" href="assets/css/menu.css">
<!--====== Main css ======-->
<link rel="stylesheet" href="assets/css/style.css">
<!--====== Responsive css ======-->
<link rel="stylesheet" href="assets/css/responsive.css">
<!-- Bootstrap & SweetAlert -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<style>
    body {
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
    
    .trial-info {
        background-color: #fff8e1;
        border-left: 4px solid #ffc107;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 4px;
    }
    
    .trial-countdown {
        font-size: 1.2rem;
        font-weight: bold;
        color: #ff5722;
    }
    
    .subscription-status {
        padding: 5px 10px;
        border-radius: 4px;
        font-weight: bold;
        text-transform: capitalize;
    }
    
    .status-trial {
        background-color: #fff3e0;
        color: #ff6d00;
    }
    
    .status-active {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .status-inactive {
        background-color: #ffebee;
        color: #c62828;
    }
    
    .upgrade-prompt {
        background-color: #e3f2fd;
        padding: 15px;
        border-radius: 4px;
        margin-top: 15px;
    }
</style>
</head>

<body>
    <div class="page-wrapper">

        <!-- Preloader -->
        <div class="preloader"></div>

        <!--====== Header Part Start ======-->
        <header class="main-header header-three">
            <!--Header-Upper-->
            <div class="header-upper">
                <div class="container clearfix">
                    <div class="header-inner py-20">
                        <div class="logo-outer">
                            <div width="30%" class="logo"><a href="index.php"><img width="200"
                                        src="assets/images/logos/logo-rmbg-2.png" alt="Logo"></a></div>
                        </div>

                        <div class="nav-outer d-flex align-items-center clearfix mx-lg-auto">
                            <!-- Main Menu -->
                            <nav class="main-menu navbar-expand-lg">
                                <div class="navbar-header">
                                    <div width="30%" class="logo"><a href="index.php"><img width="200"
                                                src="assets/images/logos/logo-rmbg-2.png" alt="Logo"></a></div>
                                    <!-- Toggle Button -->
                                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                                        data-target=".navbar-collapse" aria-controls="main-menu">
                                        <a href="logout.php" class="theme-btn style-two">Logout <i
                                                class="fas fa-arrow-right"></i></a>
                                    </button>

                                </div>


                            </nav>

                            <!-- Main Menu End-->

                        </div>

                        <div class="menu-right d-none d-lg-flex align-items-center">
                            <a href="logout.php" class="theme-btn style-two">Logout <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>

                    </div>
                </div>
            </div>
            <!--End Header Upper-->

        </header>
        <!--====== Header Part End ======-->
        <div class="container" style="margin-top: 100px;">
            <div class="main-body">
                <?php if ($subscription_status == 'trial'): ?>
                <div class="trial-info">
                    <h4><i class="fas fa-star"></i> 30 days Free Trial</h4>
                    <?php if ($trial_active): ?>
                        <p>You are currently using our free trial. Enjoy all features for <?php echo $days_remaining; ?> more days!</p>
                        <div class="trial-countdown">
                            <i class="fas fa-clock"></i> <?php echo $days_remaining; ?> days remaining
                        </div>
                        <div class="upgrade-prompt">
                            <p>Upgrade now to continue using our service without interruption after your trial ends.</p>
                            <a href="pricing.php" class="btn btn-success">Upgrade Now</a>
                        </div>
                    <?php else: ?>
                        <div class="alert alert-warning">
                            <strong>Your trial has expired!</strong> Upgrade to continue using our service.
                        </div>
                        <a href="pricing.php" class="btn btn-danger">Upgrade Now</a>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
                
                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src="./menus/assets/<?php echo htmlspecialchars($image_path); ?>"
                                        alt="Restaurant Logo" class="rounded-circle" width="150">
                                    <div class="mt-3">
                                        <h4><?php echo htmlspecialchars($restaurant_name); ?></h4>
                                        <p class="text-muted font-size-sm"><?php echo htmlspecialchars($address); ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Modal -->
                        <!-- Add Admin Modal -->
                        <div class="modal fade" id="addAdminModal" tabindex="-1" role="dialog" aria-labelledby="addAdminModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="addAdminModalLabel">Add Steward </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form id="addAdminForm">
                                            <div class="form-group">
                                                <label for="adminEmail">Email</label>
                                                <input type="email" class="form-control" id="adminEmail" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="adminPassword">Password</label>
                                                <input type="password" class="form-control" id="adminPassword" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="adminRole">Role</label>
                                                <select class="form-control" id="adminRole" required>
                                                    <option value="steward">Steward</option>
                                                </select>
                                            </div>
                                            <button type="button" class="btn btn-primary" id="submitAdmin">Add Steward</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Add Housekeeper Modal -->
                        <div class="modal fade" id="addHousekeeperModal" tabindex="-1" role="dialog" aria-labelledby="addHousekeeperModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="addHousekeeperModalLabel">Add Housekeeper</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form id="addHousekeeperForm">
                                            <div class="form-group">
                                                <label for="housekeeperEmail">Email</label>
                                                <input type="email" class="form-control" id="housekeeperEmail" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="housekeeperPassword">Password</label>
                                                <input type="password" class="form-control" id="housekeeperPassword" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="housekeeperRole">Role</label>
                                                <select class="form-control" id="housekeeperRole" required>
                                                    <option value="housekeeper">Housekeeper</option>
                                                </select>
                                            </div>
                                            <button type="button" class="btn btn-success" id="submitHousekeeper">Add Housekeeper</button>
                                        </form>
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
                                    <div class="col-sm-9 text-secondary">
                                        <?php echo htmlspecialchars($restaurant_name); ?></div>
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
                                    <div class="col-sm-9 text-secondary">
                                        <?php echo htmlspecialchars($contact_number); ?></div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Country</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <?php echo htmlspecialchars($country_name); ?>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Currency</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <?php echo htmlspecialchars($currency_name); ?>
                                    </div>
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
                                    <div class="col-sm-9 text-secondary">
                                        <span class="subscription-status status-<?php echo $subscription_status; ?>">
                                            <?php echo htmlspecialchars($subscription_status); ?>
                                        </span>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Subscription Expiry</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <?php
                                        if (!empty($subscription_expiry_date)) {
                                            echo date('F j, Y', strtotime($subscription_expiry_date));
                                        } else {
                                            echo "Not set";
                                        }
                                        ?>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Package</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        <?php echo htmlspecialchars($package_name); ?>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-12 text-secondary">
                                        <?php  if ($subscription_status == 'active' || $subscription_status == 'trial'): ?>
                                            <a href="./menus/admin/" class="btn btn-primary">Go to Admin Dashboard</a>
                                        <?php else: ?>
                                            <a href="pricing.php" class="btn btn-warning">Upgrade Package</a>
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Opening Time</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($opening_time); ?>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Closing Time</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary"><?php echo htmlspecialchars($closing_time); ?>
                                    </div>
                                </div>
                                <hr>
                                <!-- Admins Section -->
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">Admins</h5>
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addAdminModal">
                                            Add Steward
                                        </button>
                                        <button type="button" class="btn btn-success ml-2" data-toggle="modal" data-target="#addHousekeeperModal">
                                            Add Housekeeper
                                        </button>
                                        <?php if (!empty($admins)): ?>
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Role</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php foreach ($admins as $admin): ?>
                                                        <tr>
                                                            <td><?php echo htmlspecialchars($admin['email']); ?></td>
                                                            <td>
                                                                <?php 
                                                                if ($admin['role'] == 'housekeeper') {
                                                                    echo 'House Keeper'; 
                                                                } else {
                                                                    echo ucfirst(htmlspecialchars($admin['role'])); 
                                                                }
                                                                ?>
                                                            </td>
                                                                <td>
                                                                    <?php if ($admin['role'] == 'steward' || $admin['role'] == 'housekeeper'): ?> <!-- Show delete for steward and housekeeper -->
                                                                        <button class="btn btn-danger delete-admin" data-role="<?php echo htmlspecialchars($admin['role']); ?>" data-id="<?php echo $admin['admin_id']; ?>">Delete</button>
                                                                    <?php endif; ?>
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
            document.addEventListener('DOMContentLoaded', function() {
                // Select all delete buttons for stewards and housekeepers
                const deleteButtons = document.querySelectorAll('.delete-admin');

                // Add click event listeners to each delete button
                deleteButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const role = this.getAttribute('data-role'); // Get the role from the button
                        const id = this.getAttribute('data-id'); // Get the ID from the button
                        const roleName = role.charAt(0).toUpperCase() + role.slice(1); // Capitalize role name

                        // Show SweetAlert confirmation
                        Swal.fire({
                            title: 'Are you sure?',
                            text: 'You won\'t be able to revert this!',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d33',
                            cancelButtonColor: '#3085d6',
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'No, cancel!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Determine which delete file to use based on role
                                const deleteFile = role === 'steward' ? 'delete_steward.php' : 'delete_housekeeper.php';
                                
                                // Proceed with deletion by sending the request via AJAX
                                fetch(deleteFile, {
                                        method: 'POST',
                                        body: new URLSearchParams({
                                            'role': role,
                                            'id': id // Send the ID to the backend
                                        }),
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.message) {
                                            // Show success alert
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Deleted!',
                                                text: 'The ' + role + ' has been deleted.',
                                                showConfirmButton: false, // Hide the OK button
                                                timer: 2000 // Auto close after 2 seconds
                                            }).then(() => {
                                                // Reload the page to update the list
                                                location.reload();
                                            });
                                        } else {
                                            // Show error alert
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Error!',
                                                text: 'Failed to delete the ' + role + '.',
                                                showConfirmButton: false, // Hide the OK button
                                                timer: 2000 // Auto close after 2 seconds
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        // Handle any errors
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error!',
                                            text: 'Something went wrong.',
                                            showConfirmButton: false, // Hide the OK button
                                            timer: 3000 // Auto close after 3 seconds
                                        });
                                    });

                            }
                        });
                    });
                });
            });
        </script>

        <script>
            document.getElementById('submitAdmin').addEventListener('click', function() {
                const email = document.getElementById('adminEmail').value;
                const password = document.getElementById('adminPassword').value;
                const role = document.getElementById('adminRole').value;

                fetch("add_admin.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password,
                            role
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: data.error,
                                showConfirmButton: false, // Hide the OK button
                                timer: 3000 // Auto close after 3 seconds (optional)
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: data.message,
                                showConfirmButton: false, // Hide the OK button
                                timer: 2500 // Auto close after 3 seconds (optional)
                            }).then(() => location.reload());
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Something went wrong while adding the steward.",
                            showConfirmButton: false, // Hide the OK button
                            timer: 3000 // Auto close after 3 seconds (optional)
                        });
                    });
            });
            
            // Add Housekeeper handler
            document.getElementById('submitHousekeeper').addEventListener('click', function() {
                const email = document.getElementById('housekeeperEmail').value;
                const password = document.getElementById('housekeeperPassword').value;
                const role = document.getElementById('housekeeperRole').value;

                fetch("add_housekeeper.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password,
                            role
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: data.error,
                                showConfirmButton: false,
                                timer: 3000
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: data.message,
                                showConfirmButton: false,
                                timer: 2500
                            }).then(() => location.reload());
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Something went wrong while adding the housekeeper.",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    });
            });
        </script>

        <?php if ($showPopup): ?>
            <script>
                // Show the popup if country or currency is not set
                $(document).ready(function() {
                    const countries = <?php echo json_encode($countries); ?>; // Pass countries array to JavaScript
                    const currencies = <?php echo json_encode($currencies); ?>; // Pass currencies array to JavaScript

                    let countryOptions = countries.map(country =>
                        `<option value="${country.country_id}">${country.country_name}</option>`).join('');
                    let currencyOptions = currencies.map(currency =>
                        `<option value="${currency.currency_id}">${currency.currency}</option>`).join('');

                    Swal.fire({
                        title: 'Add Country and Currency',
                        html: `<form id="add-country-currency-form" action="add_country_currency.php" method="post">
                    <div class="form-group">
                        <label for="country">Country</label>
                        <select class="form-control" id="country" name="country" required>
                            <option value="">Select Country</option>
                            ${countryOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="currency">Currency</label>
                        <select class="form-control" id="currency" name="currency" required>
                            <option value="">Select Currency</option>
                            ${currencyOptions}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>`,
                        showCancelButton: false,
                        showConfirmButton: false
                    });
                });
            </script>
        <?php endif; ?>


        <!--====== Footer Section Start ======-->
        <footer class="footer-section  ">
            <div class="container">

                <div class="copyright-area text-center">
                    <p>© <?php echo date("Y"); ?> <a href="http://www.knowebsolutions.com" target="_blank">Knoweb (PVT) LTD.</a> All rights
                        reserved</p>
                </div>
            </div>
            <img class="dots-shape" src="assets/images/shapes/dots.png" alt="Shape">
            <img class="tringle-shape" src="assets/images/shapes/tringle.png" alt="Shape">
            <img class="close-shape" src="assets/images/shapes/close.png" alt="Shape">
            <img class="circle-shape" src="assets/images/shapes/circle.png" alt="Shape">
            <div class="left-circles"></div>
            <div class="right-circles"></div>
        </footer>
        <!--====== Footer Section End ======-->

    </div>
    <!--End pagewrapper-->


    <!-- Scroll Top Button -->
    <button class="scroll-top scroll-to-target" data-target="html"><span class="fa fa-angle-up"></span></button>


    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <!--====== Jquery ======-->
    <script src="assets/js/jquery-3.6.0.min.js"></script>

    <!--====== Bootstrap ======-->
    <script src="assets/js/bootstrap.4.5.3.min.js"></script>
    <!--====== Appear js ======-->
    <script src="assets/js/appear.js"></script>
    <!--====== WOW js ======-->
    <script src="assets/js/wow.min.js"></script>
    <!--====== Isotope ======-->
    <script src="assets/js/isotope.pkgd.min.js"></script>
    <!--====== Circle Progress ======-->
    <script src="assets/js/circle-progress.min.js"></script>
    <!--====== Image loaded ======-->
    <script src="assets/js/imagesloaded.pkgd.min.js"></script>
    <!--====== Nice Select ======-->
    <script src="assets/js/jquery.nice-select.min.js"></script>
    <!--====== Magnific ======-->
    <script src="assets/js/jquery.magnific-popup.min.js"></script>
    <!--====== Slick Slider ======-->
    <script src="assets/js/slick.min.js"></script>
    <!--====== Main JS ======-->
    <script src="assets/js/script.js"></script>

</body>

</html>
