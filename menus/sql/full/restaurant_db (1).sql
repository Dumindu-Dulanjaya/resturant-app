-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 05:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_sessions`
--

CREATE TABLE `active_sessions` (
  `table_number` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `last_activity` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `active_sessions`
--

INSERT INTO `active_sessions` (`table_number`, `session_id`, `last_activity`, `restaurant_id`) VALUES
(2, '1p0om841b77dsogejqvrdpkpqh', '2024-10-28 07:56:39', 1),
(2, 'jt6rcgchh410m038brtnq74d35', '2024-10-28 08:07:27', 1);

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

CREATE TABLE `admin_tbl` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','kitchen','steward') DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`admin_id`, `email`, `password`, `role`, `restaurant_id`) VALUES
(1, 'admin@angel.com', '$2y$10$xFzlVOoc9Ji2R3QRwfFJE.Rp/TGgyWjCZFMBwkqBMAq/YMmegClj2', 'admin', 1),
(2, 'steward@angel.com', '$2y$10$AQ4yBI8wx9VqupHtv6JbneBOii3vM7477iP4uZBRKtVGSDbcqaJZO', 'steward', 1),
(3, 'clean@angel.com', '$2y$10$vpkHcFiDwusUUp9c5meUWubo6ihDZHZ0yCTObrmFUjuwMtUcgfxU6', 'kitchen', 1),
(9, 'lycoris@host.com', '$2y$10$tLuDducRiOYxh3xZOoSmY.5vVx1xGltTbFceM.oxYwpezhNH54LjK', 'admin', 6),
(18, 'stewddard@mail.com', '$2y$10$QeFUGjcWRuSiCC5gIQfSMu.rJYYE9vWC70r360PLOF/uLmlzeXW0C', 'steward', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart_tbl`
--

