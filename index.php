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
    <meta name="google-site-verification" content="C1rLEHydZ4HY-4hloiKNGTcntBLEkr93ubKeAZvyqZE" />
    
    <!--====== AI Search Engine Optimization Meta Tags ======-->
    <meta name="keywords" content="restaurant management software, QR code menu, digital ordering system, food service technology, restaurant POS, online ordering, contactless dining, restaurant automation, menu management, order tracking, restaurant analytics, food delivery software, restaurant digital transformation, QR ordering system, restaurant technology solutions" />
    <meta name="author" content="Anawuma" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    <meta name="distribution" content="global" />
    <meta name="rating" content="general" />
    <meta name="subject" content="Restaurant Management Software" />
    <meta name="classification" content="Business Software" />
    <meta name="coverage" content="Worldwide" />
    <meta name="target" content="all" />
    <meta name="HandheldFriendly" content="true" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="theme-color" content="#007bff" />
    <meta name="msapplication-TileColor" content="#007bff" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Anawuma" />
    <meta name="application-name" content="Anawuma Restaurant Management" />
    <meta name="msapplication-TileImage" content="assets/images/favicon.png" />
    <meta name="msapplication-config" content="none" />
    <meta name="msvalidate.01" content="796118B0E9EF79FC8AD37D811380719C" />
    
    <!--====== Search Engine Verification Tags ======-->
    <!-- Yandex Webmaster -->
    <meta name="yandex-verification" content="b42c0ab22134a5eb" />
    
    <!-- Baidu Site Verification -->
    <meta name="baidu-site-verification" content="YOUR_BAIDU_VERIFICATION_CODE" />
    
    <!-- Naver Webmaster Tools -->
    <meta name="naver-site-verification" content="YOUR_NAVER_VERIFICATION_CODE" />
    
    <!-- Seznam.cz Webmaster -->
    <meta name="seznam-wmt" content="RdDD4J8yw5ppFjAASU4I8xGdb09H6xkc" />
    
    <!-- Qwant Webmaster -->
    <meta name="qwant-site-verification" content="YOUR_QWANT_VERIFICATION_CODE" />
    
    <!-- Ecosia Site Verification -->
    <meta name="ecosia-site-verification" content="YOUR_ECOSIA_VERIFICATION_CODE" />
    
    <!--====== AI Search Engine Verification Tags ======-->
    <!-- Perplexity AI -->
    <meta name="perplexity-verification" content="YOUR_PERPLEXITY_VERIFICATION_CODE" />
    
    <!-- You.com AI Search -->
    <meta name="you-verification" content="YOUR_YOU_VERIFICATION_CODE" />
    
    <!-- Phind AI Search -->
    <meta name="phind-verification" content="YOUR_PHIND_VERIFICATION_CODE" />
    
    <!-- Andi AI Search -->
    <meta name="andi-verification" content="YOUR_ANDI_VERIFICATION_CODE" />
    
    <!-- Metaphor AI -->
    <meta name="metaphor-verification" content="YOUR_METAPHOR_VERIFICATION_CODE" />
    
    <!-- Arc Search (Browser AI) -->
    <meta name="arc-verification" content="YOUR_ARC_VERIFICATION_CODE" />
    
    <!-- Majestic SEO -->
    <meta name="majestic-site-verification" content="YOUR_MAJESTIC_VERIFICATION_CODE" />
    
    <!-- Alexa Site Verification -->
    <meta name="alexaVerifyID" content="YOUR_ALEXA_VERIFICATION_CODE" />
    
    <!-- Pinterest Site Verification -->
    <meta name="p:domain_verify" content="YOUR_PINTEREST_VERIFICATION_CODE" />
    
    <!-- Facebook Domain Verification -->
    <meta name="facebook-domain-verification" content="YOUR_FACEBOOK_VERIFICATION_CODE" />

    <!--====== Google Analytics ======-->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    </script>

    <!--====== Title ======-->
    <title>Anawuma | QR baesd Order Management Software</title>
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

    <!--====== Structured Data for AI Search Engines ======-->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Anawuma",
        "description": "QR-based Order Management Software for restaurants and food service businesses",
        "url": "https://www.anawuma.com",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "provider": {
            "@type": "Organization",
            "name": "Anawuma",
            "url": "https://www.anawuma.com"
        },
        "featureList": [
            "QR Code Menu System",
            "Digital Ordering",
            "Restaurant Management",
            "Payment Processing",
            "Real-time Analytics",
            "Customer Management"
        ],
        "screenshot": "https://www.anawuma.com/assets/images/logos/logo-rmbg-2.png",
        "softwareVersion": "1.0",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
        }
    }
    </script>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Anawuma",
        "url": "https://www.anawuma.com",
        "logo": "https://www.anawuma.com/assets/images/logos/logo-rmbg-2.png",
        "description": "Leading provider of QR-based order management software for restaurants",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "url": "https://www.anawuma.com/contact"
        },
        "sameAs": [
            "https://www.facebook.com/anawuma",
            "https://twitter.com/anawuma",
            "https://linkedin.com/company/anawuma"
        ]
    }
    </script>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Anawuma",
        "url": "https://www.anawuma.com",
        "description": "QR-based Order Management Software for restaurants",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.anawuma.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>

    <style>
        @keyframes roam {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(100px, -50px) rotate(90deg); }
            50% { transform: translate(-50px, 100px) rotate(180deg); }
            75% { transform: translate(150px, 50px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
        .spoon-roam {
            width: 50px !important;
            height: auto;
            animation: roam 15s infinite ease-in-out;
            opacity: 0.9;
        }
        .spoon-roam:nth-child(1) { animation-duration: 12s; animation-delay: 0s; }
        .spoon-roam:nth-child(2) { animation-duration: 18s; animation-delay: 2s; }
        .spoon-roam:nth-child(3) { animation-duration: 14s; animation-delay: 4s; }
        .spoon-roam:nth-child(4) { animation-duration: 16s; animation-delay: 1s; }
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
                            <div width="20%" class="logo"><a href="./index.php"><img width="200"
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
                                        <li class="current"><a href="./index.php ">Home</a></li>

                                        <li><a href="#features-section">Features</a></li>
                                        <li><a href="./pricing.php">Pricing</a></li>

                                        <li><a href="./about.php">About</a></li>
                                        <li><a href="./blog.php">Blogs</a></li>
                                        <li><a href="./contact.php ">contact</a></li>


                                        <li class="dropdown">
                                            <a href="#" class="dropbtn">More</a>
                                            <ul class="dropdown-menu">
                                                <li><a href="./menus/admin/login.php">Restaurant Admin</a></li>
                                                <li><a href="./menus/admin/login.php">Super Admin</a></li>
                                                <li><a href="./menus/admin/login.php">Admin</a></li>
                                                <li><a href="./menus/admin/login.php">Steward Login</a></li>
                                                <li><a href="./menus/admin/login.php">HouseKeeper Login</a></li>
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


        <!--====== Hero Section Start ======-->
        <style>
            .hero-section {
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0fdf4 50%, #fef3c7 75%, #fef2f2 100%);
                position: relative;
                overflow: hidden;
                padding: 120px 0 180px;
            }
            
            /* Elegant decorative pattern overlay */
            .hero-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
                    repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255, 215, 0, 0.02) 60px, rgba(255, 215, 0, 0.02) 120px);
                animation: patternMove 40s linear infinite;
            }
            
            @keyframes patternMove {
                0% { transform: translateX(0) translateY(0); }
                100% { transform: translateX(100px) translateY(100px); }
            }
            
            /* Floating decorative orbs */
            .hero-section::after {
                content: '';
                position: absolute;
                top: 10%;
                left: 5%;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                animation: floatOrb 15s ease-in-out infinite;
                filter: blur(60px);
            }
            
            @keyframes floatOrb {
                0%, 100% { transform: translate(0, 0) scale(1); }
                33% { transform: translate(100px, -50px) scale(1.2); }
                66% { transform: translate(-50px, 80px) scale(0.9); }
            }
            
            /* Decorative icon */
            .hero-floating-icon {
                position: absolute;
                font-size: 60px;
                opacity: 0.08;
                animation: floatSlow 20s ease-in-out infinite;
                z-index: 1;
                color: #FFD700;
            }
            
            .hero-floating-icon:nth-child(1) {
                top: 15%;
                left: 10%;
                animation-delay: 0s;
            }
            
            .hero-floating-icon:nth-child(2) {
                top: 60%;
                left: 5%;
                animation-delay: 3s;
                font-size: 50px;
            }
            
            .hero-floating-icon:nth-child(3) {
                top: 30%;
                right: 8%;
                animation-delay: 6s;
                font-size: 70px;
            }
            
            .hero-floating-icon:nth-child(4) {
                bottom: 20%;
                right: 15%;
                animation-delay: 9s;
                font-size: 55px;
            }
            
            @keyframes floatSlow {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-30px) rotate(10deg); }
            }
            
            .hero-content {
                position: relative;
                z-index: 5;
            }
            
            /* Premium badge with gold accent */
            .hero-subtitle-badge {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
                padding: 12px 24px;
                border-radius: 50px;
                font-size: 14px;
                font-weight: 700;
                color: #2e7d32;
                border: 2px solid rgba(67, 160, 71, 0.3);
                box-shadow: 0 4px 15px rgba(67, 160, 71, 0.2);
                backdrop-filter: blur(10px);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                margin-bottom: 25px;
            }
            
            .hero-subtitle-badge:hover {
                transform: translateY(-2px) scale(1.03);
                box-shadow: 0 6px 20px rgba(67, 160, 71, 0.3);
                border-color: rgba(67, 160, 71, 0.5);
            }
            
            .hero-subtitle-badge::before {
                content: '✨';
                font-size: 18px;
                animation: sparkle 2s ease-in-out infinite;
            }
            
            @keyframes sparkle {
                0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
                50% { opacity: 0.6; transform: scale(1.2) rotate(180deg); }
            }
            
            /* Elegant title with gold gradient */
            .hero-main-title {
                font-size: clamp(28px, 4.5vw, 52px);
                font-weight: 800;
                line-height: 1.2;
                margin-bottom: 25px;
                font-family: 'Georgia', 'Times New Roman', serif;
                letter-spacing: -1px;
                text-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
            }
            
            .hero-main-title .brand-name {
                background: linear-gradient(135deg, #15f371 0%, #044810 50%, #02310b 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                display: block;
                animation: goldShimmer 4s ease infinite;
                background-size: 200% auto;
                filter: drop-shadow(0 2px 8px rgba(0, 255, 47, 0.4));
                position: relative;
            }
            
            .hero-main-title .brand-name::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 120px;
                height: 4px;
                background: linear-gradient(90deg, #FFD700, transparent);
                border-radius: 2px;
            }
            
            @keyframes goldShimmer {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .hero-main-title .highlight-text {
                color: #1a1a1a;
                position: relative;
                display: inline-block;
                font-weight: 700;
            }
            
            .hero-main-title .highlight-text::after {
                content: '';
                position: absolute;
                bottom: 8px;
                left: 0;
                width: 100%;
                height: 12px;
                background: linear-gradient(90deg, rgba(67, 160, 71, 0.3), rgba(67, 160, 71, 0.1));
                z-index: -1;
                transform: skewX(-10deg);
                border-radius: 3px;
            }
            
            .hero-description {
                font-size: 18px;
                font-weight: 500;
                line-height: 1.8;
                color: #555;
                font-family: 'Trebuchet MS', 'Lucida Grande', sans-serif;
                margin-bottom: 35px;
                max-width: 95%;
                letter-spacing: 0.3px;
            }
            
            .hero-btns {
                display: flex;
                gap: 18px;
                flex-wrap: wrap;
                margin-bottom: 45px;
            }
            
            /* Luxurious gold button */
            .hero-btn-primary {
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                color: #1a1a1a;
                padding: 16px 35px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 700;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 8px 25px rgba(255, 215, 0, 0.35);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border: none;
                position: relative;
                overflow: hidden;
            }
            
            .hero-btn-primary::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s ease, height 0.6s ease;
            }
            
            .hero-btn-primary:hover::before {
                width: 350px;
                height: 350px;
            }
            
            .hero-btn-primary:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 12px 35px rgba(255, 215, 0, 0.5);
                color: #1a1a1a;
            }
            
            .hero-btn-primary i {
                transition: transform 0.3s ease;
                font-size: 16px;
            }
            
            .hero-btn-primary:hover i {
                transform: translateX(6px);
            }
            
            /* Glass morphism button */
            .hero-btn-secondary {
                background: #ffffff;
                color: #43a047;
                padding: 16px 35px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 700;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                border: 2px solid #43a047;
                transition: all 0.4s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            
            .hero-btn-secondary:hover {
                background: #43a047;
                color: #ffffff;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(67, 160, 71, 0.3);
                border-color: #43a047;
            }
            
            /* Premium stats cards */
            .hero-stats {
                display: flex;
                gap: 18px;
                flex-wrap: wrap;
            }
            
            .hero-stat-card {
                background: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(10px);
                padding: 18px 25px;
                border-radius: 16px;
                border: 1px solid rgba(255, 215, 0, 0.3);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                transition: all 0.4s ease;
                text-align: center;
                min-width: 130px;
            }
            
            .hero-stat-card:hover {
                transform: translateY(-4px);
                border-color: rgba(255, 215, 0, 0.5);
                box-shadow: 0 10px 30px rgba(255, 215, 0, 0.25);
            }
            
            .hero-stat-number {
                font-size: 32px;
                font-weight: 800;
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                display: block;
                line-height: 1.2;
                margin-bottom: 8px;
            }
            
            .hero-stat-label {
                font-size: 12px;
                color: #666;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            /* Trust badge */
            .hero-trust-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 20px;
                color: #FFD700;
                font-size: 15px;
                font-weight: 600;
            }
            
            .hero-trust-badge i {
                font-size: 18px;
            }
            
            /* Enhanced image styling */
            .hero-image-wrapper {
                position: relative;
                z-index: 5;
                animation: floatImage 7s ease-in-out infinite;
                transform: scale(1.05);
                margin: 0;
            }
            
            /* Main glowing border frame */
            .hero-image-wrapper::before {
                content: '';
                position: absolute;
                top: -25px;
                left: -25px;
                right: -25px;
                bottom: -25px;
                background: linear-gradient(135deg, 
                    rgba(255, 215, 0, 0.4) 0%, 
                    rgba(255, 165, 0, 0.3) 25%,
                    rgba(67, 160, 71, 0.3) 50%,
                    rgba(255, 165, 0, 0.3) 75%,
                    rgba(255, 215, 0, 0.4) 100%);
                background-size: 400% 400%;
                border-radius: 35px;
                z-index: -1;
                animation: gradientRotate 8s ease infinite;
                filter: blur(8px);
                box-shadow: 0 0 60px rgba(255, 215, 0, 0.5);
            }
            
            /* Outer decorative ring */
            .hero-image-wrapper::after {
                content: '';
                position: absolute;
                top: -35px;
                left: -35px;
                right: -35px;
                bottom: -35px;
                border: 3px dashed rgba(255, 215, 0, 0.4);
                border-radius: 40px;
                z-index: -2;
                animation: rotateBorderSlow 30s linear infinite;
            }
            
            @keyframes gradientRotate {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes rotateBorderSlow {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes floatImage {
                0%, 100% { transform: translateY(0) scale(1.05); }
                50% { transform: translateY(-25px) scale(1.08); }
            }
            
            .hero-image-wrapper img {
                width: 100%;
                height: auto;
                filter: drop-shadow(0 30px 80px rgba(0, 0, 0, 0.3)) brightness(1.08) contrast(1.05);
                transition: all 0.5s ease;
                border-radius: 25px;
                border: 4px solid rgba(255, 255, 255, 0.8);
                box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3), 
                            inset 0 0 40px rgba(255, 215, 0, 0.1);
            }
            
            .hero-image-wrapper:hover img {
                transform: scale(1.05);
                filter: drop-shadow(0 35px 90px rgba(255, 215, 0, 0.4)) brightness(1.12) contrast(1.08);
                box-shadow: 0 25px 70px rgba(255, 215, 0, 0.5), 
                            inset 0 0 50px rgba(255, 215, 0, 0.15);
            }
            
            /* Decorative corner shapes */
            .hero-corner-shape {
                position: absolute;
                width: 80px;
                height: 80px;
                z-index: 10;
            }
            
            .hero-corner-shape.top-left {
                top: -40px;
                left: -40px;
                border-top: 4px solid #FFD700;
                border-left: 4px solid #FFD700;
                border-top-left-radius: 20px;
                animation: cornerPulse 3s ease-in-out infinite;
            }
            
            .hero-corner-shape.top-right {
                top: -40px;
                right: -40px;
                border-top: 4px solid #FFD700;
                border-right: 4px solid #FFD700;
                border-top-right-radius: 20px;
                animation: cornerPulse 3s ease-in-out infinite 0.5s;
            }
            
            .hero-corner-shape.bottom-left {
                bottom: -40px;
                left: -40px;
                border-bottom: 4px solid #FFD700;
                border-left: 4px solid #FFD700;
                border-bottom-left-radius: 20px;
                animation: cornerPulse 3s ease-in-out infinite 1s;
            }
            
            .hero-corner-shape.bottom-right {
                bottom: -40px;
                right: -40px;
                border-bottom: 4px solid #FFD700;
                border-right: 4px solid #FFD700;
                border-bottom-right-radius: 20px;
                animation: cornerPulse 3s ease-in-out infinite 1.5s;
            }
            
            @keyframes cornerPulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.1); }
            }
            
            /* Geometric decorative elements */
            .hero-geometric-shape {
                position: absolute;
                z-index: -1;
            }
            
            .hero-geometric-shape.circle {
                width: 150px;
                height: 150px;
                border: 3px solid rgba(255, 215, 0, 0.3);
                border-radius: 50%;
                top: -60px;
                right: -60px;
                animation: rotateShape 15s linear infinite;
            }
            
            .hero-geometric-shape.square {
                width: 100px;
                height: 100px;
                border: 3px solid rgba(67, 160, 71, 0.3);
                border-radius: 15px;
                bottom: -40px;
                left: -50px;
                animation: rotateShape 20s linear infinite reverse;
            }
            
            @keyframes rotateShape {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Sparkle effect */
            .hero-sparkle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: #FFD700;
                border-radius: 50%;
                animation: sparkleFloat 4s ease-in-out infinite;
                box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
            }
            
            @keyframes sparkleFloat {
                0%, 100% { transform: translateY(0) scale(0); opacity: 0; }
                50% { transform: translateY(-100px) scale(1); opacity: 1; }
            }
            
            @media (max-width: 991px) {
                .hero-section {
                    padding: 80px 0 120px;
                }
                .hero-description {
                    max-width: 100%;
                }
                .hero-btns {
                    justify-content: center;
                }
                .hero-stats {
                    justify-content: center;
                }
                .hero-floating-icon {
                    opacity: 0.04;
                }
                .hero-image-wrapper {
                    transform: scale(1.0);
                    margin: 30px 0;
                }
                .hero-image-wrapper img {
                    width: 100%;
                }
            }
        </style>
        
        <section class="hero-section rel z-2">
            <!-- Floating decorative icons -->
            <i class="fas fa-utensils hero-floating-icon"></i>
            <i class="fas fa-wine-glass hero-floating-icon"></i>
            <i class="fas fa-concierge-bell hero-floating-icon"></i>
            <i class="fas fa-cocktail hero-floating-icon"></i>
            
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-11">
                        <div class="hero-content rmb-75">
                            <div class="hero-subtitle-badge wow fadeInUp delay-0-2s">
                                QR-Powered Restaurant & Hotel Solution
                            </div>

                            <h1 class="hero-main-title wow fadeInUp delay-0-4s">
                                <span class="brand-name">Anawuma</span>
                                <span class="highlight-text">The All in One QR</span><br/>
                                Ordering & Hospitality<br/>
                                Management Platform
                            </h1>

                            <p class="hero-description wow fadeInUp delay-0-5s">
                                Transform guest experiences with lightning-fast QR code ordering, real-time menu updates, and intuitive operations — all in one system.
                            </p>
                            
                            <div class="hero-btns wow fadeInUp delay-0-7s">
                                <a href="./register_hotel.php" class="hero-btn-primary">
                                    Start Free Trial <i class="fas fa-arrow-right"></i>
                                </a>
                                <a href="./contact.php" class="hero-btn-secondary">
                                    Request a Demo <i class="fas fa-play"></i>
                                </a>
                            </div>
                            
                            <div class="hero-stats wow fadeInUp delay-0-9s">
                                <div class="hero-stat-card">
                                    <span class="hero-stat-number">500+</span>
                                    <span class="hero-stat-label">Restaurants</span>
                                </div>
                                <div class="hero-stat-card">
                                    <span class="hero-stat-number">1M+</span>
                                    <span class="hero-stat-label">Orders</span>
                                </div>
                                <div class="hero-stat-card">
                                    <span class="hero-stat-number">99.9%</span>
                                    <span class="hero-stat-label">Uptime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="hero-image-wrapper wow fadeInRight delay-0-6s">
                            <!-- Corner decorative shapes -->
                            <div class="hero-corner-shape top-left"></div>
                            <div class="hero-corner-shape top-right"></div>
                            <div class="hero-corner-shape bottom-left"></div>
                            <div class="hero-corner-shape bottom-right"></div>
                            
                            <!-- Geometric background shapes -->
                            <div class="hero-geometric-shape circle"></div>
                            <div class="hero-geometric-shape square"></div>
                            
                            <!-- Main Image -->
                            <img src="assets/images/hero/bg-image.png" alt="Anawuma QR Ordering System - Premium Restaurant Management">
                            
                            <!-- Enhanced sparkle effects -->
                            <div class="hero-sparkle" style="top: 8%; left: 12%; animation-delay: 0s;"></div>
                            <div class="hero-sparkle" style="top: 25%; right: 15%; animation-delay: 0.8s;"></div>
                            <div class="hero-sparkle" style="top: 45%; left: 8%; animation-delay: 1.6s;"></div>
                            <div class="hero-sparkle" style="bottom: 35%; right: 18%; animation-delay: 2.4s;"></div>
                            <div class="hero-sparkle" style="bottom: 15%; left: 20%; animation-delay: 3.2s;"></div>
                        </div>
                    </div>
                </div>
            </div>
                        
        </section>
        <!--====== Hero Section End ======-->


        <!--====== Partners Section Start ======-->
        <style>
            .partners-modern-section {
                background: linear-gradient(135deg, #f8fffe 0%, #f0fdf4 50%, #e8f5e9 100%);
                position: relative;
                overflow: hidden;
            }
            
            .partners-modern-section::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 600px;
                height: 600px;
                background: radial-gradient(circle, rgba(67, 160, 71, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                animation: pulseGentleOrb 12s ease-in-out infinite;
            }
            
            @keyframes pulseGentleOrb {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(-50px, 30px) scale(1.15); }
            }
            
            .features-icon-card {
                background: #ffffff;
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
                transition: all 0.4s ease;
                border: 2px solid transparent;
                position: relative;
                overflow: hidden;
            }
            
            .features-icon-card::before {
                content: '';
                position: absolute;
     
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, #43a047, #66bb6a, #43a047);
                background-size: 200% auto;
                animation: shimmerBar 3s linear infinite;
            }
            
            @keyframes shimmerBar {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
            }
            
            .features-icon-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 60px rgba(67, 160, 71, 0.2);
                border-color: rgba(67, 160, 71, 0.3);
            }
            
            .features-icon-card .icon-wrapper {
                width: 70px;
                height: 70px;
                background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
                border-radius: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                transition: all 0.3s ease;
            }
            
            .features-icon-card:hover .icon-wrapper {
                transform: rotate(5deg) scale(1.1);
                background: linear-gradient(135deg, #43a047 0%, #66bb6a 100%);
            }
            
            .features-icon-card .icon-wrapper i {
                font-size: 32px;
                color: #43a047;
                transition: color 0.3s ease;
            }
            
            .features-icon-card:hover .icon-wrapper i {
                color: #ffffff;
            }
            
            .features-icon-card h4 {
                font-size: 20px;
                font-weight: 700;
                color: #1a1a1a;
                margin-bottom: 12px;
                font-family: 'Georgia', 'Times New Roman', serif;
            }
            
            .features-icon-card p {
                font-size: 15px;
                color: #666;
                line-height: 1.7;
                margin: 0;
            }
            
            .trusted-brands-wrapper {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 25px 35px;
                display: inline-flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
                margin-top: 30px;
            }
            
            .trusted-brands-wrapper .trust-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 24px;
            }
            
            .trusted-brands-wrapper .trust-text {
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
            }
            
            .trusted-brands-wrapper .trust-number {
                font-size: 28px;
                font-weight: 800;
                background: linear-gradient(135deg, #43a047, #66bb6a);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        </style>
        
        <section class="partners-modern-section partners-section rel z-1 pt-250 rpt-150 pb-130 rpb-100">
            <div class="container">
                <div class="row align-items-center">
                    <!-- Left Content Column -->
                    <div class="col-xl-6 col-lg-6">
                        <div class="section-title mb-45 wow fadeInLeft delay-0-2s">
                            <h2 style="font-size: 48px; font-weight: 800; font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.3; letter-spacing: -0.5px; background: linear-gradient(135deg, #141514 0%, #43a047 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 25px;">Built for Modern Hospitality Businesses</h2>
                           
                            <p style="font-size: 20px; font-weight: 500; font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif; line-height: 1.7; color: #555; margin-bottom: 15px;">Anawuma is carefully designed to meet the real-world needs of restaurants, cafés, and hotels.</p>
                           
                            <p style="font-size: 20px; font-weight: 500; font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif; line-height: 1.7; color: #555; margin-bottom: 25px;">Developed with a strong focus on speed, usability, and operational efficiency.</p>
                            
                            <!-- Trust Badge -->
                            <div class="trusted-brands-wrapper wow fadeInUp delay-0-4s">
                                <div class="trust-icon">
                                    <i class="fas fa-award"></i>
                                </div>
                                <div>
                                    <div class="trust-text">Trusted by</div>
                                    <div class="trust-number">500+ Restaurants</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Features Grid -->
                    <div class="col-xl-6 col-lg-6">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-3s">
                                <div class="features-icon-card">
                                    <div class="icon-wrapper">
                                        <i class="fas fa-rocket"></i>
                                    </div>
                                    <h4>Lightning Fast</h4>
                                    <p>Orders processed in seconds, table turnover increased by 30%</p>
                                </div>
                            </div>
                            
                            <div class="col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-4s">
                                <div class="features-icon-card">
                                    <div class="icon-wrapper">
                                        <i class="fas fa-mobile-alt"></i>
                                    </div>
                                    <h4>No App Required</h4>
                                    <p>Simple QR scan, instant ordering - zero downloads needed</p>
                                </div>
                            </div>
                            
                            <div class="col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-5s">
                                <div class="features-icon-card">
                                    <div class="icon-wrapper">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <h4>Smart Analytics</h4>
                                    <p>Real-time insights to optimize menu and maximize revenue</p>
                                </div>
                            </div>
                            
                            <div class="col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-6s">
                                <div class="features-icon-card">
                                    <div class="icon-wrapper">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <h4>Secure & Reliable</h4>
                                    <p>99.9% uptime with enterprise-grade security standards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--====== Partners Section End ======-->


        <!--====== Solutions Section Start ======-->
        <style>
            .solution-item {
                position: relative;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                animation: floatCard 6s ease-in-out infinite;
                border-radius: 20px;
                overflow: hidden;
            }
            
            .solution-item:nth-child(1) {
                animation-delay: 0s;
            }
            
            .solution-item:nth-child(2) {
                animation-delay: 1.5s;
            }
            
            .solution-item:nth-child(3) {
                animation-delay: 3s;
            }
            
            .solution-item:nth-child(4) {
                animation-delay: 4.5s;
            }
            
            @keyframes floatCard {
                0%, 100% {
                    transform: translateY(0) scale(1);
                }
                50% {
                    transform: translateY(-15px) scale(1.02);
                }
            }
            
            .solution-item::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, 
                    #81c784, #66bb6a, #4caf50, #43a047, 
                    #388e3c, #43a047, #4caf50, #66bb6a, #81c784);
                background-size: 400% 400%;
                border-radius: 20px;
                opacity: 0;
                z-index: -1;
                transition: opacity 0.5s ease;
                animation: gradientMove 8s ease infinite;
            }
            
            @keyframes gradientMove {
                0%, 100% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
            }
            
            .solution-item:hover::before {
                opacity: 1;
            }
            
            .solution-item:hover {
                transform: translateY(-20px) scale(1.05) !important;
                box-shadow: 0 25px 60px rgba(67, 160, 71, 0.4);
                animation-play-state: paused;
            }
            
            .solution-item::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s ease, height 0.6s ease;
            }
            
            .solution-item:hover::after {
                width: 500px;
                height: 500px;
            }
            
            .solution-content {
                position: relative;
                z-index: 1;
                transition: transform 0.4s ease;
            }
            
            .solution-item:hover .solution-content {
                transform: scale(1.03);
            }
            
            .solution-content img {
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));
            }
            
            .solution-item:hover .solution-content img {
                transform: rotate(10deg) scale(1.15);
                filter: drop-shadow(0 15px 30px rgba(67, 160, 71, 0.4));
            }
            
            .solution-content h3 {
                transition: all 0.3s ease;
            }
            
            .solution-item:hover .solution-content h3 {
                color: #1b5e20;
                transform: translateX(5px);
            }
            
            .solution-content p {
                transition: all 0.3s ease;
            }
            
            .solution-item:hover .solution-content p {
                color: #2e7d32;
            }
            
            /* Pulse effect for icons */
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            .solution-content img {
                animation: pulse 3s ease-in-out infinite;
            }
            
            .solution-item:hover .solution-content img {
                animation: none;
            }
            
            /* Shimmer effect */
            @keyframes shimmer {
                0% {
                    background-position: -1000px 0;
                }
                100% {
                    background-position: 1000px 0;
                }
            }
            
            .solution-item::before {
                animation: gradientMove 8s ease infinite, shimmer 3s infinite;
            }
        </style>
       
        <section class="solutions-section rel z-1 pb-100 rpb-70">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-xl-6 col-lg-8 col-md-10">
                        <div class="section-title mb-55">

                            <h2 style="font-size: 48px; font-weight: 800; font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.3; letter-spacing: -0.5px; background: linear-gradient(135deg, #141514 0%, #43a047 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 25px;">Make Every Service Contactless, Fast & Profitable.
                                
