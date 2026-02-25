<?php
session_start();
header('Content-Type: application/json');
include_once '../db.php'; // Adjust path as per your project structure

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    $session_id = session_id(); // Get current session ID
    $restaurant_id = $_SESSION['restaurant_id']; // Get restaurant ID from session

    switch ($action) {
        case 'add_to_cart':
            // Check if required POST parameters are set
            if (isset($_POST['table_number'], $_POST['food_item_id'], $_POST['quantity'])) {
                $table_number = $_POST['table_number'];
                $food_item_id = $_POST['food_item_id'];
                $quantity = $_POST['quantity'];

                // Verify the restaurant ID of the item
                $sql_item_check = "SELECT restaurant_id FROM food_items_tbl WHERE food_items_id = ?";
                $stmt_item_check = $conn->prepare($sql_item_check);
                $stmt_item_check->bind_param("i", $food_item_id);
                $stmt_item_check->execute();
                $result_item_check = $stmt_item_check->get_result();

                if ($result_item_check->num_rows > 0) {
                    $item_row = $result_item_check->fetch_assoc();
                    $item_restaurant_id = $item_row['restaurant_id'];

                    if ($item_restaurant_id != $restaurant_id) {
                        echo json_encode(['status' => 'error', 'message' => 'Item does not belong to the current restaurant']);
                        exit();
                    }

                    // Check if the item already exists in the cart for the same table and session
                    $sql_check = "SELECT * FROM cart_tbl WHERE table_number = ? AND food_item_id = ? AND session_id = ? AND restaurant_id = ?";
                    $stmt_check = $conn->prepare($sql_check);
                    $stmt_check->bind_param("iiis", $table_number, $food_item_id, $session_id, $restaurant_id);
                    $stmt_check->execute();
                    $result_check = $stmt_check->get_result();

                    // If item exists, update the quantity
                    if ($result_check->num_rows > 0) {
                        $sql_update = "UPDATE cart_tbl SET quantity = quantity + ? WHERE table_number = ? AND food_item_id = ? AND session_id = ? AND restaurant_id = ?";
                        $stmt_update = $conn->prepare($sql_update);
                        $stmt_update->bind_param("iiiss", $quantity, $table_number, $food_item_id, $session_id, $restaurant_id); // Updated binding
                        $stmt_update->execute();
                        $stmt_update->close();
                    } else {
                        // If item does not exist, insert a new record
                        $sql_insert = "INSERT INTO cart_tbl (table_number, food_item_id, quantity, session_id, restaurant_id) VALUES (?, ?, ?, ?, ?)";
                        $stmt_insert = $conn->prepare($sql_insert);
                        $stmt_insert->bind_param("iiiss", $table_number, $food_item_id, $quantity, $session_id, $restaurant_id); // Updated binding
                        $stmt_insert->execute();
                        $stmt_insert->close();
                    }

                    $stmt_check->close();

                    // Get the total count of items in the cart for the current session and restaurant
                    $sql_cart_count = "SELECT COUNT(*) AS cart_count FROM cart_tbl WHERE session_id = ? AND restaurant_id = ?";
                    $stmt_cart_count = $conn->prepare($sql_cart_count);
                    $stmt_cart_count->bind_param("ss", $session_id, $restaurant_id);
                    $stmt_cart_count->execute();
                    $result_cart_count = $stmt_cart_count->get_result();
                    $row_cart_count = $result_cart_count->fetch_assoc();
                    $cart_count = $row_cart_count['cart_count'];

                    $stmt_cart_count->close();

                    // Return success response with cart count
                    echo json_encode(['status' => 'success', 'cart_count' => $cart_count]);
                    exit();
                } else {
                    // Return error response if item is not found
                    echo json_encode(['status' => 'error', 'message' => 'Item not found']);
                    exit();
                }
            } else {
                // Return error response if required parameters are missing
                echo json_encode(['status' => 'error', 'message' => 'Missing parameters for add_to_cart']);
                exit();
            }
            break;

        case 'update_cart':
            // Check if required POST parameters are set
            if (isset($_POST['table_number'], $_POST['food_item_id'], $_POST['quantity'])) {
                $table_number = $_POST['table_number'];
                $food_item_id = $_POST['food_item_id'];
                $quantity = $_POST['quantity'];

                // Update the quantity of the specified item in the cart
                $sql_update = "UPDATE cart_tbl SET quantity = ? WHERE table_number = ? AND food_item_id = ? AND session_id = ? AND restaurant_id = ?";
                $stmt_update = $conn->prepare($sql_update);
                $stmt_update->bind_param("iiiss", $quantity, $table_number, $food_item_id, $session_id, $restaurant_id); // Updated binding
                $stmt_update->execute();
                $stmt_update->close();

                // Return success response
                echo json_encode(['status' => 'success']);
                exit();
            } else {
                // Return error response if required parameters are missing
                echo json_encode(['status' => 'error', 'message' => 'Missing parameters for update_cart']);
                exit();
            }
            break;

        case 'remove_from_cart':
            // Check if required POST parameters are set
            if (isset($_POST['table_number'], $_POST['food_item_id'])) {
                $table_number = $_POST['table_number'];
                $food_item_id = $_POST['food_item_id'];

                // Delete the specified item from the cart
                $sql_delete = "DELETE FROM cart_tbl WHERE table_number = ? AND food_item_id = ? AND session_id = ? AND restaurant_id = ?";
                $stmt_delete = $conn->prepare($sql_delete);
                $stmt_delete->bind_param("iiis", $table_number, $food_item_id, $session_id, $restaurant_id); // Updated binding
                $stmt_delete->execute();
                $stmt_delete->close();

                // Return success response
                echo json_encode(['status' => 'success']);
                exit();
            } else {
                // Return error response if required parameters are missing
                echo json_encode(['status' => 'error', 'message' => 'Missing parameters for remove_from_cart']);
                exit();
            }
            break;

        default:
            // Return error response if the action is invalid
            echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
            exit();
    }
} else {
    // Return error response if the request method is not POST or action is not set
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit();
}
