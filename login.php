<?php
session_start(); // Start the session

// Check if the user is logged in by checking if the session variable is set
if (isset($_SESSION['restaurant_id'])) {
    // User is not logged in, redirect to the login page
    header("Location: ./profile.php");
    exit(); // Always use exit after header redirection
}
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
    <title>Anawuma | Login</title>
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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body {
            max-height: 100%;
        }

        .small-alert {
            font-size: 14px;
            padding: 10px 15px;
            width: 250px;
            /* Make the alert narrower */
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
                            <a href="./register_hotel.php" class="theme-btn style-two">Register<i
                                    class="fas fa-lock"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Header Upper-->
        </header>
        <!--====== Header Part End ======-->

        <!--====== Login Form ======-->
        <section class="contact-section-two rel z-1 pt-50 rpt-105 rpb-55">
            <div class="container  pt-100 ">
                <div class="row justify-content-center text-center">
                    <div class="col-xl-6 col-lg-8 col-md-10">
                        <div class="section-title mb-50">
                            <span class="sub-title">Welcome Back</span>
                            <h2>Login to Your Hotel / Restaurant Account</h2>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <!-- Left Side (Optional Section) -->
                    <div class="col-lg-6">
                        <div class=" wow fadeInLeft delay-0-2s">
                            <div class=" wow fadeInLeft delay-0-2s">
                                <img src="./assets/images/features/20824342_6343845.jpg" alt="" srcset="">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form id="login-form" class="contact-form-two py-45 wow fadeInRight delay-0-2s"
                            action="process_login.php" method="post">
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <input type="email" id="email" name="email" class="form-control"
                                            placeholder="Email " required />
                                    </div>
                                </div>
                                <!-- Password Field with Eye Icon -->
                                <div class="col-sm-12">
                                    <div class="form-group position-relative">
                                        <input type="password" id="password" name="password" class="form-control"
                                            placeholder="Password" required />
                                        <span class="fa fa-eye position-absolute" id="togglePassword"
                                            style="top: 50%; right: 10px; cursor: pointer"></span>
                                    </div>
                                </div>
                            </div>
                            <button class="theme-btn" type="submit">
                                Login
                            </button>
                            <p class="mt-4">Don't have an account? <a href="register_hotel.php"
                                    class="text-primary ">Register
                                    here</a></p>
                        </form>
                    </div>
                    <div class="col-lg-6">

                    </div>
                </div>
            </div>
    </div>
    </section>

    <script>
        // Toggle password visibility
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');

        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    </script>
    <script>
        // Check if there's a status message in the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');
        const type = urlParams.get('type'); // 'error' or 'success'

        if (message) {
            Swal.fire({
                toast: true,
                position: 'top-end', // Display in the top right corner
                icon: type ? type : 'error', // 'error' by default
                title: message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: false,
                customClass: {
                    popup: 'small-alert' // Optional: Add custom styling if needed
                }
            });
        }
    </script>

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