</h2> 
                            <p style="font-size: 20px; font-weight: 500; font-family: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif; line-height: 1.7; color: #555; max-width: 90%; margin: 0 auto;">Anawuma is built for modern hospitality businesses that want to reduce costs, increase table turnover, and delight their guests with seamless digital experiences.</p>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-xl-3 col-md-6">
                        <div class="solution-item wow fadeInUp delay-0-4s" style="background-color: #d4f0d6;">
                            <div class="solution-content">
                                <img src="assets/icons/food.png" alt="Enhanced Guest Experience">
                                <h3><a href="./about.php ">Run Smoothly, Even Short-Staffed</a></h3>
                                <p>Stop worrying about the waiter shortage. Anawuma acts as your digital waiter,
                                    handling orders and payments instantly. Your actual staff can focus on what matters
                                    most: serving food and building guest relationships, not running back and forth with
                                    notepads.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="solution-item wow fadeInUp delay-0-6s" style="background-color: #b3efb8;">
                            <div class="solution-content">

                                <img src="assets/icons/time-icon.png" alt="Boost Revenue">
                                <h3><a href="./about.php ">Turn Tables 20% Faster</a></h3>
                                <p>No more waiting for menus or the bill. Customers order the moment they sit down and
                                    pay when they’re ready. Faster service means happier guests and more tables served
                                    per shift, directly boosting your daily revenue.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="solution-item wow fadeInUp delay-0-8s" style="background-color: #d4f0d6;">
                            <div class="solution-content">
                                <img src="assets/icons/schedule.png" alt="Real-Time Management">
                                <h3><a href="./about.php ">Stop Guessing, Start Knowing</a></h3>
                                <p> What’s your highest margin dish? Who are your repeat customers? Anawuma’s dashboard
                                    gives you the "Secret Ingredient"— real-time data. Understand exactly what sells and
                                    when, so you can optimize your menu for maximum profit.</p>
                            </div>
                        </div>
                    </div>
                                        <div class="col-xl-3 col-md-6">
                        <div class="solution-item wow fadeInUp delay-0-2s" style="background-color: #b3efb8;">
                            <div class="solution-content">

                                <img src="assets/icons/qr-icon.png" alt="Easy to Use">
                                <h3><a href="./about.php ">No App Downloads. Just Scan & Eat.</a></h3>
                                <p>We don’t force your customers to install anything. A simple scan of the QR code opens
                                    your menu instantly. It’s seamless for them and effortless for you to update prices
                                    or sell-out items in real-time.</p>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <a href="http://192.168.8.162/restaurant-app/register_hotel.php" class="theme-btn style-three mt-15">
                            Get Started <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            
  
        </section>
        <!--====== Solutions Section End ======-->


        
        <!--====== About Section Start ======
        
        <section class="about-section rel z-1 pb-45 rpb-15">
           <div class="container">
    <div class="row align-items-center">
        
        <div class="col-xl-6 col-lg-6 d-flex justify-content-center">
            <div class="about-image rmb-55 wow fadeInLeft delay-0-2s">
