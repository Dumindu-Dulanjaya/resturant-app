<!DOCTYPE html>
<html lang="zxx">

<head>
    <!--====== Required meta tags ======-->
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <!--====== Title ======-->
    <title>Anawuma | Register</title>
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
    <!--====== Jquery ======-->
    <script src="assets/js/jquery-3.6.0.min.js"></script>
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
                            <a href="./login.php" class="theme-btn style-two">Restaurant Login <i
                                    class="fas fa-lock"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Header Upper-->
        </header>
        <!--====== Header Part End ======-->

        <!--====== Register Form ======-->
        <section class="contact-section-two rel z-1 pt-115 rpt-105 pb-130 rpb-55">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-xl-6 col-lg-8 col-md-10">
                        <div class="section-title mb-50">
                            <span class="sub-title">Get Started</span>
                            <h2>Register Your Hotel / Restaurant Now!</h2>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <form id="registration-form" class="contact-form-two py-45 wow fadeInRight delay-0-2s"
                            action="process_registration.php" method="post" enctype="multipart/form-data"
                            onsubmit="return validateForm()">
                            <div class="row clearfix">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="restaurant_nam">Hotel or Restaurant Name</label>
                                        <input type="text" id="restaurant_name" name="restaurant_name"
                                            class="form-control" required />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="address">Address</label>
                                        <input type="text" id="address" name="address" class="form-control" required />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="contact_number">Contact Number</label>
                                        <input type="text" id="contact_number" name="contact_number"
                                            class="form-control" pattern="[0-9]{10}"
                                            title="Enter a valid 10-digit number" required />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="email">Email (Hotel contact Email)</label>
                                        <input type="email" id="email" name="email" class="form-control" required />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group position-relative">
                                        <label for="password">Password</label>
                                        <input type="password" id="password" name="password" class="form-control"
                                            required />
                                        <span class="fa fa-eye position-absolute" id="togglePassword"
                                            style="top: 50%; right: 10px; cursor: pointer"></span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group position-relative">
                                        <label for="confirm_password">Confirm Password</label>
                                        <input type="password" id="confirm_password" name="confirm_password"
                                            class="form-control" required />
                                        <span class="fa fa-eye position-absolute" id="toggleConfirmPassword"
                                            style="top: 50%; right: 10px; cursor: pointer"></span>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="opening_time">Opening Time</label>
                                        <input type="time" id="opening_time" name="opening_time" class="form-control"
                                            required />
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="closing_time">Closing Time</label>
                                        <input type="time" id="closing_time" name="closing_time" class="form-control"
                                            required />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-4">
                                        <label for="logo">Upload Logo <br> (Upload a <a href="http://remove.bg"
                                                target="_blank">Background Removed </a> logo image less than
                                            1MB)</label>
                                        <input type="file" id="logo" name="logo" class="form-control" accept="image/*"
                                            required />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="theme-btn">Register</button>
                            <p class="text-left mt-4">Already have an account? <a href="login.php"
                                    class="text-primary">Login here</a></p>
                        </form>
                    </div>
                    <div class="col-lg-6">
                        <div class="py-45 wow fadeInLeft delay-0-2s">
                            <img src="./assets/images/features/Business people writing agreement, shaking hands.jpg"
                                alt="" srcset="">
                        </div>
                    </div>
                </div>
        </section>

        <!--====== Contact Section End ======-->

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
                                <a href="index.php"><img src="assets/images/logos/logo-rmbg-2.png" alt="Logo" /></a>
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
                                <li><a href="about.php">Company</a></li>
                                <li><a href="contact.php">Contact</a></li>

                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4">
                        <div class="footer-widget link-widget">
                            <h4 class="footer-title">Quick Links</h4>
                            <ul class="list-style-two two-column">
                                <li><a href="pricing.php">Pricing</a></li>
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

    <!-- jQuery code to preselect the package -->
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
    <!-- JavaScript to handle package price calculation -->
    <!--====== SweetAlert 2 ======-->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        // Password toggle logic
        document.querySelectorAll('.fa-eye').forEach(icon => {
            icon.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
        });

        // Real-time password matching
        const passwordInput = document.getElementById("password");
        const confirmInput = document.getElementById("confirm_password");
        
        function validatePasswordMatch() {
            if (confirmInput.value && passwordInput.value !== confirmInput.value) {
                confirmInput.setCustomValidity("Passwords do not match");
                confirmInput.classList.add('is-invalid');
            } else {
                confirmInput.setCustomValidity("");
                confirmInput.classList.remove('is-invalid');
            }
        }
        
        passwordInput.addEventListener('input', validatePasswordMatch);
        confirmInput.addEventListener('input', validatePasswordMatch);

        // Form Validation
        function validateForm() {
            // Check HTML5 validation first
            const form = document.getElementById('registration-form');
            if (form.checkValidity() === false) {
                form.classList.add('was-validated');
                return false;
            }

            // Custom JS Checks
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            const logo = document.getElementById('logo').files[0];

            // 1. Password Match
            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch',
                    text: 'The passwords you entered do not match!',
                    confirmButtonColor: '#d33'
                });
                return false;
            }

            // 2. Password Length (e.g., min 6 chars)
            if (password.length < 6) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Weak Password',
                    text: 'Password must be at least 6 characters long.',
                    confirmButtonColor: '#f0ad4e'
                });
                return false;
            }

            // 3. Logo File Size (Max 1MB)
            if (logo && logo.size > 1024 * 1024) { // 1MB in bytes
                Swal.fire({
                    icon: 'error',
                    title: 'File Too Large',
                    text: 'The uploaded logo must be less than 1MB.',
                    confirmButtonColor: '#d33'
                });
                return false;
            }

            // If all checks pass
            return true;
        }
    </script>


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