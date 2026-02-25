<?php

session_start(); // Start the session
// Check if restaurant_id and restaurant_logo exist in session storage
$isLoggedIn = isset($_SESSION['restaurant_id']) && isset($_SESSION['restaurant_']);
$restaurantLogo = $isLoggedIn ? $_SESSION['restaurant_logo'] : null; // Fetch restaurant logo if logged in

// Check if the discount is set in the URL and ensure it is only 3 (for 7% off)
$discount = isset($_GET['discount']) && $_GET['discount'] == 8 ? 8 : 0;

// Original prices of the packages
$basicPrice = 25;
$standardPrice = 50;
$premiumPrice = 75;

// Apply the discount if it's present (8% off)
$basicPriceWithDiscount = $basicPrice * (1 - $discount / 100);
$standardPriceWithDiscount = $standardPrice * (1 - $discount / 100);
$premiumPriceWithDiscount = $premiumPrice * (1 - $discount / 100);
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
    <title>Anawuma | Pricing</title>
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
    <style>
        .original-price {
            text-decoration: line-through;
            color: red;
        }

        .discounted-price {
            color: green;
            font-weight: bold;
        }
    </style>
</head>

<body class="home-three">
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
                                                src="assets/images/logos/logo-rmbg-2.png" alt="Logo"></a>
                                    </div>
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
                                        <li class="current"><a href="pricing.php">Pricing</a></li>
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
                                            alt="Restaurant Logo"
                                            class="rounded-circle border shadow-sm me-2"
                                            width="50"
                                            height="50">
                                        <!-- Restaurant Name -->
                                        <span class="fw-bold text-dark "> <?php echo htmlspecialchars($_SESSION['restaurant_name']); ?></span>
                                    </a>
                                </div>
                            <?php else: ?>
                                <!-- Show Register and Login buttons -->
                                <a href="./register_hotel.php" class="login">Register Hotel <i class="fas fa-arrow-right"></i> </a>
                                <a href="./login.php" class="theme-btn style-two">Hotel Login <i class="fas fa-lock"></i></a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Header Upper-->

        </header>
        <!--====== Header Part End ======-->

        <!--====== Services Solutions Start ======-->
        <section class=" rel z-1 py-50 rpy-50">

        </section>
        <!--====== Services Solutions End ======-->


        <!--====== Pricing Section Start ======-->
        <section class="pricing-section rel z-1 bg-green pt-50 rpt-50 pb-100 rpb-70">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-7 col-lg-8 col-md-10">
                        <div class="section-title text-center text-white mb-45">
                            <span class="sub-title">Pricing Package</span>
                            <h2>Stop Losing Orders to Long Wait Times.</h2>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <!-- Basic Plan -->
                    <div class="col-lg-4 col-md-6">
                        <div class="pricing-item wow fadeInUp delay-0-2s">
                            <h5 class="price-title">Basic Plan</h5>
                            <?php if ($discount > 0): ?><span class="original-price">$<?php echo $basicPrice; ?>
                                    /monthly</span>
                            <?php endif; ?>
                            <span
                                class="price discounted-price"><?php echo number_format($basicPriceWithDiscount, 2); ?>
                            </span>
                            <p>Includes basic Table QR functionality for easy table ordering via QR codes.</p>
                            <a href="./checkout.php?package=basic" class="theme-btn">Choose Package <i
                                    class="fas fa-long-arrow-alt-right"></i></a>
                            <ul class="list-style-one">
                                <li>Add Menus</li>
                                <li>Add Food Items</li>
                                <li>Orders Tracking</li>
                                <li>Billing</li>
                                <li>10 tables/ QR codes per store</li>
                                <li>Manage 1 store</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Standard Plan -->
                    <div class="col-lg-4 col-md-6">
                        <div class="pricing-item wow fadeInUp delay-0-4s">
                            <h5 class="price-title">Standard Plan</h5>
                            <?php if ($discount > 0): ?>
                                <span class="original-price">$<?php echo $standardPrice; ?> /monthly</span>
                            <?php endif; ?>
                            <span
                                class="price discounted-price"><?php echo number_format($standardPriceWithDiscount, 2); ?>
                            </span>
                            <p>Includes Table QR ordering and Special Offers management to promote deals directly to
                                customers.</p>
                            <a href="./checkout.php?package=standard" class="theme-btn">Choose Package <i
                                    class="fas fa-long-arrow-alt-right"></i></a>
                            <ul class="list-style-one">
                                <li>Add Menus</li>
                                <li>Add Food Items</li>
                                <li>Orders Tracking</li>
                                <li>Billing</li>
                                <li>Special Offers</li>
                                <li>Access to sales and revenue report</li>
                                <li>15 tables/ QR codes per store</li>
                                <li>Manage up to 2 stores</li>   
                            </ul>
                        </div>
                    </div>

                    <!-- Premium Plan -->
                    <div class="col-lg-4 col-md-6">
                        <div class="pricing-item wow fadeInUp delay-0-4s">
                            <h5 class="price-title">Premium Plan</h5>
                            <?php if ($discount > 0): ?>
                                <span class="original-price">$<?php echo $premiumPrice; ?> /monthly</span>
                            <?php endif; ?>
                            <span
                                class="price discounted-price"><?php echo number_format($premiumPriceWithDiscount, 2); ?>
                            </span>
                            <p>Includes Table QR, Special Offers, and Room QR with Housekeeping management for complete
                                restaurant and hotel service integration.</p>
                            <a href="./checkout.php?package=gold" class="theme-btn">Choose Package <i
                                    class="fas fa-long-arrow-alt-right"></i></a>
                            <ul class="list-style-one">
                                <li>Add Menus</li>
                                <li>Add Food Items</li>
                                <li>Orders Tracking</li>
                                <li>Billing</li>
                                <li>Special Offers</li>
                                <li>Access to sales and revenue report</li>
                                <li>Room QR with Housekeeping</li>
                                <li>15 tables/ QR codes per store</li>
                                <li>Manage up to 2 stores</li> 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--====== Pricing Section End ======-->

        <!--====== Feedback Section Start ======-->
        <section class="rel z-1 py-50 rpy-50">

        </section>
        <!--====== Feedback Section End ======-->


        <!--====== Footer Section Start ======-->
        <footer class="footer-section bg-lighter rel z-1">
            <div class="container">
                <div class="call-to-action bg-blue bgs-cover text-white rel z-1">
                    <div class="row align-items-center">
                        <div class="col-xl-7 col-lg-6">
                            <div class="section-title mb-20">
                                <h2>Ready to Enhance Your Hospitality Business?</h2>
                                <p>Contact us today to learn more about Anawuma and how it can revolutionize the way
                                    you serve your guests.</p>
                            </div>
                        </div>
                        <div class="col-xl-5 col-lg-6">
                            <div class="call-to-action-btns text-xl-right mb-20">
                                <a href="./register_hotel.php" class="theme-btn style-two rmb-15">Register Now <i
                                        class="fas fa-arrow-right"></i></a>
                                <a href="./about.php" class="theme-btn style-three rmb-15">Learn More <i
                                        class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <img class="white-circle" src="assets/images/shapes/white-circle.png" alt="White Circle">
                    <img class="white-dots slideUpRight" src="assets/images/shapes/white-dots.png" alt="shape">
                    <img class="white-dots-circle slideLeftRight" src="assets/images/shapes/white-dots-circle.png"
                        alt="shape">
                </div>

                <div class="row justify-content-between">
                    <div class="col-xl-3 col-sm-6 col-7 col-small">
                        <div class="footer-widget about-widget">
                            <div class="footer-logo mb-20">
                                <a href="index.php"><img src="assets/images/logos/logo-rmbg-2.png" alt="Logo"></a>
                            </div>
                            <div class="social-style-one mt-25">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>

                        </div>
                    </div>
                    <div class="col-xl-2 col-sm-4 col-5 col-small">
                        <div class="footer-widget link-widget">
                            <h4 class="footer-title">About</h4>
                            <ul class="list-style-two">
                                <li><a href="./about.php">Company</a></li>
                                <li><a href="./contact.php">Contact</a></li>

                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4">
                        <div class="footer-widget link-widget">
                            <h4 class="footer-title">Quick Links</h4>
                            <ul class="list-style-two two-column">
                                <li><a href="./pricing.php">Pricing</a></li>
                                <li><a href="./register_hotel.php">Register</a></li>
                                <li><a href="./login.php">Login</a></li>


                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-4">
                        <div class="footer-widget contact-widget">
                            <h4 class="footer-title">Get in Touch</h4>
                            <ul class="list-style-three">
                                <li><i class="fas fa-map-marker-alt"></i> No 16, Wewalwala Road, Bataganwila, Galle.</li>
                                <li><i class="fas fa-envelope-open"></i> <a
                                        href="mailto:info@anawuma.com">info@anawuma.com</a></li>
                                <li><i class="fas fa-phone"></i> Call : <a href="callto:+94777547239">(+94)777 547 239</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="copyright-area text-center">
                    <p>© <?php echo date("Y"); ?> <a href="http://knowebsolutions.com" target="_blank"
                            rel="noopener noreferrer">Knoweb (PVT) LTD.</a> All rights reserved</p>
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

    <!-- Scroll Top Button -->
    <button class="scroll-top scroll-to-target" data-target="html"><span class="fa fa-angle-up"></span></button>


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