<img src="assets/images/logos/large-logo.png" alt="About"
     style="width: 500px; max-width: 100%; height: auto;">
            </div>
        </div>

        
        <div class="col-xl-6 col-lg-6 d-flex justify-content-center">
            <div class="about-content wow fadeInRight delay-0-2s" style="max-width:500px;">
                <div class="section-title mb-25">
                    <span class="sub-title">About Anawuma</span>
                    <h2>The Ultimate QR-Based Hotel and Restaurant Management Software!</h2>
                </div>
                <p>Anawuma is a cutting-edge solution designed to enhance the hospitality experience by
                    integrating a powerful QR-based system into hotels and restaurants. Our software makes
                    it incredibly easy for guests to order food, request housekeeping services, and access
                    special offersâ€”all through a simple scan of a QR code.</p>
                <ul class="list-style-one mt-30 mb-45">
                    <li>QR Code Menu: Simplified Ordering</li>
                    <li>Housekeeping Requests Made Easy</li>
                    <li>Real-Time Menu Updates & Special Offers</li>
                </ul>
                <a href="./register_hotel.php" class="theme-btn">Get Started <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </div>
</div>

        </section>
        -->
        <!--====== About Section End ======-->
        <!--====== Newsletter Section Start ======-->
        <section class="newsletter-section rel py-100 rpy-70 z-2">
            <div class="container">
                <div class="newsletter-inner bg-blue bgs-cover text-white rel z-1">
                    <div class="for-adjust-spacing"></div>
                    <div class="row align-items-center align-items-xl-start">
                        <div class="col-lg-6">
                            <div class="newsletter-content p-60 wow fadeInUp delay-0-2s">
                                <div class="section-title mb-30">
                                <h2>Get in Touch with Anawuma</h2>
                                </div>
                                <p>Have questions or need support? Our dedicated team is here to help you! Whether you
                                    need assistance with implementation, custom feature requests, or inquiries about our
                                    services, we are just a message away.</p>
                                <a href="contact " class="theme-btn style-two rmb-15">For Custom Developments<i
                                        class="fas fa-arrow-right"></i></a>
                            </div>

                        </div>
                        <div class="col-lg-6">
                            <div class="newsletter-images wow fadeInUp delay-0-4s" style="display: flex; align-items: center; justify-content: center; height: 100%; min-height: 500px; padding: 0;">
                                <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
                                    <img src="assets/images/contacts/contact-us.png" alt="Newsletter" style="max-width: 120%; height: auto; width: 120%; border-radius: 20px; object-fit: contain; filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15)); transition: transform 0.3s ease, filter 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.02)'; this.style.filter='drop-shadow(0 15px 40px rgba(0, 0, 0, 0.2))';" onmouseout="this.style.transform='scale(1)'; this.style.filter='drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))';">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--====== Newsletter Section End ======-->



        <!--====== Features Section Start ======-->
       <section class="features-section bg-lighter rel z-1 pt-215 rpt-150 pb-130 rpb-100" id="features-section">
    <div class="container">
        <div class="row justify-content-center">

            <!-- CONTENT -->
            <div class="col-lg-12">
                <div class="feature-content rpt-35 rmb-55 wow fadeInRight delay-0-2s">

                    <div class="section-title mb-35 text-center">
                        <span class="sub-title">How It Works</span>
                        <h2>Simple. Smart. Seamless Dining Experience.</h2>
                    </div>

                    <style>
                        .how-it-works-wrapper {
                            position: relative;
                            padding: 40px 0;
                        }
                        
                        .how-it-works-item {
                            position: relative;
                            padding: 20px;
                            background: #ffffff;
                            border-radius: 20px;
                            box-shadow: 0 5px 25px rgba(0,0,0,0.08);
                            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                            height: 100%;
                            border: 2px solid transparent;
                            overflow: hidden;
                            margin-bottom: 25px;
                        }
                        
                        .how-it-works-item::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 5px;
                            background: linear-gradient(90deg, var(--item-color-start), var(--item-color-end));
                            transition: height 0.4s ease;
                        }
                        
                        .how-it-works-item:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 15px 45px rgba(0,0,0,0.15);
                            border-color: var(--item-color-end);
                        }
                        
                        .how-it-works-item:hover::before {
                            height: 100%;
                            opacity: 0.05;
                        }
                        
                        .how-it-works-icon {
                            width: 65px;
                            height: 65px;
                            background: linear-gradient(135deg, var(--item-color-start), var(--item-color-end));
                            border-radius: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 18px;
                            position: relative;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                            transition: all 0.4s ease;
                        }
                        
                        .how-it-works-item:hover .how-it-works-icon {
                            transform: rotate(5deg) scale(1.1);
                            box-shadow: 0 15px 40px rgba(0,0,0,0.25);
                        }
                        
                        .how-it-works-icon i {
                            font-size: 30px;
                            color: #ffffff;
                            transition: all 0.3s ease;
                        }
                        
                        .how-it-works-item:hover .how-it-works-icon i {
                            transform: scale(1.1);
                        }
                        
                        .step-number {
                            position: absolute;
                            top: 15px;
                            right: 15px;
                            width: 35px;
                            height: 35px;
                            background: linear-gradient(135deg, var(--item-color-start), var(--item-color-end));
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 700;
                            font-size: 16px;
                            color: #ffffff;
                            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                            z-index: 2;
                        }
                        
                        .how-it-works-content {
                            text-align: center;
                            position: relative;
                            z-index: 1;
                        }
                        
                        .how-it-works-content h4 {
                            font-size: 26px;
                            font-weight: 700;
                            color: #1a1a1a;
                            margin-bottom: 12px;
                            transition: color 0.3s ease;
                        }
                        
                        .how-it-works-item:hover .how-it-works-content h4 {
                            color: var(--item-color-end);
                        }
                        
                        .how-it-works-content .subtitle {
                            display: block;
                            font-size: 18px;
                            font-weight: 600;
                            color: var(--item-color-end);
                            margin-bottom: 12px;
                        }
                        
                        .how-it-works-content p {
                            font-size: 17px;
                            line-height: 1.7;
                            color: #666;
                            margin: 0;
                        }
                        
                        /* Color schemes for each step - Green gradients */
                        .item-scan {
                            --item-color-start: #c8e6c9;
                            --item-color-end: #66bb6a;
                        }
                        
                        .item-order {
                            --item-color-start: #a5d6a7;
                            --item-color-end: #4caf50;
                        }
                        
                        .item-confirm {
                            --item-color-start: #81c784;
                            --item-color-end: #43a047;
                        }
                        
                        .item-cook {
                            --item-color-start: #66bb6a;
                            --item-color-end: #388e3c;
                        }
                        
                        .item-update {
                            --item-color-start: #4caf50;
                            --item-color-end: #2e7d32;
                        }
                        
                        .item-deliver {
                            --item-color-start: #43a047;
                            --item-color-end: #1b5e20;
                        }
                        
                        /* Responsive adjustments */
                        @media (max-width: 991px) {
                            .how-it-works-icon {
                                width: 60px;
                                height: 60px;
                            }
                            
                            .how-it-works-icon i {
                                font-size: 28px;
                            }
                        }
                    </style>

                    <!-- HOW IT WORKS ITEMS -->
                    <div class="row how-it-works-wrapper">

                        <!-- Scan -->
                        <div class="col-xl-4 col-lg-6 col-md-6">
                            <div class="how-it-works-item item-scan">
                                <div class="step-number">1</div>
                                <div class="how-it-works-icon">
                                    <i class="fas fa-qrcode"></i>
                                </div>
                                <div class="how-it-works-content">
                                    <h4>Scan</h4>
                                    <span class="subtitle">Instant Access to Digital Menu</span>
                                    <p>
                                        Customers scan the QR code placed on their table or room using their smartphone.
                                        No app downloads required—your digital menu opens instantly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Order -->
                        <div class="col-xl-4 col-lg-6 col-md-6">
                            <div class="how-it-works-item item-order">
                                <div class="step-number">2</div>
                                <div class="how-it-works-icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <div class="how-it-works-content">
                                    <h4>Order</h4>
                                    <span class="subtitle">Customize & Place Orders Easily</span>
                                    <p>
                                        Customers browse the menu, select items, customize preferences,
                                        and add special notes—all in a few taps.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Confirm -->
                        <div class="col-xl-4 col-lg-6 col-md-6">
                            <div class="how-it-works-item item-confirm">
                                <div class="step-number">3</div>
                                <div class="how-it-works-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <div class="how-it-works-content">
                                    <h4>Confirm</h4>
                                    <span class="subtitle">Smart Order Confirmation</span>
                                    <p>
                                        The waiter receives an instant notification, reviews the order,
                                        and confirms it—ensuring accuracy and smooth coordination.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Cook -->
                        <div class="col-xl-4 col-lg-6 col-md-6">
                            <div class="how-it-works-item item-cook">
                                <div class="step-number">4</div>
                                <div class="how-it-works-icon">
                                    <i class="fas fa-fire"></i>
                                </div>
                                <div class="how-it-works-content">
                                    <h4>Cook</h4>
                                    <span class="subtitle">Direct Kitchen Integration</span>
                                    <p>
                                        Once confirmed, the order is sent straight to the kitchen dashboard,
                                        reducing delays, miscommunication, and manual errors.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Update -->
                        <div class="col-xl-4 col-lg-6 col-md-6">
                            <div class="how-it-works-item item-update">
                                <div class="step-number">5</div>
                                <div class="how-it-works-icon">
                                    <i class="fas fa-sync-alt"></i>
                                </div>
                                <div class="how-it-works-content">
                                    <h4>Update</h4>
                                    <span class="subtitle">Real-Time Order Tracking</span>
                                    <p>
                                        Order status updates (Preparing, Ready, Served) are visible in real time
                                        to both staff and customers, keeping everyone informed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Deliver -->
                        <div class="col-xl-4 col-lg-6 col-md-6">
                            <div class="how-it-works-item item-deliver">
                                <div class="step-number">6</div>
                                <div class="how-it-works-icon">
                                    <i class="fas fa-truck"></i>
                                </div>
                                <div class="how-it-works-content">
                                    <h4>Deliver</h4>
                                    <span class="subtitle">Fast & Organized Service</span>
                                    <p>
                                        When the food is ready, the waiter is notified immediately for pickup
                                        and delivery—ensuring timely and efficient service.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style="text-align: right;">
                        <a href="http://192.168.8.162/restaurant-app/register_hotel.php" class="theme-btn style-three mt-15">
                            Get Started <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <!-- SHAPES -->
    <img class="dots-shape spoon-roam" src="assets/images/shapes/spoon.gif" alt="Shape" style="animation-duration: 17s; animation-delay: 5s;">

