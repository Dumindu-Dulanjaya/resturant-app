<?php
session_start(); // Start the session

$isLoggedIn = isset($_SESSION['restaurant_id']); // Check if restaurant is logged in
$restaurantLogo = $isLoggedIn ? $_SESSION['restaurant_logo'] : null; // Fetch restaurant logo if logged in

// Check if the user is logged in by checking if the session variable is set
if (!isset($_SESSION['restaurant_id'])) {
    // User is not logged in, redirect to the login page
    header("Location: login.php");
    exit(); // Always use exit after header redirection
}

// User is logged in, proceed with loading the checkout page content
?>
<!DOCTYPE html>
<html lang="zxx">

<head>
    <!--====== Required meta tags ======-->
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!--====== Title ======-->
    <title>Anawuma | Checkout</title>
    <!--====== Favicon Icon ======-->
    <link rel="shortcut icon" href="assets/images/favicon.png" type="image/x-icon" />
    <!--====== Google Fonts ======-->
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet" />
    <!--====== Font Awesome ======-->
    <link rel="stylesheet" href="assets/css/fontawesome.5.9.0.min.css" />
    <!--====== Flaticon CSS ======-->
    <link rel="stylesheet" href="assets/css/flaticon.css" />
    <!--====== Bootstrap css ======-->
    <link rel="stylesheet" href="assets/css/bootstrap.4.5.3.min.css" />
    <!--====== Magnific Popup ======-->
    <link rel="stylesheet" href="assets/css/magnific-popup.css" />
    <!--====== Slick Slider ======-->
    <link rel="stylesheet" href="assets/css/slick.css" />
    <!--====== Animate CSS ======-->
    <link rel="stylesheet" href="assets/css/animate.min.css" />
    <!--====== Nice Select ======-->
    <link rel="stylesheet" href="assets/css/nice-select.css" />
    <!--====== Padding Margin ======-->
    <link rel="stylesheet" href="assets/css/spacing.min.css" />
    <!--====== Menu css ======-->
    <link rel="stylesheet" href="assets/css/menu.css" />
    <!--====== Main css ======-->
    <link rel="stylesheet" href="assets/css/style.css" />
    <!--====== Responsive css ======-->
    <link rel="stylesheet" href="assets/css/responsive.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
                                                src="assets/images/logos/logo.png" alt="Logo"></a></div>
                                    <!-- Toggle Button -->
                                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                                        data-target=".navbar-collapse" aria-controls="main-menu">
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>

                                <div class="navbar-collapse collapse clearfix" id="main-menu">
                                    <ul class="navigation clearfix">
                                        <li><a href="index.php">Home</a></li>
                                        <li><a href="about.php">about</a></li>
                                        <li><a href="./blog.php">Blogs</a></li>
                                        <li><a href="pricing.php">Pricing</a></li>
                                        <li><a href="contact.php">contact</a></li>
                                    </ul>
                                </div>
                            </nav>

                            <!-- Main Menu End-->
                        </div>

                        <div class="menu-right d-none d-lg-flex align-items-center">
                            <?php if (isset($_SESSION['restaurant_logo']) && isset($_SESSION['restaurant_name'])): ?>
                            <!-- Display the restaurant logo and name -->
                            <div class="d-flex align-items-center">
                                <!-- Profile Picture -->
                                <a href="./profile.php" class="d-flex align-items-center text-decoration-none">
                                    <img src="./menus/assets/<?php echo $_SESSION['restaurant_logo']; ?>"
                                        alt="Restaurant Logo" class="rounded-circle border shadow-sm me-2" width="50"
                                        height="50">
                                    <!-- Restaurant Name -->
                                    <span class="fw-bold text-dark ">
                                        <?php echo htmlspecialchars($_SESSION['restaurant_name']); ?></span>
                                </a>
                            </div>
                            <?php else: ?>
                            <!-- Show Register and Login buttons -->
                            <a href="./register_hotel.php" class="login">Register Hotel <i
                                    class="fas fa-arrow-right"></i> </a>
                            <a href="./login.php" class="theme-btn style-two">Hotel Login <i
                                    class="fas fa-lock"></i></a>
                            <?php endif; ?>

                        </div>
                    </div>
                </div>
            </div>
            <!--End Header Upper-->
        </header>
        <!--====== Header Part End ======-->

        <!--====== Checkout Form ======-->
        <section class="contact-section-two rel z-1 pt-115 rpt-105 pb-115 rpb-55">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-xl-6 col-lg-8 mt-10 col-md-10">
                        <div class="section-title mb-50">
                            <span class="sub-title">Choose Your Plan</span>
                            <h2>Checkout and Get Started!</h2>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <!-- Left Side (Package Selection) -->
                    <div class="col-lg-6">
                        <form id="checkout-form" class="contact-form-two py-45 wow fadeInRight delay-0-2s"
                            action="process_checkout.php" method="post">
                            <div class="row clearfix">
                                <!-- Package Selection -->
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label for="package">Package</label>
                                        <select id="package" name="package" class="form-control"
                                            onchange="updatePackageDetails()" required>
                                            <option value="" disabled selected>
                                                Select Package
                                            </option>
                                            <option value="basic" data-price="25">
                                                Basic Package
                                            </option>
                                            <option value="standard" data-price="50">
                                                Standard Package
                                            </option>
                                            <option value="gold" data-price="75">
                                                Gold Package
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" name="promo_code" id="promo_code"
                                                placeholder="Enter promo code" class="form-control">
                                            <button type="button" id="apply_promo"
                                                class="theme-btn input-group-append">Apply Promo</button>
                                        </div>
                                        <div id="promo_message" style="margin-top: 10px;"></div>
                                        <!-- This is where the promo code message will be shown -->
                                    </div>

                                </div>
                            </div>

                            <!-- Checkout Button -->
                            <button class="theme-btn" type="submit">
                                Complete Purchase
                            </button>
                        </form>
                    </div>

                    <!-- Right Side (Package Summary) -->
                    <div class="col-lg-6">
                        <div class="checkout-summary py-45 wow fadeInLeft delay-0-2s">
                            <div class="summary-header">
                                <h3>Order Summary</h3>
                            </div>
                            <div class="summary-details">
                                <p>
                                    Selected Package: <span id="selected-package">None</span>
                                </p>
                                <p>Package Price: $<span id="package-price">0.00</span></p>
                                <p>
                                    Discounts / Promotions: -($<span id="discount-price">0.00</span>)
                                </p>
                                <hr />

                            </div>
                            <div class="summary-footer">
                                <h4>Total: <span id="total">$0.00</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <script>
        $(document).ready(function() {
            // Function to update the total price
            function updateTotalPrice(discountPercent = 0) {
                const packageSelect = $("#package");
                const selectedOption = packageSelect.find(":selected");
                const packagePrice = parseFloat(selectedOption.data("price")) || 0; // Package price
                const discountAmount = (packagePrice * discountPercent / 100).toFixed(2);
                const discountedPrice = (packagePrice - discountAmount).toFixed(2);

                // Update UI
                $("#selected-package").text(selectedOption.text());
                $("#package-price").text(packagePrice.toFixed(2));
                $("#discount-price").text(discountAmount); // New discount field
                $("#total").text(`$${discountedPrice}`);
            }

            // Validate promo code
            function validatePromoCode(promoCode) {
                $.ajax({
                    url: "validate_promo_code.php",
                    type: "POST",
                    data: {
                        promo_code: promoCode
                    },
                    dataType: "json",
                    success: function(response) {
                        if (response.status) {
                            $("#promo_message").text(response.message).css("color", "green");
                            const discountPercent = response.discount || 0;
                            updateTotalPrice(discountPercent);
                        } else {
                            $("#promo_message").text(response.message).css("color", "red");
                            updateTotalPrice(); // Reset to original price
                        }
                    },
                    error: function() {
                        $("#promo_message").text("Error validating promo code.").css("color",
                        "red");
                    }
                });
            }

            // Apply promo code
            $("#apply_promo").click(function() {
                const promoCode = $("#promo_code").val().trim();
                if (promoCode) {
                    validatePromoCode(promoCode);
                } else {
                    $("#promo_message").text("Please enter a promo code.").css("color", "red");
                }
            });

            // Update price on package selection
            $("#package").change(function() {
                const promoCode = $("#promo_code").val().trim();
                if (promoCode) {
                    validatePromoCode(promoCode);
                } else {
                    updateTotalPrice(); // No promo code applied
                }
            });

            // Pre-fill promo code and package if in URL
            const urlParams = new URLSearchParams(window.location.search);
            const promoCode = urlParams.get("promo");
            const selectedPackage = urlParams.get("package");

            if (selectedPackage) {
                $("#package").val(selectedPackage);
            }
            if (promoCode) {
                $("#promo_code").val(promoCode);
                validatePromoCode(promoCode);
            } else {
                updateTotalPrice();
            }
        });
        </script>

        <script>
        $(document).ready(function() {
            // Get URL parameters
            var urlParams = new URLSearchParams(window.location.search);
            var selectedPackage = urlParams.get("package"); // Extract 'package' from URL

            // If a package exists in the URL, select it in the dropdown
            if (selectedPackage) {
                $("#package").val(selectedPackage);
            }
        });
        </script>
        <script>
        // Function to get query parameter by name
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // On page load, set the package select option
        window.onload = function() {
            const packageParam = getQueryParam("package");
            if (packageParam) {
                const packageSelect = document.getElementById("package");
                packageSelect.value = packageParam;
                updatePackageDetails();
            }
        };
        // Function to update package details in the summary
        function updatePackageDetails() {
            const packageSelect = document.getElementById("package");
            const selectedOption = packageSelect.options[packageSelect.selectedIndex];
            const selectedPackage = selectedOption.text;
            // const packagePrice = selectedOption.getAttribute("data-price");

            document.getElementById("selected-package").textContent = selectedPackage;
            document.getElementById("package-price").textContent = packagePrice;
            // document.getElementById("total").textContent = '$' + packagePrice;
        }
        </script>
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