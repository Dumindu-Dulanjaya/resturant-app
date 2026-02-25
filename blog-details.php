<?php
session_start(); // Start the session
$isLoggedIn = isset($_SESSION['restaurant_id']); // Check if restaurant is logged in
$restaurantLogo = $isLoggedIn ? $_SESSION['restaurant_logo'] : null; // Fetch restaurant logo if logged in

// Get the blog ID from the URL
$blogId = isset($_GET['id']) ? intval($_GET['id']) : 1;

// Load the JSON data
$blogsJson = file_get_contents('blogs.json');
$blogsData = json_decode($blogsJson, true);

// Find the requested blog
$blog = null;
foreach ($blogsData['blogs'] as $b) {
    if ($b['id'] == $blogId) {
        $blog = $b;
        break;
    }
}

// If blog not found, redirect or show error
if (!$blog) {
    header("Location: blog.php"); // Redirect to blog listing
    exit();
}

// Get other blogs for sidebar (excluding current one)
$otherBlogs = array_filter($blogsData['blogs'], function($b) use ($blogId) {
    return $b['id'] != $blogId;
});


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
    <title> <?php echo htmlspecialchars($blog['title']); ?> | Anawuma </title>
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
                                        <li><a href="about.php">About</a></li>
                                        <li class="current"><a href="blog.php">Blogs</a></li>
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
<!--====== Page Banner Start ======-->
        <section class="page-banner bg-blue rel z-1" style="background-image: url(assets/images/background/banner-bg.png);">
            <div class="container">
                <div class="banner-inner">
                    <h1 class="page-title wow fadeInUp delay-0-2s"><?php echo htmlspecialchars($blog['title']); ?></h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb wow fadeInUp delay-0-4s">
                            <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                            <li class="breadcrumb-item active">Blog Details</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <img class="dots-shape" src="assets/images/shapes/white-dots-two.png" alt="Shape">
            <img class="tringle-shape slideLeftRight" src="assets/images/shapes/white-tringle.png" alt="Shape">
            <img class="close-shape" src="assets/images/shapes/white-close.png" alt="Shape">
            <!-- <img src="assets/images/newsletter/circle.png" alt="shape" class="banner-circle slideUpRight"> -->
            <img class="dots-shape-three slideUpDown delay-1-5s" src="assets/images/shapes/white-dots-three.png" alt="Shape">
        </section>
        <!--====== Page Banner End ======-->


                <!--====== Blog Details Start ======-->
        <section class="blog-details-area pt-130 pb-160 rpt-100 rpb-90">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="blog-details-content rmb-75">
                    <div class="blog-standard-item">
                        <img src="assets/images/blog/<?php echo htmlspecialchars($blog['image']); ?>" alt="Blog">
                        <ul class="blog-meta">
                            <li><i class="far fa-calendar-alt"></i> <a href="#"><?php echo htmlspecialchars($blog['date']); ?></a></li>
                           
                        </ul>
                        <h2><?php echo htmlspecialchars($blog['title']); ?></h2>
                        
                        <?php foreach ($blog['content'] as $content): ?>
                            <?php if ($content['type'] == 'paragraph'): ?>
                                <p><?php echo $content['text']; ?></p>
                            <?php elseif ($content['type'] == 'heading'): ?>
                                <h3><?php echo htmlspecialchars($content['text']); ?></h3>
                            <?php elseif ($content['type'] == 'list'): ?>
                                <ul>
                                    <?php foreach ($content['items'] as $item): ?>
                                        <li><?php echo $item; ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        <?php endforeach; ?>
                        
                        <div class="blog-footer d-flex flex-wrap align-items-center pt-25">
                            <div class="tags mb-10 mr-auto">
                                <b>Tags </b> 
                                <?php foreach ($blog['tags'] as $tag): ?>
                                    <a href="blog.php?tag=<?php echo urlencode($tag); ?>"><?php echo htmlspecialchars($tag); ?></a>
                                <?php endforeach; ?>
                            </div>
                            <div class="social mb-10">
                                <b>Social: </b>
                                <a href="http://facebook.com"><i class="fab fa-facebook-f"></i></a>
                                <a href="https://www.linkedin.com/company/anawuma-hotel-management/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
                                <a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="comments mr-xl-4">
                       <!-- <h3 class="comment-title pt-30 mb-40">Peopel Comments</h3> -->
                        <div class="comment-item wow fadeInUp delay-0-2s">
                            <!-- <div class="author-image">
                                <img src="assets/images/blog/comment-author-1.jpg" alt="Author">
                            </div> -->
                            <div class="comment-details">
                                <!-- <div class="name-date">
                                    <h4>John F. Medina</h4>
                                    <span class="date">25 Feb 2022</span>
                                </div>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae abillo inventore veritatis</p>
                                <a href="blog-details.php" class="reply">Reply <i class="fas fa-long-arrow-alt-right"></i></a> -->
                            </div>
                        </div>
                        <div class="comment-item child-comment wow fadeInUp delay-0-4s">
                            <!-- <div class="author-image">
                                <img src="assets/images/blog/comment-author-2.jpg" alt="Author">
                            </div>
                            <div class="comment-details">
                                <div class="name-date">
                                    <h4>Grace L. Freeman</h4>
                                    <span class="date">25 Feb 2022</span>
                                </div>
                                <p>Perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremq totam rem aperiam, eaque ipsa quae abillo inventore veritatis</p>
                                <a href="blog-details.php" class="reply">Reply <i class="fas fa-long-arrow-alt-right"></i></a>
                            </div> -->
                        </div>
                        <div class="comment-item wow fadeInUp delay-0-6s">
                            <!-- <div class="author-image">
                                <img src="assets/images/blog/comment-author-3.jpg" alt="Author">
                            </div>
                            <div class="comment-details">
                                <div class="name-date">
                                    <h4>Alexzeder Alex</h4>
                                    <span class="date">25 Feb 2022</span>
                                </div>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae abillo inventore veritatis</p>
                                <a href="blog-details.php" class="reply">Reply <i class="fas fa-long-arrow-alt-right"></i></a>
                            </div> -->
                        </div>
                    </div>
                    <!-- <form id="contact-page-form" class="contact-form-three pt-20 wow fadeInUp delay-0-2s" action="#" method="post">
                        <h3 class="comment-title mb-40">Leave a Reply</h3>
                        <div class="row clearfix">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="text" id="name" name="name" class="form-control" placeholder="full name" required="">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="email" id="email" name="email" class="form-control" placeholder="Email Address" required="">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="text" id="phone" name="phone" class="form-control" placeholder="phone">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="url" id="website" name="website" class="form-control" placeholder="website">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea name="message" id="message" rows="5" class="form-control" placeholder="write message" required=""></textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group mb-0">
                                    <button class="theme-btn" type="submit">send message <i class="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </form> -->
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
                            <?php foreach (array_slice($otherBlogs, 0, 3) as $otherBlog): ?>
                            <div class="news-widget-item">
                                <img src="assets/images/blog/<?php echo htmlspecialchars($otherBlog['image']); ?>" 
                                    alt="News"
                                    class="rounded-image"
                                    style="width: 80px; height: 80px; object-fit: cover;">
                                <div class="content">
                                    <h5>
                                        <a href="blog-details.php?id=<?php echo $otherBlog['id']; ?>">
                                            <?php 
                                            // Limit title to 60 characters and add ellipsis if longer
                                            $title = htmlspecialchars($otherBlog['title']);
                                            echo strlen($title) > 60 ? substr($title, 0, 60) . '...' : $title;
                                            ?>
                                        </a>
                                    </h5>
                                    <span class="date">
                                        <i class="far fa-calendar-alt"></i> 
                                        <a href="#"><?php echo htmlspecialchars($otherBlog['date']); ?></a>
                                    </span>
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
<!--====== Blog Details End ======-->
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