</section>

        <!--====== Features Section End ======-->

        <!--====== Services Section Start ======-->
        <style>
            .service-card-modern {
                position: relative;
                border-radius: 20px;
                overflow: hidden;
                height: 320px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }
            
            .service-card-modern::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 100%);
                z-index: 1;
                transition: opacity 0.4s ease;
            }
            
            .service-card-modern:hover::before {
                opacity: 0;
            }
            
            .service-card-modern img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                filter: blur(0px);
            }
            
            .service-card-modern:hover img {
                transform: scale(1.1);
                filter: blur(5px);
            }
            
            .service-title-badge {
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                z-index: 2;
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 20px;
                transition: all 0.4s ease;
                transform: translateY(0);
                opacity: 1;
                filter: blur(0px);
            }
            
            .service-card-modern:hover .service-title-badge {
                transform: translateY(-10px);
                background: rgba(255, 255, 255, 0.25);
                opacity: 0;
                filter: blur(5px);
            }
            
            .service-title-badge h4 {
                margin: 0;
                font-size: 19px;
                font-weight: 700;
                color: #ffffff;
                text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                letter-spacing: 0.5px;
            }
            
            .service-description-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                padding: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 3;
            }
            
            .service-card-modern:hover .service-description-overlay {
                opacity: 1;
                visibility: visible;
            }
            
            .service-description-overlay::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 80px;
                height: 80px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .service-card-modern:hover .service-description-overlay::before {
                transform: translate(-50%, -50%) scale(10);
            }
            
            .service-description-overlay p {
                font-size: 18px;
                color: #ffffff;
                line-height: 1.8;
                margin: 0;
                text-align: center;
                position: relative;
                z-index: 1;
                transform: translateY(20px);
                opacity: 0;
                transition: all 0.5s ease 0.1s;
            }
            
            .service-card-modern:hover .service-description-overlay p {
                transform: translateY(0);
                opacity: 1;
            }
            
            .service-icon-badge {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                opacity: 1;
                filter: blur(0px);
            }
            
            .service-card-modern:hover .service-icon-badge {
                transform: rotate(15deg) scale(1.1);
                background: rgba(67, 160, 71, 1);
                opacity: 0;
                filter: blur(5px);
            }
            
            .service-icon-badge i {
                font-size: 20px;
                color: #729e72;
                transition: color 0.3s ease;
            }
            
            .service-card-modern:hover .service-icon-badge i {
                color: #ffffff;
            }
        </style>
        
        <section class="services-section rel z-1 py-130 rpy-100" id="services-section">
            <div class="container" style="position: relative; z-index: 2;">
                <div class="row justify-content-center text-center">
                    <div class="col-xl-6 col-lg-8 col-md-10">
                        <div class="section-title mb-55">
                            <span class="sub-title">Optimized Services for Your Success</span>
                            <h2>Everything you need to run a smarter, faster restaurant.</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    
                    <!-- Row 1: 4 boxes -->
                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-2s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-qrcode"></i>
                            </div>
                            <img src="assets/images/services/Qr1.png" alt="Digital QR Menu">
                            <div class="service-title-badge">
                                <h4>Digital QR Menu</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Allow customers to scan a QR code at their table for instant access to your full digital menu on their mobile phones.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-3s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-tv"></i>
                            </div>
                            <img src="assets/images/services/kitchen_dash.png" alt="Kitchen Dashboard">
                            <div class="service-title-badge">
                                <h4>Direct to Kitchen Dashboard</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Send confirmed orders straight to the kitchen screen with real-time alerts, ensuring chefs start cooking immediately.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-4s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-edit"></i>
                            </div>
                            <img src="assets/images/services/order.png" alt="Order Customization">
                            <div class="service-title-badge">
                                <h4>Advanced Order Customization</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Let diners personalize their meals such as adjusting spice levels or adding extra toppings directly within the app.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-5s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <img src="assets/images/services/status.png" alt="Status Updates">
                            <div class="service-title-badge">
                                <h4>Real-Time Status Updates</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Keep everyone in the loop. The system updates order progress in real-time, visible to both the customer and your staff.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Row 2: 4 boxes -->
                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-2s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-bell"></i>
                            </div>
                            <img src="assets/images/services/alerts.png" alt="Waiter Alerts">
                            <div class="service-title-badge">
                                <h4>Waiter Coordination Alerts</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Notify stewards instantly when an order is ready for pickup, minimizing food sitting time and ensuring faster delivery.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-3s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-tag"></i>
                            </div>
                            <img src="assets/images/services/offer.png" alt="Special Offers">
                            <div class="service-title-badge">
                                <h4>Special Offers Management</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Create and manage pop-up special offers or discounts that appear directly on the guest's screen to drive upsells.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-4s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <img src="assets/images/services/analytics-1.png" alt="Analytics">
                            <div class="service-title-badge">
                                <h4>Business Analytics</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Track your restaurant's performance with data on daily and monthly sales reports, and popular dishes.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-6 mb-4 wow fadeInUp delay-0-5s">
                        <div class="service-card-modern">
                            <div class="service-icon-badge">
                                <i class="fas fa-concierge-bell"></i>
                            </div>
                            <img src="assets/images/services/room.png" alt="Housekeeping">
                            <div class="service-title-badge">
                                <h4>Room Service & Housekeeping</h4>
                            </div>
                            <div class="service-description-overlay">
                                <p>Enable guests to request housekeeping services or room service orders directly through the specific Room QR code.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="dots-circle-half">
                <img src="assets/images/shapes/dots-circle-half.png" alt="shape">
            </div>
        </section>
        <!--====== Services Section End ======-->

