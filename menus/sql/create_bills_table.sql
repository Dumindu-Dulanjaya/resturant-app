-- Create bills_tbl if it doesn't exist
CREATE TABLE IF NOT EXISTS `bills_tbl` (
  `bill_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `bill_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_number` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `table_number` (`table_number`),
  CONSTRAINT `bills_tbl_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant_tbl` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
