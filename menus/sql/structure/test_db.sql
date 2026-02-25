-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2024 at 08:19 AM
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
-- Database: `test_db`
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

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

CREATE TABLE `admin_tbl` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'admin',
  `restaurant_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`admin_id`, `email`, `password`, `role`, `restaurant_id`) VALUES
(1, 'admin@angel.com', '$2y$10$xFzlVOoc9Ji2R3QRwfFJE.Rp/TGgyWjCZFMBwkqBMAq/YMmegClj2', 'admin', 1),
(2, 'steward@angel.com', '$2y$10$AQ4yBI8wx9VqupHtv6JbneBOii3vM7477iP4uZBRKtVGSDbcqaJZO', 'steward', 1),
(3, 'clean@angel.com', '$2y$10$vpkHcFiDwusUUp9c5meUWubo6ihDZHZ0yCTObrmFUjuwMtUcgfxU6', 'housekeeper', 1),
(4, 'admin@example.com', '$2y$10$OdmnydKQVGkew4b/ecs0/.LR41ebcqq14jfyfQZvvRnXctLdZI/me', 'admin', 2),
(6, 'steward@example.com', '$2y$10$8Y4SaBLlZRjdQvL0ANEZbOkKozLLfPt18HF2dxBA9RyjLbBCdCCSi', 'steward', 2);

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

-- --------------------------------------------------------

--
-- Table structure for table `currency_types_tbl`
--

CREATE TABLE `currency_types_tbl` (
  `currency_id` int(11) NOT NULL,
  `currency` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `currency_types_tbl`
--

INSERT INTO `currency_types_tbl` (`currency_id`, `currency`) VALUES
(1, 'LKR');

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
(1, 3),
(2, 1);

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
  `subscription_expiry_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(65) NOT NULL,
  `opening_time` time NOT NULL,
  `closing_time` time NOT NULL,
  `logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant_tbl`
--

INSERT INTO `restaurant_tbl` (`restaurant_id`, `restaurant_name`, `address`, `contact_number`, `subscription_status`, `subscription_expiry_date`, `created_at`, `email`, `opening_time`, `closing_time`, `logo`) VALUES
(1, 'SeaSpray Café', 'Baddegama, Galle, Srilanaka', '0715533545', 'active', '2025-08-23', '2024-08-11 04:53:50', 'contact@seapray.com', '08:00:00', '20:00:00', '../assets/imgs/logo/logo.png'),
(2, 'Example Restaurant', '123 Example Street, City, Country', '0764545444', 'active', '2025-08-11', '2024-08-11 04:53:50', 'info@example.com', '08:00:00', '21:00:00', '../assets/imgs/logo/66da9395af277.png');

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
-- Table structure for table `subscriptions_tbl`
--

CREATE TABLE `subscriptions_tbl` (
  `subscription_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `subscription_type` varchar(255) DEFAULT NULL,
  `status` enum('active','expired','inactive') DEFAULT 'inactive',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
(1, 'Super Admin', 'info@knowebsolutions.com', '$2y$10$nYJE1kR9zBkhD5gTgSavguK974nlE2HSWUTApFxZasO.PdohKOsAe', '2024-09-23 06:11:35');

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
-- Indexes for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `food_item_id` (`food_item_id`),
  ADD KEY `table_number` (`table_number`),
  ADD KEY `fk_orders_restaurant` (`restaurant_id`);

--
-- Indexes for table `privileges_tbl`
--
ALTER TABLE `privileges_tbl`
  ADD PRIMARY KEY (`privilege_id`),
  ADD UNIQUE KEY `privilege_name` (`privilege_name`);

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
  ADD PRIMARY KEY (`restaurant_id`);

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
-- Indexes for table `subscriptions_tbl`
--
ALTER TABLE `subscriptions_tbl`
  ADD PRIMARY KEY (`subscription_id`),
  ADD KEY `admin_id` (`admin_id`);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cart_tbl`
--
ALTER TABLE `cart_tbl`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT for table `category_tbl`
--
ALTER TABLE `category_tbl`
  MODIFY `category_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `currency_types_tbl`
--
ALTER TABLE `currency_types_tbl`
  MODIFY `currency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `food_items_tbl`
--
ALTER TABLE `food_items_tbl`
  MODIFY `food_items_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `housekeeping_tbl`
--
ALTER TABLE `housekeeping_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `menu_tbl`
--
ALTER TABLE `menu_tbl`
  MODIFY `menu_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `privileges_tbl`
--
ALTER TABLE `privileges_tbl`
  MODIFY `privilege_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `restaurant_tbl`
--
ALTER TABLE `restaurant_tbl`
  MODIFY `restaurant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rooms_tbl`
--
ALTER TABLE `rooms_tbl`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `room_cart_tbl`
--
ALTER TABLE `room_cart_tbl`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `room_orders_tbl`
--
ALTER TABLE `room_orders_tbl`
  MODIFY `room_order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
-- AUTO_INCREMENT for table `subscriptions_tbl`
--
ALTER TABLE `subscriptions_tbl`
  MODIFY `subscription_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `super_admin_tbl`
--
ALTER TABLE `super_admin_tbl`
  MODIFY `super_admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tables_tbl`
--
ALTER TABLE `tables_tbl`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1362;

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
-- Constraints for table `currency_types_tbl`
--
ALTER TABLE `currency_types_tbl`
  ADD CONSTRAINT `currency_types_tbl_ibfk_1` FOREIGN KEY (`currency_id`) REFERENCES `currency_types_tbl` (`currency_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `food_items_tbl`
--
ALTER TABLE `food_items_tbl`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category_tbl` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_currency` FOREIGN KEY (`currency_id`) REFERENCES `currency_types_tbl` (`currency_id`),
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
-- Constraints for table `orders_tbl`
--
ALTER TABLE `orders_tbl`
  ADD CONSTRAINT `fk_orders_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_tbl_ibfk_1` FOREIGN KEY (`food_item_id`) REFERENCES `food_items_tbl` (`food_items_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `restaurant_privileges_tbl`
--
ALTER TABLE `restaurant_privileges_tbl`
  ADD CONSTRAINT `restaurant_privileges_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`),
  ADD CONSTRAINT `restaurant_privileges_tbl_ibfk_2` FOREIGN KEY (`privilege_id`) REFERENCES `privileges_tbl` (`privilege_id`);

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
-- Constraints for table `subscriptions_tbl`
--
ALTER TABLE `subscriptions_tbl`
  ADD CONSTRAINT `subscriptions_tbl_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin_tbl` (`admin_id`);

--
-- Constraints for table `tables_tbl`
--
ALTER TABLE `tables_tbl`
  ADD CONSTRAINT `fk_tables_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
