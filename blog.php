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
    <title>Anawuma | Blog</title>
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

                                        <li><a href="./about.php">About</a></li>
                                        <li class="current"><a href="./blog.php">Blogs</a></li>
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
       <section class="about-page-section rel z-1 pt-160 rpt-100 pb-50 rpb-100">
    <div class="container">
        <div class="row align-items-center">

            <!-- IMAGE COLUMN -->
            <div class="col-lg-6 mb-4 mb-lg-0">
                <div class="about-page-images wow fadeInLeft delay-0-2s text-center">
                    <img 
                        src="assets/images/blog/blog.png"
                        alt="Blog"
                        style="
                            width: 90%;
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
                        <span 
                            style="
                                font-size: 14px;
                                letter-spacing: 2px;
                                color: #198754;
                                font-weight: 600;
                            "
                        >
                            OUR BLOG
                        </span>

                        <h2 
                            style="
                                font-size: 42px;
                                font-weight: 700;
                                margin: 15px 0 25px;
                                color: #000;
                            "
                        >
                            Latest Articles & Insights
                        </h2>
                    </div>

                    <p style="font-size: 16px; line-height: 1.8; color: #555; margin-bottom: 25px;">
                        Explore the latest trends, tips, and insights in restaurant and hotel technology. Our blog helps you stay ahead with smart ideas, digital solutions, and industry best practices.
                    </p>

                    <p style="font-size: 16px; line-height: 1.8; color: #555; margin-bottom: 35px;">
                        From QR ordering to smart restaurant management, discover how Anawuma is shaping the future of hospitality.
                    </p>

                    <a 
                        href="blog.php"
                        style="
                            background-color: #198754;
                            padding: 13px 34px;
                            border-radius: 6px;
                            color: #fff;
                            font-weight: 600;
                            letter-spacing: 0.5px;
                            transition: all 0.3s ease;
                            text-decoration: none;
                        "
                        onmouseover="this.style.backgroundColor='#198754'; this.style.transform='translateY(-2px)'"
                        onmouseout="this.style.backgroundColor='#198754'; this.style.transform='translateY(0)'"
                    >
                        READ BLOGS
                    </a>

                </div>
            </div>

        </div>
    </div>
</section>

        <!--====== Page Banner End ======-->


      <!--====== Blog Standard Start ======-->
<section class="blog-standard-area pt-90 pb-160 rpt-50 rpb-90">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="blog-standard-wrap rmb-75">
                    <?php
                    // Load blogs from JSON file
                    $blogsJson = file_get_contents('blogs.json');
                    $blogsData = json_decode($blogsJson, true);
                    $delay = 0.2;
                    
                    foreach ($blogsData['blogs'] as $blog):
                        // Get first paragraph for excerpt
                        $excerpt = '';
                        foreach ($blog['content'] as $content) {
                            if ($content['type'] == 'paragraph') {
                                $excerpt = strip_tags($content['text']);
                                break;
                            }
                        }
                        // Limit excerpt to 150 characters
                        $excerpt = strlen($excerpt) > 150 ? substr($excerpt, 0, 150) . '...' : $excerpt;
                    ?>
                    <div class="blog-standard-item wow fadeInUp delay-<?php echo $delay; ?>s">
                        <img src="assets/images/blog/<?php echo htmlspecialchars($blog['image']); ?>" alt="<?php echo htmlspecialchars($blog['title']); ?>">
                        <ul class="blog-meta">
                            <li><i class="far fa-calendar-alt"></i> <a href="blog-details.php?id=<?php echo $blog['id']; ?>"><?php echo htmlspecialchars($blog['date']); ?></a></li>
                            
                        </ul>
                        <h2><a href="blog-details.php?id=<?php echo $blog['id']; ?>"><?php echo htmlspecialchars($blog['title']); ?></a></h2>
                        <p><?php echo htmlspecialchars($excerpt); ?></p>
                        <a href="blog-details.php?id=<?php echo $blog['id']; ?>" class="theme-btn">read more <i class="fas fa-arrow-right"></i></a>
                    </div>
                    <?php 
                        $delay += 0.2;
                    endforeach; 
                    ?>
                </div>
            </div>
            <div class="col-lg-4 col-md-8">
                <div class="blog-sidebar">
                    <div class="widget search-widget wow fadeInUp delay-0-2s">
                       <h3 class="widget-title">Search</h3>
                        <form action="#">
                            <input type="search" placeholder="Keywords" required>
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                    </div>
                    <div class="widget category-widget wow fadeInUp delay-0-4s">
                       <h3 class="widget-title">Category</h3>
                        <ul>
                            <li><a href="blog.php">Restaurant Management</a> <span>(2)</span></li>
                            <li><a href="blog.php">Hospitality</a> <span>(5)</span></li>
                            <li><a href="blog.php">Business Efficiency</a> <span>(5)</span></li>
                            <li><a href="blog.php">Customer Service</a> <span>(3)</span></li>
                            <li><a href="blog.php">Operations</a> <span>(7)</span></li>
                        </ul>
                    </div>
                    <div class="widget news-widget wow fadeInUp delay-0-2s">
                       <h3 class="widget-title">Recent News</h3>
                        <div class="news-widget-wrap">
                            <?php 
                            // Show 3 most recent blogs in sidebar
                            foreach (array_slice($blogsData['blogs'], 0, 3) as $recentBlog): 
                                $recentTitle = strlen($recentBlog['title']) > 50 
                                    ? substr($recentBlog['title'], 0, 50) . '...' 
                                    : $recentBlog['title'];
                            ?>
                            <div class="news-widget-item">
                                <img src="assets/images/blog/<?php echo htmlspecialchars($recentBlog['image']); ?>" 
                                    alt="News"
                                    class="rounded-image"
                                    style="width: 80px; height: 80px; object-fit: cover;">
                                <div class="content">
                                    <h5><a href="blog-details.php?id=<?php echo $recentBlog['id']; ?>"><?php echo htmlspecialchars($recentTitle); ?></a></h5>
                                    <span class="date"><i class="far fa-calendar-alt"></i> <a href="blog-details.php?id=<?php echo $recentBlog['id']; ?>"><?php echo htmlspecialchars($recentBlog['date']); ?></a></span>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="widget call-action-widget wow fadeInUp delay-0-2s">
                        <h3>Need Any</h3>
                        <span class="h2">Consultation</span>
                        <div class="action-btn"><a href="contact.php" class="theme-btn">contact us <i class="fas fa-arrow-right"></i></a></div>
                        <a class="number" href="callto:+01234567899">+0123 (456) 7899</a>
                        <img class="action-man" src="assets/images/widgets/call-to-action.png" alt="Call To Action">
                        <img class="dots-shape slideUpDown" src="assets/images/shapes/white-dots-two.png" alt="Shape">
                        <img class="circle-shape slideUpRight" src="assets/images/shapes/circle.png" alt="Shape">
                    </div>
                    <div class="widget tag-widget wow fadeInUp delay-0-2s">
                       <h3 class="widget-title">Popular Tags</h3>
                        <div class="tag-clouds">
                            <a href="blog.php">Restaurant</a>
                            <a href="blog.php">Management</a>
                            <a href="blog.php">Efficiency</a>
                            <a href="blog.php">Turnover</a>
                            <a href="blog.php">Hospitality</a>
                            <a href="blog.php">Service</a>
                            <a href="blog.php">Operations</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!--====== Blog Standard End ======-->
       
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