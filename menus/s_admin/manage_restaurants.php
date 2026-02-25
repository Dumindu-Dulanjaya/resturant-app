<?php
session_start();

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'super_admin') {
    // Redirect to the admin dashboard if the user is not a super admin
    header('Location: ../admin/index.php');
    exit();
}

include_once '../db.php';

// Update subscription status to 'inactive' for expired subscriptions
$update_sql = "UPDATE restaurant_tbl 
               SET subscription_status = 'inactive' 
               WHERE subscription_expiry_date < CURDATE()";
$conn->query($update_sql);

// Fetch all restaurants
$sql = "SELECT r.*, GROUP_CONCAT(p.privilege_name SEPARATOR ', ') AS privileges
        FROM restaurant_tbl r
        LEFT JOIN restaurant_privileges_tbl rp ON r.restaurant_id = rp.restaurant_id
        LEFT JOIN privileges_tbl p ON rp.privilege_id = p.privilege_id
        GROUP BY r.restaurant_id";
$restaurants = $conn->query($sql);

if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];

    // Delete restaurant and associated privileges
    $conn->query("DELETE FROM restaurant_privileges_tbl WHERE restaurant_id = $delete_id");
    $conn->query("DELETE FROM restaurant_tbl WHERE restaurant_id = $delete_id");

    echo "<script>
            setTimeout(function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The restaurant has been deleted.',
                    confirmButtonText: 'OK'
                }).then(function() {
                    window.location = 'manage_restaurants.php';
                });
            }, 100);
          </script>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Restaurants</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <!-- SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <style>
        .privileges-list {
            list-style-type: none;
            padding: 0;
        }

        .privileges-list li {
            background: #f8f9fa;
            margin: 2px 0;
            padding: 5px;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container mt-5">
        <h2 class="mb-4">Manage Hotels</h2>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Hotel Name</th>
                    <th>Address</th>
                    <th>Contact Number</th>
                    <th>Subscription Status</th>
                    <th>Subscription Expiry Date</th>
                    <th>Privileges</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $restaurants->fetch_assoc()) : ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['restaurant_name']); ?></td>
                        <td><?php echo htmlspecialchars($row['address']); ?></td>
                        <td><?php echo htmlspecialchars($row['contact_number']); ?></td>
                        <td><?php echo htmlspecialchars($row['subscription_status']); ?></td>
                        <td><?php echo htmlspecialchars($row['subscription_expiry_date']); ?></td>
                        <td>
                            <ul class="privileges-list">
                                <?php
                                $privileges = explode(", ", $row['privileges'] ?? '');
                                foreach ($privileges as $privilege) {
                                    if (!empty($privilege)) {
                                        echo '<li>' . htmlspecialchars($privilege) . '</li>';
                                    }
                                }
                                ?>
                            </ul>
                        </td>
                        <td>
                            <button class="btn btn-warning btn-sm"
                                onclick="openEditModal(<?php echo $row['restaurant_id']; ?>)">Edit</button>
                            <button class="btn btn-danger btn-sm"
                                onclick="confirmDelete(<?php echo $row['restaurant_id']; ?>)">Delete</button>
                            <a href="user_profile.php?restaurant_id=<?php echo $row['restaurant_id']; ?>"
                                class="btn btn-primary btn-sm">
                                View Profile
                            </a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>

    <!-- Edit Restaurant Modal -->
    <div class="modal fade" id="editRestaurantModal" tabindex="-1" aria-labelledby="editRestaurantModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editRestaurantModalLabel">Edit Hotel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editRestaurantForm">
                        <input type="hidden" id="restaurant_id" name="restaurant_id">
                        <div class="mb-3">
                            <label for="subscription_status" class="form-label">Subscription Status</label>
                            <select id="subscription_status" name="subscription_status" class="form-control">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="subscription_expiry_date" class="form-label">Subscription Expiry Date</label>
                            <input type="date" id="subscription_expiry_date" name="subscription_expiry_date" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="privileges" class="form-label">Privileges</label>
                            <div id="privilegesContainer"></div>
                        </div>
                        <button type="button" class="btn btn-success" onclick="saveChanges()">Save Changes</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        function openEditModal(restaurantId) {
            // Fetch restaurant data via AJAX
            fetch('edit_restaurant_ajax.php?id=' + restaurantId)
                .then(response => response.json())
                .then(data => {
                    // Populate the subscription expiry date input
                    const expiryDate = new Date(data.subscription_expiry_date);
                    const formattedDate = expiryDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

                    // Set the formatted date to the input field
                    document.getElementById('subscription_expiry_date').value = formattedDate;

                    // Other fields
                    document.getElementById('restaurant_id').value = data.restaurant_id;
                    document.getElementById('subscription_status').value = data.subscription_status;

                    // Clear the privileges container and populate privileges
                    const privilegesContainer = document.getElementById('privilegesContainer');
                    privilegesContainer.innerHTML = '';
                    data.all_privileges.forEach(privilege => {
                        const isChecked = data.restaurant_privileges.includes(privilege.privilege_id);
                        const privilegeElement = `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="privileges[]"
                            id="privilege_${privilege.privilege_id}" value="${privilege.privilege_id}"
                            ${isChecked ? 'checked' : ''}>
                        <label class="form-check-label" for="privilege_${privilege.privilege_id}">
                            ${privilege.privilege_name}
                        </label>
                    </div>
                `;
                        privilegesContainer.insertAdjacentHTML('beforeend', privilegeElement);
                    });

                    // Show the modal
                    const editModal = new bootstrap.Modal(document.getElementById('editRestaurantModal'));
                    editModal.show();
                })
                .catch(error => console.error('Error fetching restaurant data:', error));
        }


        function saveChanges() {
            const form = document.getElementById('editRestaurantForm');
            const formData = new FormData(form);

            fetch('edit_restaurant_ajax.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            title: 'Changes saved successfully!',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false, // This hides the OK button
                            willClose: () => {
                                window.location.href = 'index.php'; // Update to redirect to this page
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to save changes. Please try again.',
                        });
                    }
                })
                .catch(error => console.error('Error saving changes:', error));
        }

        function confirmDelete(restaurantId) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'manage_restaurants.php?delete_id=' + restaurantId;
                }
            });
        }
    </script>
</body>

</html>