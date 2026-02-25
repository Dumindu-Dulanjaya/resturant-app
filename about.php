<?php
session_start(); // Start the session
$isLoggedIn = isset($_SESSION['restaurant_id']); // Check if restaurant is logged in
$restaurantLogo = $isLoggedIn ? $_SESSION['restaurant_logo'] : null; // Fetch restaurant logo if logged in
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
    <title>Anawuma | About Us</title>
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

</head>

<body class="inner-page">
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
                                    <div width="30%" class="logo"><a href="./index.php "><img width="200"
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
                                        <li><a href="./index.php ">Home</a></li>

                                        <li><a href="./index.php #features-section">Features</a></li>
                                        <li><a href="./index.php #services-section">Services</a></li>

                                        <li class="current"><a href="./about.php">About</a></li>
                                        <li><a href="./blog.php">Blogs</a></li>
                                       <!-- <li><a href="./pricing.php ">Pricing</a></li> -->
                                        <li><a href="./contact.php ">contact</a></li>


                                        <li class="dropdown">
                                            <a href="#" class="dropbtn">More</a>
                                            <ul class="dropdown-menu">
                                                <li><a href="restaurant_admin_login.php">Restaurant Admin</a></li>
                                                <li><a href="super_admin_login.php">Super Admin</a></li>
                                                <li><a href="admin_login.php">Admin</a></li>
                                                <li><a href="steward_login.php">Steward Login</a></li>
                                            </ul>
                                            </li>

                                       




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
                                <a href="./register_hotel.php" class="login">Register Restaurant <i class="fas fa-arrow-right"></i> </a>
                                <a href="./login.php" class="theme-btn style-two">Restaurant Login <i class="fas fa-lock"></i></a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Header Upper-->

        </header>
        <!--====== Header Part End ======-->

        <!--====== Page Banner Start ======-->
       <section class="about-page-section rel z-1 pt-130 rpt-100 pb-130 rpb-100">
    <div class="container">
        <div class="row align-items-center">

            <!-- IMAGE COLUMN -->
            <div class="col-lg-6 mb-4 mb-lg-0">
                <div class="about-page-images wow fadeInLeft delay-0-2s text-center">
                    <img 
                        src="assets/images/contacts/about.png" 
                        alt="About Us"
                        style="
                            width: 100%;
                            max-width: none;
                            max-height: 520px;
                            height: auto;
                            object-fit: contain;
                            border-radius: 14px;
                            filter: drop-shadow(0 15px 35px rgba(0,0,0,0.15));
                        "
                    >
                </div>
            </div>

            <!-- CONTENT COLUMN -->
            <div class="col-lg-6">
                <div class="about-page-content wow fadeInRight delay-0-2s pl-lg-5">

                    <div class="section-title mb-35">
                        

                        <h2 
                            style="
                                font-size: 32px;
                                font-weight: 700;
                                margin-bottom: 4px;
                                color: #000;
                            "
                        >
                            Anawuma:<br> More Than Software. It’s a Service.
                        </h2>
                    </div>

                    <p style="margin-bottom:10px;">
                                        <strong>The Spark</strong><br>
                                        The journey of <span><b>Knoweb (Pvt) Ltd</b></span> began with a simple realization: the restaurant industry was running on
                                        passion, but slowing down on outdated systems. We know because we’ve been there. As former restaurant employees,
                                        we felt the stress of the Friday night rush, the lost orders, the communication gaps, and the frantic pace.
                                        </p>

                                        <p style="margin-bottom:20px;">
                                        <strong>The Solution</strong><br>
                                        We didn't want to just build another app; we wanted to build a <i>relief system</i>. Anawuma was designed to tackle the
                                        real-world friction of dining. We combined our hands-on hospitality experience with cutting-edge technology to
                                        create a platform that feels natural to use for the guest, the waiter, and the manager.
                                        </p>

                                        <p>
                                        <strong>Our Mission</strong><br>
                                        To empower restaurants worldwide with technology that respects local cultures of hospitality. We handle the
                                        data so you can focus on the food.
                                        </p>

                </div>
            </div>

        </div>
    </div>