CREATE TABLE `cart_tbl` (
  `cart_id` int(11) NOT NULL,
  `food_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `table_number` int(11) DEFAULT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_tbl`
--

INSERT INTO `cart_tbl` (`cart_id`, `food_item_id`, `quantity`, `session_id`, `table_number`, `restaurant_id`) VALUES
(291, 50, 3, '1p0om841b77dsogejqvrdpkpqh', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category_tbl`
--

CREATE TABLE `category_tbl` (
  `category_id` int(5) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `menu_id` int(5) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `description` varchar(100) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_tbl`
--

INSERT INTO `category_tbl` (`category_id`, `category_name`, `menu_id`, `image_url`, `description`, `restaurant_id`) VALUES
(46, 'Water', 51, '../assets/imgs/category-img/1-670ca43011a8b-category-imgwater.jpg', 'rfddhgfhg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `countries_tbl`
--

CREATE TABLE `countries_tbl` (
  `country_id` int(11) NOT NULL,
  `country_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries_tbl`
--

INSERT INTO `countries_tbl` (`country_id`, `country_name`) VALUES
(1, 'Afghanistan'),
(2, 'Albania'),
(3, 'Algeria'),
(4, 'Andorra'),
(5, 'Angola'),
(6, 'Antigua and Barbuda'),
(7, 'Argentina'),
(8, 'Armenia'),
(9, 'Australia'),
(10, 'Austria'),
(11, 'Azerbaijan'),
(12, 'Bahamas'),
(13, 'Bahrain'),
(14, 'Bangladesh'),
(15, 'Barbados'),
(16, 'Belarus'),
(17, 'Belgium'),
(18, 'Belize'),
(19, 'Benin'),
(20, 'Bhutan'),
(21, 'Bolivia'),
(22, 'Bosnia and Herzegovina'),
(23, 'Botswana'),
(24, 'Brazil'),
(25, 'Brunei'),
(26, 'Bulgaria'),
(27, 'Burkina Faso'),
(28, 'Burundi'),
(29, 'Cabo Verde'),
(30, 'Cambodia'),
(31, 'Cameroon'),
(32, 'Canada'),
(33, 'Central African Republic'),
(34, 'Chad'),
(35, 'Chile'),
(36, 'China'),
(37, 'Colombia'),
(38, 'Comoros'),
(39, 'Congo, Democratic Republic of the'),
(40, 'Congo, Republic of the'),
(41, 'Costa Rica'),
(42, 'Croatia'),
(43, 'Cuba'),
(44, 'Cyprus'),
(45, 'Czech Republic'),
(46, 'Denmark'),
(47, 'Djibouti'),
(48, 'Dominica'),
(49, 'Dominican Republic'),
(50, 'East Timor'),
(51, 'Ecuador'),
(52, 'Egypt'),
(53, 'El Salvador'),
(54, 'Equatorial Guinea'),
(55, 'Eritrea'),
(56, 'Estonia'),
(57, 'Eswatini'),
(58, 'Ethiopia'),
(59, 'Fiji'),
(60, 'Finland'),
(61, 'France'),
(62, 'Gabon'),
(63, 'Gambia'),
(64, 'Georgia'),
(65, 'Germany'),
(66, 'Ghana'),
(67, 'Greece'),
(68, 'Grenada'),
(69, 'Guatemala'),
(70, 'Guinea'),
(71, 'Guinea-Bissau'),
(72, 'Guyana'),
(73, 'Haiti'),
(74, 'Honduras'),
(75, 'Hungary'),
(76, 'Iceland'),
(77, 'India'),
(78, 'Indonesia'),
(79, 'Iran'),
(80, 'Iraq'),
(81, 'Ireland'),
(82, 'Israel'),
(83, 'Italy'),
(84, 'Jamaica'),
(85, 'Japan'),
(86, 'Jordan'),
(87, 'Kazakhstan'),
(88, 'Kenya'),
(89, 'Kiribati'),
(90, 'Korea, North'),
(91, 'Korea, South'),
(92, 'Kuwait'),
(93, 'Kyrgyzstan'),
(94, 'Laos'),
(95, 'Latvia'),
(96, 'Lebanon'),
(97, 'Lesotho'),
(98, 'Liberia'),
(99, 'Libya'),
(100, 'Liechtenstein'),
(101, 'Lithuania'),
(102, 'Luxembourg'),
(103, 'Madagascar'),
(104, 'Malawi'),
(105, 'Malaysia'),
(106, 'Maldives'),
(107, 'Mali'),
(108, 'Malta'),
(109, 'Marshall Islands'),
(110, 'Mauritania'),
(111, 'Mauritius'),
(112, 'Mexico'),
(113, 'Micronesia'),
(114, 'Moldova'),
(115, 'Monaco'),
(116, 'Mongolia'),
(117, 'Montenegro'),
(118, 'Morocco'),
(119, 'Mozambique'),
(120, 'Myanmar'),
(121, 'Namibia'),
(122, 'Nauru'),
(123, 'Nepal'),
(124, 'Netherlands'),
(125, 'New Zealand'),
(126, 'Nicaragua'),
(127, 'Niger'),
(128, 'Nigeria'),
(129, 'North Macedonia'),
(130, 'Norway'),
(131, 'Oman'),
(132, 'Pakistan'),
(133, 'Palau'),
(134, 'Panama'),
(135, 'Papua New Guinea'),
(136, 'Paraguay'),
(137, 'Peru'),
(138, 'Philippines'),
(139, 'Poland'),
(140, 'Portugal'),
(141, 'Qatar'),
(142, 'Romania'),
(143, 'Russia'),
(144, 'Rwanda'),
(145, 'Saint Kitts and Nevis'),
(146, 'Saint Lucia'),
(147, 'Saint Vincent and the Grenadines'),
(148, 'Samoa'),
(149, 'San Marino'),
(150, 'Sao Tome and Principe'),
(151, 'Saudi Arabia'),
(152, 'Senegal'),
(153, 'Serbia'),
(154, 'Seychelles'),
(155, 'Sierra Leone'),
(156, 'Singapore'),
(157, 'Slovakia'),
(158, 'Slovenia'),
(159, 'Solomon Islands'),
(160, 'Somalia'),
(161, 'South Africa'),
(162, 'South Sudan'),
(163, 'Spain'),
(164, 'Sri Lanka'),
(165, 'Sudan'),
(166, 'Suriname'),
(167, 'Sweden'),
(168, 'Switzerland'),
(169, 'Syria'),
(170, 'Taiwan'),
(171, 'Tajikistan'),
(172, 'Tanzania'),
(173, 'Thailand'),
(174, 'Togo'),
(175, 'Tonga'),
(176, 'Trinidad and Tobago'),
(177, 'Tunisia'),
(178, 'Turkey'),
(179, 'Turkmenistan'),
(180, 'Tuvalu'),
(181, 'Uganda'),
(182, 'Ukraine'),
(183, 'United Arab Emirates'),
(184, 'United Kingdom'),
(185, 'United States'),
(186, 'Uruguay'),
(187, 'Uzbekistan'),
(188, 'Vanuatu'),
(189, 'Vatican City'),
(190, 'Venezuela'),
(191, 'Vietnam'),
(192, 'Yemen'),
(193, 'Zambia'),
(194, 'Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `currency_types_tbl`
--

CREATE TABLE `currency_types_tbl` (
  `currency_id` int(11) NOT NULL,
  `currency` varchar(50) NOT NULL,
  `currency_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `currency_types_tbl`
--

INSERT INTO `currency_types_tbl` (`currency_id`, `currency`, `currency_name`) VALUES
(1, 'USD', 'United States Dollar'),
(2, 'EUR', 'Euro'),
(3, 'GBP', 'British Pound Sterling'),
(4, 'JPY', 'Japanese Yen'),
(5, 'AUD', 'Australian Dollar'),
(6, 'CAD', 'Canadian Dollar'),
(7, 'CHF', 'Swiss Franc'),
(8, 'CNY', 'Chinese Yuan'),
(9, 'SEK', 'Swedish Krona'),
(10, 'NZD', 'New Zealand Dollar'),
(11, 'INR', 'Indian Rupee'),
(12, 'BRL', 'Brazilian Real'),
(13, 'RUB', 'Russian Ruble'),
(14, 'ZAR', 'South African Rand'),
(15, 'MXN', 'Mexican Peso'),
(16, 'SGD', 'Singapore Dollar'),
(17, 'HKD', 'Hong Kong Dollar'),
(18, 'NOK', 'Norwegian Krone'),
(19, 'KRW', 'South Korean Won'),
(20, 'TRY', 'Turkish Lira'),
(21, 'SAR', 'Saudi Riyal'),
(22, 'AED', 'United Arab Emirates Dirham'),
(23, 'LKR', 'Sri Lankan Rupee'),
(24, 'THB', 'Thai Baht'),
(25, 'MYR', 'Malaysian Ringgit'),
(26, 'IDR', 'Indonesian Rupiah'),
(27, 'VND', 'Vietnamese Dong'),
(28, 'PLN', 'Polish Zloty'),
(29, 'PHP', 'Philippine Peso'),
(30, 'EGP', 'Egyptian Pound'),
(31, 'ILS', 'Israeli New Shekel'),
(32, 'KWD', 'Kuwaiti Dinar'),
(33, 'QAR', 'Qatari Riyal'),
(34, 'PKR', 'Pakistani Rupee'),
(35, 'TWD', 'New Taiwan Dollar'),
(36, 'DKK', 'Danish Krone'),
(37, 'HUF', 'Hungarian Forint'),
(38, 'CZK', 'Czech Koruna'),
(39, 'ARS', 'Argentine Peso'),
(40, 'CLP', 'Chilean Peso'),
(41, 'NGN', 'Nigerian Naira'),
(42, 'KES', 'Kenyan Shilling'),
(43, 'GHS', 'Ghanaian Cedi'),
(44, 'MAD', 'Moroccan Dirham');

-- --------------------------------------------------------

--
-- Table structure for table `food_items_tbl`
--

CREATE TABLE `food_items_tbl` (
  `food_items_id` int(5) NOT NULL,
  `food_items_name` varchar(200) NOT NULL,
  `description` varchar(350) NOT NULL,
  `price` float NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `category_id` int(5) NOT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `image_url_1` varchar(255) NOT NULL,
  `image_url_2` varchar(255) NOT NULL,
  `image_url_3` varchar(255) NOT NULL,
  `image_url_4` varchar(255) NOT NULL,
  `video_link` varchar(255) DEFAULT NULL,
  `blog_link` varchar(255) DEFAULT NULL,
  `restaurant_id` int(11) NOT NULL,
  `more_details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_items_tbl`
--

INSERT INTO `food_items_tbl` (`food_items_id`, `food_items_name`, `description`, `price`, `currency_id`, `category_id`, `subcategory_id`, `image_url_1`, `image_url_2`, `image_url_3`, `image_url_4`, `video_link`, `blog_link`, `restaurant_id`, `more_details`) VALUES
(50, 'ESPRESSO MARTINI', 'gfdhgdfgdf', 250, 1, 46, NULL, '../assets/imgs/item-img/1_670ca46702336_66bc3c19e33fa_food_item_66a65d9668809.jpeg', '../assets/imgs/item-img/1_670ca46702532_66bc3c19e2fa9_food_item_66a65d966839b.jpeg', '../assets/imgs/item-img/1_670ca46708849_66bc3c19e31fc_food_item_66a65d96686ce.jpeg', '../assets/imgs/item-img/1_670ca4670c5c3_66bc3c62b0aa9_food_item_66a65dc7627e8.jpeg', 'https://www.youtube.com/embed/0ijbcXKfxJU', '', 1, 'fgdfgdgdf');

-- --------------------------------------------------------

--
-- Table structure for table `housekeeping_tbl`
--

CREATE TABLE `housekeeping_tbl` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `job_date` date NOT NULL,
  `job_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) NOT NULL,
  `room_number` int(11) NOT NULL,
  `status` enum('pending','done') DEFAULT 'pending',
  `audio_file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_tbl`
--

CREATE TABLE `menu_tbl` (
  `menu_id` int(5) NOT NULL,
  `menu_name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_tbl`
--

INSERT INTO `menu_tbl` (`menu_id`, `menu_name`, `description`, `image_url`, `restaurant_id`) VALUES
(51, 'Beverages', 'Beverage Menu', 'assets/imgs/menu-img/1_1728881685.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `old_orders_tbl`
--

CREATE TABLE `old_orders_tbl` (
  `order_id` int(11) NOT NULL,
  `table_number` int(11) DEFAULT NULL,
  `room_number` int(11) DEFAULT NULL,
  `food_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_method` varchar(50) NOT NULL,
  `total_price` float NOT NULL,
  `payment_status` enum('pending','complete') NOT NULL DEFAULT 'pending',
  `order_status` enum('pending','processing','complete') NOT NULL DEFAULT 'pending',
  `session_id` varchar(50) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `customer_name` varchar(50) NOT NULL,
  `customer_number` varchar(20) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `old_orders_tbl`
--

INSERT INTO `old_orders_tbl` (`order_id`, `table_number`, `room_number`, `food_item_id`, `quantity`, `order_date`, `payment_method`, `total_price`, `payment_status`, `order_status`, `session_id`, `completed`, `customer_name`, `customer_number`, `restaurant_id`) VALUES
(45, 2, NULL, 16, 1, '2024-07-31 14:11:23', 'cash', 600, 'pending', 'complete', '1o736mtccl5a1mnt5h5s68uccm', 1, 'Siripala', '0777252888', 1),
(47, 2, NULL, 31, 1, '2024-07-31 14:12:18', 'cash', 2560, 'complete', 'complete', '1o736mtccl5a1mnt5h5s68uccm', 1, 'Siripala', '0772828283', 1),
(50, 4, NULL, 33, 1, '2024-08-07 07:09:51', 'cash', 500, 'pending', 'complete', 'g1vls27bq878mjv03o8g8s21ks', 1, 'Ravindu ', '0766021346', 1),
(59, NULL, NULL, 39, 6, '2024-08-19 18:54:09', 'cash', 15360, 'complete', 'complete', 'r4gfk1vhhql1nihmspgrkvc44p', 1, 'pakaya', '0422513413', 1),
(60, NULL, 12, 39, 1, '2024-08-19 19:14:14', 'cash', 2560, 'complete', 'complete', 'r4gfk1vhhql1nihmspgrkvc44p', 1, 'pakaya', '0422513413', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders_tbl`
--

CREATE TABLE `orders_tbl` (
  `order_id` int(11) NOT NULL,
  `food_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_method` varchar(50) NOT NULL,
  `note` text DEFAULT NULL,
  `total_price` float NOT NULL,
  `payment_status` enum('pending','complete') NOT NULL DEFAULT 'pending',
  `order_status` enum('pending','processing','complete') NOT NULL DEFAULT 'pending',
  `session_id` varchar(50) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `table_number` int(11) DEFAULT NULL,
  `customer_name` varchar(50) NOT NULL,
  `customer_number` varchar(20) NOT NULL,
  `steward_confirmation` enum('pending','confirmed','rejected') DEFAULT 'pending',
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders_tbl`
--

INSERT INTO `orders_tbl` (`order_id`, `food_item_id`, `quantity`, `order_date`, `payment_method`, `note`, `total_price`, `payment_status`, `order_status`, `session_id`, `completed`, `table_number`, `customer_name`, `customer_number`, `steward_confirmation`, `restaurant_id`) VALUES
(75, 50, 1, '2024-10-15 09:51:32', 'cash', '', 250, 'complete', 'complete', '9fc3bg9saf964ua40mbl4t0r9j', 1, 1, 'Ravindu', '0772837383', 'confirmed', 1),
(76, 50, 1, '2024-10-15 09:57:40', 'cash', '', 250, 'complete', 'complete', 'lsonrcv2v08jevhf29a7itajep', 0, 1, 'Pakaya', '0772837383', 'confirmed', 1),
(77, 50, 1, '2024-10-15 10:13:39', 'cash', '', 250, 'pending', 'pending', 'ksq52eso3153qrnusipgv4ot68', 0, 1, 'Ravindu', '0772837383', 'confirmed', 6),
(78, 50, 1, '2024-10-15 10:18:21', 'cash', '', 250, 'pending', 'pending', '4lh256lv4jvsder889v7bk5gbs', 0, 1, 'John cena', '0772837383', 'confirmed', 6),
(86, 50, 2, '2024-10-28 12:07:56', 'cash', '', 500, 'pending', 'pending', 'j4celeoghncpraed9qrq5lgje1', 0, 2, 'Ravindu', '0772837383', 'pending', 1);

-- --------------------------------------------------------

--
-- Table structure for table `packages_tbl`
--

CREATE TABLE `packages_tbl` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_in_days` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages_tbl`
--

INSERT INTO `packages_tbl` (`package_id`, `package_name`, `price`, `duration_in_days`, `description`, `created_at`) VALUES
(1, 'Basic', 20.00, 30, 'Basic package includes basic features', '2024-09-28 15:59:08'),
(2, 'Standard', 50.00, 30, 'Standard package includes more advanced features', '2024-09-28 15:59:08'),
(3, 'Premium', 75.00, 30, 'Premium package includes full features and premium support', '2024-09-28 15:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `package_privileges_tbl`
--

CREATE TABLE `package_privileges_tbl` (
  `package_id` int(11) NOT NULL,
  `privilege_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package_privileges_tbl`
--

INSERT INTO `package_privileges_tbl` (`package_id`, `privilege_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `privileges_tbl`
--

CREATE TABLE `privileges_tbl` (
  `privilege_id` int(11) NOT NULL,
  `privilege_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privileges_tbl`
--

INSERT INTO `privileges_tbl` (`privilege_id`, `privilege_name`, `description`, `created_at`) VALUES
(1, 'QR Menu System', 'Access and manage the QR code menu system for the restaurant.', '2024-08-11 09:43:31'),
(2, 'QR Housekeeping System', 'Access and manage the QR code-based housekeeping system.', '2024-08-11 09:43:31'),
(3, 'Special Offers', 'Manage and create special offers for customers', '2024-08-27 01:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes_tbl`
--

CREATE TABLE `promo_codes_tbl` (
  `promo_id` int(11) NOT NULL,
  `promo_code` varchar(50) NOT NULL,
  `discount_percent` decimal(5,2) NOT NULL,
  `valid_from` date NOT NULL,
  `valid_until` date NOT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `used_count` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promo_codes_tbl`
--

INSERT INTO `promo_codes_tbl` (`promo_id`, `promo_code`, `discount_percent`, `valid_from`, `valid_until`, `usage_limit`, `used_count`, `is_active`, `created_at`) VALUES
(1, 'SAVE8', 7.00, '2024-11-01', '2024-12-31', 100, 0, 1, '2024-11-20 05:56:32');

-- --------------------------------------------------------

--
-- Table structure for table `promo_code_usage_tbl`
--

CREATE TABLE `promo_code_usage_tbl` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `promo_code` varchar(255) NOT NULL,
  `used_count` int(11) DEFAULT 1,
  `last_used_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promo_code_usage_tbl`
--

INSERT INTO `promo_code_usage_tbl` (`id`, `restaurant_id`, `promo_code`, `used_count`, `last_used_at`) VALUES
(1, 1, 'save8', 10, '2024-11-27 11:22:42');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_privileges_tbl`
--

CREATE TABLE `restaurant_privileges_tbl` (
  `restaurant_id` int(11) NOT NULL,
  `privilege_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant_privileges_tbl`
--

INSERT INTO `restaurant_privileges_tbl` (`restaurant_id`, `privilege_id`) VALUES
(1, 1),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_tbl`
--

CREATE TABLE `restaurant_tbl` (
  `restaurant_id` int(11) NOT NULL,
  `restaurant_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `subscription_status` enum('active','inactive') DEFAULT 'inactive',
  `subscription_expiry_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(65) NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant_tbl`
--

INSERT INTO `restaurant_tbl` (`restaurant_id`, `restaurant_name`, `address`, `contact_number`, `subscription_status`, `subscription_expiry_date`, `created_at`, `email`, `opening_time`, `closing_time`, `logo`, `password`, `currency_id`, `country_id`, `package_id`) VALUES
(1, 'SeaSpray Café', 'Baddegama, Galle, Srilanaka', '0715533545', 'inactive', '2024-10-30 18:30:00', '2024-08-11 04:53:50', 'contact@seaspray.com', '08:00:00', '20:00:00', '../assets/imgs/logo/logo.ico', '$2y$10$Yp6hiofOVLE49De1tFQtXejtLpWMXjluaD.xS2dV7BlQCwgW7VyDO', 1, 164, 3),
(6, 'Test Restaurant', 'drtdgdrydr', '0775454452', 'inactive', '2024-10-10 18:30:00', '2024-10-11 09:47:03', 'test@host.com', '18:16:00', '10:16:00', '../assets/imgs/logo/cec1ca48b5eeedf1633ee7439de84ed9.png', '$2y$10$tLuDducRiOYxh3xZOoSmY.5vVx1xGltTbFceM.oxYwpezhNH54LjK', 1, 61, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rooms_tbl`
--

CREATE TABLE `rooms_tbl` (
  `room_id` int(11) NOT NULL,
  `room_number` varchar(50) NOT NULL,
  `qr_code_url` varchar(255) NOT NULL,
  `login_credentials` varchar(255) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms_tbl`
--

INSERT INTO `rooms_tbl` (`room_id`, `room_number`, `qr_code_url`, `login_credentials`, `restaurant_id`) VALUES
(76, '1', '../qrcodes/rooms/1_room_1.png', 'F6d2MfP4', 1);

-- --------------------------------------------------------

--
-- Table structure for table `room_active_sessions`
--

CREATE TABLE `room_active_sessions` (
  `room_number` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `last_activity` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_cart_tbl`
--

CREATE TABLE `room_cart_tbl` (
  `cart_id` int(11) NOT NULL,
  `food_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `room_number` int(11) DEFAULT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_orders_tbl`
--

CREATE TABLE `room_orders_tbl` (
  `room_order_id` int(11) NOT NULL,
  `food_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `note` text DEFAULT NULL,
  `total_price` float NOT NULL,
  `order_status` enum('pending','processing','complete') NOT NULL DEFAULT 'pending',
  `session_id` varchar(50) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `room_number` int(11) DEFAULT NULL,
  `customer_name` varchar(50) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_orders_tbl`
--

INSERT INTO `room_orders_tbl` (`room_order_id`, `food_item_id`, `quantity`, `order_date`, `note`, `total_price`, `order_status`, `session_id`, `completed`, `room_number`, `customer_name`, `restaurant_id`) VALUES
(5, 37, 1, '2024-08-21 11:42:01', 'fhbdhdfhfd', 2200, 'complete', 'qs2h0egfpaglh5n88uap94j7v1', 1, 12, 'ravindu', 1),
(6, 37, 1, '2024-08-23 09:02:19', 'jsdhjhsdfjhsdfjhfdjsf', 2200, 'complete', '58vp8i42lr5d5ummnd3nna0qio', 0, 12, 'ravindu', 1),
(7, 37, 1, '2024-08-23 11:52:31', '', 2200, 'complete', 'abkuprejpbaiekl344kcec5no6', 0, 12, 'Http', 6),
(8, 50, 1, '2024-10-15 10:39:33', '', 250, 'processing', 'p98sh9t9dj0c8lrumbsuik9t8m', 0, 1, 'Ravindu', 1),
(9, 50, 1, '2024-10-15 10:47:54', '', 250, 'pending', 'qg5vq8rnkol4h6dgi1oooei7ti', 0, 1, 'John cena', 1);

-- --------------------------------------------------------

--
-- Table structure for table `special_offers_tbl`
--

CREATE TABLE `special_offers_tbl` (
  `offer_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_path` text DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `restaurant_id` int(11) NOT NULL DEFAULT 1,
  `product_type` enum('menu','category','item') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subcategory_tbl`
--

CREATE TABLE `subcategory_tbl` (
  `subcategory_id` int(11) NOT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `parent_category_id` int(11) NOT NULL,
  `restaurant_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `super_admin_tbl`
--

CREATE TABLE `super_admin_tbl` (
  `super_admin_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super_admin_tbl`
--

INSERT INTO `super_admin_tbl` (`super_admin_id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Super Admin', 'info@knowebsolutions.com', '$2y$10$.UU0waAJHeDe8tr0n7hejO6.33BJL2FqoYcS4PUM3iHupngNW8sLq', '2024-10-11 04:33:54');

-- --------------------------------------------------------

--
-- Table structure for table `tables_tbl`
--

CREATE TABLE `tables_tbl` (
  `table_id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `qr_code_url` varchar(255) NOT NULL,
  `login_credentials` varchar(255) NOT NULL,
  `restaurant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tables_tbl`
--

INSERT INTO `tables_tbl` (`table_id`, `table_number`, `qr_code_url`, `login_credentials`, `restaurant_id`) VALUES
(1393, 2, '../qrcodes/tables/1_table_2.png', '1yl9WDOB', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_sessions`
--
ALTER TABLE `active_sessions`
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD KEY `session_id_2` (`session_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `cart_tbl`
--
ALTER TABLE `cart_tbl`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `food_item_id` (`food_item_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `fk_cart_restaurant` (`restaurant_id`);

--
-- Indexes for table `category_tbl`
--
ALTER TABLE `category_tbl`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `fk_menu_id` (`menu_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `countries_tbl`
--
ALTER TABLE `countries_tbl`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `currency_types_tbl`
--
ALTER TABLE `currency_types_tbl`
  ADD PRIMARY KEY (`currency_id`),
  ADD KEY `currency_id` (`currency_id`);

--
-- Indexes for table `food_items_tbl`
--
ALTER TABLE `food_items_tbl`
  ADD PRIMARY KEY (`food_items_id`),
  ADD KEY `fk_category_id` (`category_id`),
  ADD KEY `fk_currency` (`currency_id`),
  ADD KEY `subcategory_id` (`subcategory_id`),
  ADD KEY `fk_food_items_restaurant` (`restaurant_id`);

--
-- Indexes for table `housekeeping_tbl`
--
ALTER TABLE `housekeeping_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `menu_tbl`
--
ALTER TABLE `menu_tbl`
  ADD PRIMARY KEY (`menu_id`),
  ADD KEY `fk_menu_restaurant` (`restaurant_id`);

--
-- Indexes for table `old_orders_tbl`
--
ALTER TABLE `old_orders_tbl`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_old_orders_restaurant` (`restaurant_id`);

--
-- Indexes for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `food_item_id` (`food_item_id`),
  ADD KEY `table_number` (`table_number`),
  ADD KEY `fk_orders_restaurant` (`restaurant_id`);

--
-- Indexes for table `packages_tbl`
--
ALTER TABLE `packages_tbl`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `package_privileges_tbl`
--
ALTER TABLE `package_privileges_tbl`
  ADD PRIMARY KEY (`package_id`,`privilege_id`),
  ADD KEY `privilege_id` (`privilege_id`);

--
-- Indexes for table `privileges_tbl`
--
ALTER TABLE `privileges_tbl`
  ADD PRIMARY KEY (`privilege_id`),
  ADD UNIQUE KEY `privilege_name` (`privilege_name`);

--
-- Indexes for table `promo_codes_tbl`
--
ALTER TABLE `promo_codes_tbl`
  ADD PRIMARY KEY (`promo_id`),
  ADD UNIQUE KEY `promo_code` (`promo_code`);

--
-- Indexes for table `promo_code_usage_tbl`
--
ALTER TABLE `promo_code_usage_tbl`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `promo_code` (`promo_code`);

--
-- Indexes for table `restaurant_privileges_tbl`
--
ALTER TABLE `restaurant_privileges_tbl`
  ADD PRIMARY KEY (`restaurant_id`,`privilege_id`),
  ADD KEY `privilege_id` (`privilege_id`);

--
-- Indexes for table `restaurant_tbl`
--
ALTER TABLE `restaurant_tbl`
  ADD PRIMARY KEY (`restaurant_id`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD KEY `email` (`email`),
  ADD KEY `fk_currency` (`currency_id`),
  ADD KEY `fk_country` (`country_id`),
  ADD KEY `fk_package` (`package_id`);

--
-- Indexes for table `rooms_tbl`
--
ALTER TABLE `rooms_tbl`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `room_active_sessions`
--
ALTER TABLE `room_active_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `room_cart_tbl`
--
ALTER TABLE `room_cart_tbl`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `food_item_id` (`food_item_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `room_orders_tbl`
--
ALTER TABLE `room_orders_tbl`
  ADD PRIMARY KEY (`room_order_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `special_offers_tbl`
--
ALTER TABLE `special_offers_tbl`
  ADD PRIMARY KEY (`offer_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `subcategory_tbl`
--
ALTER TABLE `subcategory_tbl`
  ADD PRIMARY KEY (`subcategory_id`),
  ADD KEY `parent_category_id` (`parent_category_id`),
  ADD KEY `fk_subcategory_restaurant` (`restaurant_id`);

--
-- Indexes for table `super_admin_tbl`
--
ALTER TABLE `super_admin_tbl`
  ADD PRIMARY KEY (`super_admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tables_tbl`
--
ALTER TABLE `tables_tbl`
  ADD PRIMARY KEY (`table_id`),
  ADD KEY `fk_tables_restaurant` (`restaurant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `cart_tbl`
--
ALTER TABLE `cart_tbl`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT for table `category_tbl`
--
ALTER TABLE `category_tbl`
  MODIFY `category_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `countries_tbl`
--
ALTER TABLE `countries_tbl`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `currency_types_tbl`
--
ALTER TABLE `currency_types_tbl`
  MODIFY `currency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `food_items_tbl`
--
ALTER TABLE `food_items_tbl`
  MODIFY `food_items_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `housekeeping_tbl`
--
ALTER TABLE `housekeeping_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `menu_tbl`
--
ALTER TABLE `menu_tbl`
  MODIFY `menu_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `packages_tbl`
--
ALTER TABLE `packages_tbl`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `privileges_tbl`
--
ALTER TABLE `privileges_tbl`
  MODIFY `privilege_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `promo_codes_tbl`
--
ALTER TABLE `promo_codes_tbl`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promo_code_usage_tbl`
--
ALTER TABLE `promo_code_usage_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `restaurant_tbl`
--
ALTER TABLE `restaurant_tbl`
  MODIFY `restaurant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rooms_tbl`
--
ALTER TABLE `rooms_tbl`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `room_cart_tbl`
--
ALTER TABLE `room_cart_tbl`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `room_orders_tbl`
--
ALTER TABLE `room_orders_tbl`
  MODIFY `room_order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `special_offers_tbl`
--
ALTER TABLE `special_offers_tbl`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `subcategory_tbl`
--
ALTER TABLE `subcategory_tbl`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `super_admin_tbl`
--
ALTER TABLE `super_admin_tbl`
  MODIFY `super_admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tables_tbl`
--
ALTER TABLE `tables_tbl`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1394;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `active_sessions`
--
ALTER TABLE `active_sessions`
  ADD CONSTRAINT `restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD CONSTRAINT `admin_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_tbl`
--
ALTER TABLE `cart_tbl`
  ADD CONSTRAINT `cart_tbl_ibfk_2` FOREIGN KEY (`food_item_id`) REFERENCES `food_items_tbl` (`food_items_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_tbl_ibfk_3` FOREIGN KEY (`session_id`) REFERENCES `active_sessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_tbl`
--
ALTER TABLE `category_tbl`
  ADD CONSTRAINT `category_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`),
  ADD CONSTRAINT `category_tbl_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`),
  ADD CONSTRAINT `category_tbl_ibfk_3` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`),
  ADD CONSTRAINT `fk_menu_id` FOREIGN KEY (`menu_id`) REFERENCES `menu_tbl` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `food_items_tbl`
--
ALTER TABLE `food_items_tbl`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category_tbl` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_food_items_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`),
  ADD CONSTRAINT `food_items_tbl_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory_tbl` (`subcategory_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `housekeeping_tbl`
--
ALTER TABLE `housekeeping_tbl`
  ADD CONSTRAINT `housekeeping_tbl_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`);

--
-- Constraints for table `menu_tbl`
--
ALTER TABLE `menu_tbl`
  ADD CONSTRAINT `fk_menu_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`);

--
-- Constraints for table `old_orders_tbl`
--
ALTER TABLE `old_orders_tbl`
  ADD CONSTRAINT `fk_old_orders_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  ADD CONSTRAINT `fk_orders_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_tbl_ibfk_1` FOREIGN KEY (`food_item_id`) REFERENCES `food_items_tbl` (`food_items_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `package_privileges_tbl`
--
ALTER TABLE `package_privileges_tbl`
  ADD CONSTRAINT `package_privileges_tbl_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packages_tbl` (`package_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `package_privileges_tbl_ibfk_2` FOREIGN KEY (`privilege_id`) REFERENCES `privileges_tbl` (`privilege_id`) ON DELETE CASCADE;

--
-- Constraints for table `promo_code_usage_tbl`
--
ALTER TABLE `promo_code_usage_tbl`
  ADD CONSTRAINT `promo_code_usage_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`),
  ADD CONSTRAINT `promo_code_usage_tbl_ibfk_2` FOREIGN KEY (`promo_code`) REFERENCES `promo_codes_tbl` (`promo_code`);

--
-- Constraints for table `restaurant_privileges_tbl`
--
ALTER TABLE `restaurant_privileges_tbl`
  ADD CONSTRAINT `restaurant_privileges_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`),
  ADD CONSTRAINT `restaurant_privileges_tbl_ibfk_2` FOREIGN KEY (`privilege_id`) REFERENCES `privileges_tbl` (`privilege_id`);

--
-- Constraints for table `restaurant_tbl`
--
ALTER TABLE `restaurant_tbl`
  ADD CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `countries_tbl` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_currency` FOREIGN KEY (`currency_id`) REFERENCES `currency_types_tbl` (`currency_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_package` FOREIGN KEY (`package_id`) REFERENCES `packages_tbl` (`package_id`);

--
-- Constraints for table `rooms_tbl`
--
ALTER TABLE `rooms_tbl`
  ADD CONSTRAINT `rooms_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `room_active_sessions`
--
ALTER TABLE `room_active_sessions`
  ADD CONSTRAINT `room_active_sessions_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`);

--
-- Constraints for table `room_cart_tbl`
--
ALTER TABLE `room_cart_tbl`
  ADD CONSTRAINT `room_cart_tbl_ibfk_1` FOREIGN KEY (`food_item_id`) REFERENCES `food_items_tbl` (`food_items_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `room_cart_tbl_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `room_active_sessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `room_cart_tbl_ibfk_3` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `room_orders_tbl`
--
ALTER TABLE `room_orders_tbl`
  ADD CONSTRAINT `room_orders_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `special_offers_tbl`
--
ALTER TABLE `special_offers_tbl`
  ADD CONSTRAINT `special_offers_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`);

--
-- Constraints for table `subcategory_tbl`
--
ALTER TABLE `subcategory_tbl`
  ADD CONSTRAINT `fk_subcategory_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subcategory_tbl_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `category_tbl` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tables_tbl`
--
ALTER TABLE `tables_tbl`
  ADD CONSTRAINT `fk_tables_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
