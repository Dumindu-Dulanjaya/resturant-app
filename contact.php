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
    <title>Anawuma | Contact</title>
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

                                        <li><a href="./about.php">About</a></li>
                                        <li><a href="./blog.php">Blogs</a></li>
                                       <!-- <li><a href="./pricing.php ">Pricing</a></li> -->
                                        <li class="current"><a href="./contact.php ">contact</a></li>


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



        <section class="pricing-section bg-lighter rel z-1 pt-150 rpt-100">
            <!--====== Contact Section Start ======-->
            <div class="contact-section pb-70 rpb-100">
                <div class="container">

                     

                        <div class="row align-items-center mb-50">
                        <div class="col-lg-6">
                            <div class="section-title mb-30">
                                <span class="sub-title">Support</span>
                                <h2>We are here to help</h2>
                            </div>
                            <p>Have questions or need support? Our dedicated team is here to help you! Whether you need assistance with implementation, custom feature requests, or inquiries about our services, we are just a message away.</p>
                        </div>
                        <div class="col-lg-6">
                            <div class="contact-image wow fadeInRight delay-0-2s">
                                <img src="assets/images/blog/contact.png" alt="Contact Support" style="border-radius: 20px;">
                            </div>
                        </div>
                    </div>




                    <div class="contact-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.7040591650016!2d80.21461147520641!3d6.035289228643694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bba7051d79%3A0xf009ef4c921a2a90!2sSanvik%2C%20Wakwella%20Rd%2C%20Galle%2080000!5e0!3m2!1sen!2slk!4v1727693065957!5m2!1sen!2slk"
                            height="550" style="border: 0; width: 100%" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-10 col-11">
                            <form id="contactForm" class="contact-form bg-white" name="contactForm" action="#"
                                method="post">
                                <div class="row clearfix">
                                    <div class="col-xl-4 col-md-6">
                                        <div class="form-group">
                                            <label for="name">Full Name</label>
                                            <input type="text" id="name" name="name" class="form-control"
                                                placeholder="Type your name" required />
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-md-6">
                                        <div class="form-group">
                                            <label for="number">phone number</label>
                                            <input type="text" id="number" name="number" class="form-control"
                                                placeholder="Type your phone number" />
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-md-6">
                                        <div class="form-group">
                                            <label for="company">Hotel / Restaurant name</label>
                                            <input type="text" id="company" name="company" class="form-control"
                                                placeholder="Type your Company" />
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-md-6">
                                        <div class="form-group">
                                            <label for="email">Email Address</label>
                                            <input type="email" id="email" name="email" class="form-control"
                                                placeholder="Type your Email Address" required />
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-md-6">
                                        <div class="form-group">
                                            <label for="subject">subject</label>
                                            <input type="text" id="subject" name="subject" class="form-control"
                                                placeholder="I would like to ........." />
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-md-6">
                                        <div class="form-group">
                                            <label for="website">website</label>
                                            <input type="url" id="website" name="website" class="form-control"
                                                placeholder="Type your website" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="message">message</label>
                                            <textarea name="message" id="message" rows="4" placeholder="Write message"
                                                required></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group text-center mb-0">
                                            <button class="theme-btn" type="submit">
                                                send us message <i class="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!--====== Contact Section End ======-->
        </section>
        <!--====== Footer Section Start ======-->
        <footer class="footer-section footer-two bg-lighter rel z-1">
            <div class="container">
                <div class="">
                    <img class="white-circle" src="assets/images/shapes/white-circle.png" alt="White Circle" />
                    <img class="white-dots slideUpRight" src="assets/images/shapes/white-dots.png" alt="shape" />
                    <img class="white-dots-circle slideLeftRight" src="assets/images/shapes/white-dots-circle.png"
                        alt="shape" />
                </div>

                <div class="row justify-content-between">
                    <div class="col-xl-3 col-sm-6 col-7 col-small">
                        <div class="footer-widget about-widget">
                            <div class="footer-logo mb-20">
                                <a href="./index.php"><img src="assets/images/logos/logo-rmbg-2.png" alt="Logo" /></a>
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
            <img class="dots-shape" src="assets/images/shapes/dots.png" alt="Shape" />
            <img class="tringle-shape" src="assets/images/shapes/tringle.png" alt="Shape" />
            <img class="close-shape" src="assets/images/shapes/close.png" alt="Shape" />
            <img class="circle-shape" src="assets/images/shapes/circle.png" alt="Shape" />
        </footer>
        <!--====== Footer Section End ======-->
    </div>
    <!-- Scroll Top Button -->
    <button class="scroll-top scroll-to-target" data-target="html">
        <span class="fa fa-angle-up"></span>
    </button>

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