</section>

        <!--====== Page Banner End ======-->


        <!--====== About Section Start ======-->

        <!--
        <section class="about-page-section rel z-1 pt-130 rpt-100">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-6 col-lg-6">
                        <div class="about-page-content rmb-65 wow fadeInLeft delay-0-2s">
                            <div class="section-title mb-25">
                                <span class="sub-title">Our Story</span>
                                <h2>Our Path to Innovation and Excellence</h2>
                            </div>
                                    <p style="margin-bottom:20px;">
                                        <strong>The Spark</strong><br>
                                        The journey of <span>Knoweb (Pvt) Ltd</span> began with a simple realization: the restaurant industry was running on
                                        passion, but slowing down on outdated systems. We know because we’ve been there. As former restaurant employees,
                                        we felt the stress of the Friday night rush—the lost orders, the communication gaps, and the frantic pace.
                                        </p>

                                        <p style="margin-bottom:20px;">
                                        <strong>The Solution</strong><br>
                                        We didn't want to just build another app; we wanted to build a relief system. Anawuma was designed to tackle the
                                        real-world friction of dining. We combined our hands-on hospitality experience with cutting-edge technology to
                                        create a platform that feels natural to use—for the guest, the waiter, and the manager.
                                        </p>

                                        <p>
                                        <strong>Our Mission</strong><br>
                                        To empower restaurants worldwide with technology that respects local cultures of hospitality. We handle the
                                        data so you can focus on the food.
                                        </p>


                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">

                           

                       <div class="about-page-images justify-content-lg-end wow fadeInRight delay-0-2s"> 
                            <img src="assets/images/logos/Anawuma QR Software.png" alt="About">
                           
                    </div>
                </div>
            </div>
        </section>
                            -->
                            
        <!--====== About Section End ======-->
   





        <!--====== Services Solutions Start ======-->
        <section class="core-values-section rel z-1 py-10 rpy-70">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-xl-6 col-lg-8 col-md-10">
                        <div class="section-title mb-55">
                            
                            <h2>Core Values</h2>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-xl-8 col-lg-10">
                        <ul class="list-style-one" style="font-size: 16px; line-height: 2;">
                            <li><strong>Empathy:</strong> We solve problems we've actually lived.</li>
                            <li><strong>Simplicity:</strong> Technology should serve you, not confuse you.</li>
                            <li><strong>Universally Local:</strong> One platform that speaks the language of hospitality in every country.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        

        
        <!--====== Core Values Section End ======-->

        <!--====== Services Solutions Start ======-->
        <section class="services-solutions rel z-1 py-100 rpy-130">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-xl-6 col-lg-8 col-md-10">
                        <div class="section-title mb-60">
                            <span class="sub-title">How It works</span>
                            <h2>How Our System Works for You</h2>
                        </div>
                    </div>
                </div>
                <div class="solutions-tab">
                    <div class="row">
                        <div class="col-xl-4">
                            <ul
                                class="nav solutions-tab-nav nav-pills flex-xl-column nav-fill mb-50 wow fadeInUp delay-0-2s">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#watching">
                                        <i class="flaticon-play-button"></i>
                                        <div class="content">
                                            <h3>Set Up Your Account</h3>

                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#sharing">
                                        <i class="flaticon-sharing"></i>
                                        <div class="content">
                                            <h3>Customize Your Menus and Services</h3>

                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#editing">
                                        <i class="flaticon-edit"></i>
                                        <div class="content">
                                            <h3>Generate QR Codes for Tables/Rooms</h3>

                                        </div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#comments">
                                        <i class="flaticon-chat"></i>
                                        <div class="content">
                                            <h3>Customers Scan QR Codes to Access Menus and other Services</h3>

                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-xl-8">
                            <div class="tab-content solutions-tab-content wow fadeInUp delay-0-4s">
                                <div class="tab-pane fade show active" id="watching">
                                    <img src="assets/images/services/setup.png" alt="Dashboard">
                                </div>
                                <div class="tab-pane fade" id="sharing">
                                    <img src="assets/images/services/customize.png" alt="Dashboard">
                                </div>
                                <div class="tab-pane fade" id="editing">
                                    <img src="assets/images/services/qr_codes.png" alt="Dashboard">
                                </div>
                                <div class="tab-pane fade" id="comments">
                                    <img src="assets/images/services/scan.png" alt="Dashboard">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--====== Services Solutions End ======-->


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
                                <li><i class="fas fa-map-marker-alt"></i> No.421, 4th floor, sanvick plaza, Wakwella Rd,
                                    Galle.</li>
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
    <!--End pagewrapper-->


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