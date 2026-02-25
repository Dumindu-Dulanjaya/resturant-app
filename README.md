# StayEaseInn

StayEaseInn is a comprehensive restaurant management software designed to simplify operations for tourist restaurants and hotels. With a focus on QR menu systems and efficient housekeeping management, StayEaseInn offers a seamless experience for both restaurant staff and customers. The software is equipped with a wide range of features that streamline order management, housekeeping requests, and subscription-based access control.

## Features

### QR Menu System
- Generate QR codes for menus that customers can scan and view.
- Manage categories, subcategories, and food items with ease.
- Enable customers to place orders directly from their smartphones.

### Housekeeping Management
- Assign unique QR codes to rooms for easy housekeeping access.
- Allow users to submit housekeeping requests by scanning room-specific QR codes.
- Display all requests in the admin dashboard for efficient handling.

### Order Management
- Real-time notification system for stewards when a new order is placed.
- Filter orders by table number for easy tracking.
- Options for stewards to confirm or reject orders, with rejected orders automatically removed.

### Special Offers
- Create and manage special offers for customers.
- Display offers dynamically on the QR menu system.
- Schedule offers for specific times and dates to boost sales during off-peak hours.

### Super Admin Dashboard
- Manage subscriptions and privileges for restaurants.
- View and update subscription status, privileges, and expiry dates.
- Assign specific features, such as QR menu and QR housekeeping systems, through privileges.

### Security and Access Control
- Role-based access control with privileges managed via `privileges_tbl`.
- Secure login system with session management.
- Subscription-based access to features using the `restaurant_tbl` and `restaurant_privileges_tbl`.


## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: PHP 
- **Database**: MySQL
- **Libraries**: SweetAlert for notifications

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Knoweb/restaurant-app.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd restaurant-app
   ```

3. **Import the database:**
   Import the SQL file located in the `menus/sql/` folder into your MySQL database.

4. **Update database credentials:**
   Configure your `.env` file with your database details.

5. **Set up QR code directory:**
   Ensure the `qrcodes` folder is writable for storing generated QR code images.

6. **Run the application:**
   Access the application via `http://localhost/restaurant-app` in your web browser.

## Login Credentials

### Super Admin Account
```bash
Email: info@knowebsolutions.com  
Password: Knoweb@123
```

### Test Account
```bash
Email: contact@seaspray.com
Password: admin
```
---

StayEaseInn simplifies restaurant management, improves customer experience, and streamlines housekeeping operations. Start managing your restaurant and hotel with efficiency today!