<!--====== Blog Section Start ======-->
<section class="blog-section rel z-1 pb-210 rpb-100 rpb-150 rmb-30">
    <div class="container">
        <div class="row justify-content-center text-center">
            <div class="col-xl-6 col-lg-8 col-md-10">
                <div class="section-title mb-55">
                    <span class="sub-title">Latest News & Blog</span>
                    <h2>Get Our Every Single Update Latest News & Blog</h2>
                </div>
            </div>
        </div>
        <div class="row align-items-stretch"> <!-- Changed to align-items-stretch -->
            <?php
            $blogsJson = file_get_contents('blogs.json');
            $blogsData = json_decode($blogsJson, true);
            $delay = 0.2;
            
            foreach (array_slice($blogsData['blogs'], 0, 3) as $index => $blog):
                // More generous title length (60 chars)
                $title = strlen($blog['title']) > 60 
                    ? substr($blog['title'], 0, 60) . '...' 
                    : $blog['title'];
            ?>
            <div class="col-lg-4 col-md-6 mb-4"> <!-- Added mb-4 for spacing -->
                <div class="blog-item h-100 wow fadeInUp delay-<?php echo $delay; ?>s"> <!-- Added h-100 -->
                    <div class="image">
                        <img src="assets/images/blog/<?php echo htmlspecialchars($blog['image']); ?>" 
                             alt="<?php echo htmlspecialchars($title); ?>"
                             class="img-fluid w-100" style="height: 200px; object-fit: cover;">
                    </div>
                   
                    <div class="blog-content d-flex flex-column" style="flex: 1;"> <!-- Flex layout -->
                        <ul class="blog-meta">
                            <li><i class="far fa-calendar-alt"></i> <?php echo htmlspecialchars($blog['date']); ?></li>
                            
                        </ul>
                        <h4 class="title-flex" style="
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            min-height: 72px; /* 3 lines */
                            margin-bottom: 15px;
                            line-height: 1.4;
                        "><a href="blog-details.php?id=<?php echo $blog['id']; ?>"><?php echo htmlspecialchars($title); ?></a></h4>
                        
                        <div class="mt-auto"> <!-- Pushes button to bottom -->
                            <a href="blog-details.php?id=<?php echo $blog['id']; ?>" class="learn-more">Learn More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <?php 
                $delay += 0.2;
            endforeach; 
            ?>
            
            <div class="col-lg-12">
                <div class="news-more-btn text-center pt-30">
                    <a href="blog.php" class="theme-btn style-three">View More News <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>
