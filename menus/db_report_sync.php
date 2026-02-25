<?php
/**
 * This file handles the synchronization of completed orders to the reports_tbl
 * It should be called after an order is marked as completed
 */

// Start the session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include_once 'db.php';

/**
 * Function to insert a completed order into reports_tbl
 * @param mysqli $conn - Database connection
 * @param int $order_id - Order ID
 * @param int $restaurant_id - Restaurant ID
 * @param string $table_number - Table or Room number
 * @param bool $is_room_order - True if room order, false if table order
 */
function addOrderToReport($conn, $order_id, $restaurant_id, $table_number = '', $is_room_order = false) {
    try {
        if ($is_room_order) {
            // For room orders
            $query = "SELECT 
                        ro.room_order_id,
                        ro.room_number,
                        ro.food_item_id,
                        ro.quantity,
                        ro.order_date,
                        ro.total_price,
                        ro.customer_name,
                        f.food_items_name,
                        cat.category_name,
                        (ro.total_price / ro.quantity) as unit_price
                    FROM room_orders_tbl ro
                    JOIN food_items_tbl f ON ro.food_item_id = f.food_items_id
                    JOIN category_tbl cat ON f.category_id = cat.category_id
                    WHERE ro.room_order_id = ? AND ro.restaurant_id = ?";
            
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ii", $order_id, $restaurant_id);
        } else {
            // For table orders
            $query = "SELECT 
                        o.order_id,
                        o.table_number,
                        o.food_item_id,
                        o.quantity,
                        o.order_date,
                        o.total_price,
                        o.customer_name,
                        o.payment_method,
                        f.food_items_name,
                        cat.category_name,
                        (o.total_price / o.quantity) as unit_price
                    FROM orders_tbl o
                    JOIN food_items_tbl f ON o.food_item_id = f.food_items_id
                    JOIN category_tbl cat ON f.category_id = cat.category_id
                    WHERE o.order_id = ? AND o.restaurant_id = ?";
            
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ii", $order_id, $restaurant_id);
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $order_data = $result->fetch_assoc();
            $stmt->close();
            
            // Extract sales date and time
            $order_datetime = new DateTime($order_data['order_date']);
            $sales_date = $order_datetime->format('Y-m-d');
            $sales_time = $order_datetime->format('H:i:s');
            
            // Check if record already exists in reports_tbl (using order_id for better duplicate detection)
            $check_query = "SELECT report_id FROM reports_tbl 
                           WHERE restaurant_id = ? AND order_id = ? AND is_room_order = ?";
            $check_stmt = $conn->prepare($check_query);
            $is_room = $is_room_order ? 1 : 0;
            $check_stmt->bind_param("iii", $restaurant_id, $order_id, $is_room);
            $check_stmt->execute();
            $check_result = $check_stmt->get_result();
            
            if ($check_result->num_rows == 0) {
                // Insert into reports_tbl
                $insert_query = "INSERT INTO reports_tbl 
                                (restaurant_id, order_id, is_room_order, sales_date, sales_time, sales_item_id, food_items_name, 
                                 category_name, quantity, unit_price, total_price, payment_method, 
                                 customer_name, order_type, table_or_room_number)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
                $insert_stmt = $conn->prepare($insert_query);
                
                $order_type = $is_room_order ? 'room' : 'table';
                $table_or_room = $is_room_order ? $order_data['room_number'] : $order_data['table_number'];
                $payment_method = $is_room_order ? 'Room Order' : $order_data['payment_method'];
                $is_room_value = $is_room_order ? 1 : 0;
                
                $insert_stmt->bind_param(
                    "iiississiiddsss",
                    $restaurant_id,
                    $order_id,
                    $is_room_value,
                    $sales_date,
                    $sales_time,
                    $order_data['food_item_id'],
                    $order_data['food_items_name'],
                    $order_data['category_name'],
                    $order_data['quantity'],
                    $order_data['unit_price'],
                    $order_data['total_price'],
                    $payment_method,
                    $order_data['customer_name'],
                    $order_type,
                    $table_or_room
                );
                
                if ($insert_stmt->execute()) {
                    return ['success' => true, 'message' => 'Order added to reports'];
                } else {
                    return ['success' => false, 'message' => 'Error inserting into reports: ' . $insert_stmt->error];
                }
            } else {
                return ['success' => true, 'message' => 'Order already exists in reports'];
            }
        } else {
            return ['success' => false, 'message' => 'Order not found'];
        }
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

/**
 * Function to sync all completed orders from the last N days
 * Call this periodically or manually to ensure all completed orders are in reports_tbl
 */
function syncCompletedOrders($conn, $restaurant_id, $days = 30) {
    try {
        // Get all completed table orders from the last N days that aren't in reports_tbl
        $query = "SELECT o.order_id, o.restaurant_id, o.table_number, 0 as is_room_order
                 FROM orders_tbl o
                 WHERE o.restaurant_id = ? 
                 AND o.completed = 1 
                 AND DATE(o.order_date) >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
                 AND o.order_id NOT IN (
                    SELECT DISTINCT CONCAT('table_', food_items_name, sales_date, sales_time) 
                    FROM reports_tbl 
                    WHERE restaurant_id = ? AND order_type = 'table'
                 )
                 UNION
                 SELECT ro.room_order_id, ro.restaurant_id, ro.room_number, 1 as is_room_order
                 FROM room_orders_tbl ro
                 WHERE ro.restaurant_id = ? 
                 AND ro.completed = 1 
                 AND DATE(ro.order_date) >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
                 AND ro.room_order_id NOT IN (
                    SELECT DISTINCT CONCAT('room_', food_items_name, sales_date, sales_time) 
                    FROM reports_tbl 
                    WHERE restaurant_id = ? AND order_type = 'room'
                 )";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("iiiii", $restaurant_id, $days, $restaurant_id, $restaurant_id, $days, $restaurant_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $synced_count = 0;
        while ($row = $result->fetch_assoc()) {
            $res = addOrderToReport($conn, $row['order_id'], $row['restaurant_id'], $row['table_number'], $row['is_room_order']);
            if ($res['success']) {
                $synced_count++;
            }
        }
        
        return ['success' => true, 'synced' => $synced_count];
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Sync error: ' . $e->getMessage()];
    }
}

?>