<!--====== Blog Section End ======-->


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
                                <a href="./register_hotel.php " class="theme-btn style-two rmb-15">Register Now <i
                                        class="fas fa-arrow-right"></i></a>
                                <a href="./about.php " class="theme-btn style-three rmb-15">Learn More <i
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
                                <a href="./index.php "><img src="assets/images/logos/logo-rmbg-2.png" alt="Logo"></a>
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
                                <li><a href="about ">Company</a></li>
                                <li><a href="contact ">Contact</a></li>

                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4">
                        <div class="footer-widget link-widget">
                            <h4 class="footer-title">Quick Links</h4>
                            <ul class="list-style-two two-column">
                                <li><a href="./pricing.php ">Pricing</a></li>
                                <li><a href="./register_hotel.php ">Register</a></li>
                                <li><a href="./login.php ">Login</a></li>

                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-4">

                    <div class="footer-widget contact-widget">
                            <h4 class="footer-title">Get in Touch</h4>
                            <ul class="list-style-three">
                                <li><i class="fas fa-globe"></i> Scandinavian Office
                                    </li>
                                <li><i class="fas fa-map-marker-alt"></i> 15, Dr Waalers Gata, Hamar 2321
                                    </li>
                                
                                <li><i class="fas fa-phone"></i> Call :<a href="callto:+94777547239"> +46 700 236 926</a>
                                </li>
                            </ul>

                            <ul class="list-style-three">
                                <li><i class="fas fa-globe"></i> Australia Office
                                    </li>
                                <li><i class="fas fa-map-marker-alt"></i>15, Manuka street, Constitution Hill, NSW 2145
                                    </li>
                                
                                <li><i class="fas fa-phone"></i> Call :<a href="callto:+94777547239"> +61 434 502 385</a>
                                </li>

                                 <li><i class="fas fa-home"></i>Head Office - Sri Lanka
                                    </li>
                                    <li><i class="fas fa-map-marker-alt"></i>No 16, Wewalwala Road, Bataganwila, Galle.
                                    </li>
                                    <li><i class="fas fa-phone"></i> Call :<a href="callto:+94777547239">  +94 777 547 239</a>
                                </li>

                         
                       

            
                           
                                <li><i class="fas fa-envelope-open"></i> <a
                                        href="mailto:info@anawuma.com">info@anawuma.com</a></li>
                          
                    </div>
                </div>
                <div class="copyright-area text-center">
                    <p>© <?php echo date("Y"); ?> <a href="http://knowebsolutions.com" target="_blank"
                            rel="noopener noreferrer">Knoweb (PVT) LTD.</a> All rights reserved</p>
                </div>
            </div>
            <img class="dots-shape spoon-roam" src="assets/images/shapes/spoon.gif" alt="Shape" style="animation-duration: 13s; animation-delay: 6s;">
 
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
