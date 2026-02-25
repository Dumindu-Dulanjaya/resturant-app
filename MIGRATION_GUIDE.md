# Restaurant Management System - React + NestJS Migration

## Project Structure

This project is a modernized version of the PHP restaurant management system, now using:
- **Frontend**: React 19 + React Router + Zustand + Bootstrap 5.2.3
- **Backend**: NestJS + TypeORM + JWT Authentication
- **Database**: MySQL (shared with original PHP project)

## Current Status

### ✅ Completed
1. **Authentication System**
   - Login with email/password
   - JWT token-based authentication
   - bcrypt password compatibility (PHP $2y$ format)
   - Super Admin and Admin role support
   - Protected routes

2. **Dashboard**
   - Stats cards (Orders, Revenue, Pending, Menus)
   - Recent orders table
   - Quick actions
   - System status

3. **Menus Page**
   - Display all menus in card format
   - Edit/Delete functionality (UI ready)
   - Matches PHP project design
   - Uses same images from PHP project

4. **Assets Integration**
   - Copied all assets from `menus/assets` to `restaurant-frontend/public/assets`
   - Images, CSS, JS from PHP project available

### 🚧 In Progress
- Menu Management APIs (Create, Read, Update, Delete)
- Categories/Subcategories modules
- Food Items management
- Kitchen Orders system
- QR Code generation

## Running the Application

### Prerequisites
- Node.js v23.8.0+
- MySQL (WAMP running)
- PHP 8.2.13 (for legacy system)

### Start Backend (NestJS) - Port 3000
```powershell
cd restaurant-backend-nestjs
npm run start:dev
```

### Start Frontend (React) - Port 3001
```powershell
cd restaurant-frontend
npm start
```

### Start Legacy PHP - Port 8000 (Optional)
```powershell
cd menus
php -S localhost:8000
```

## Access URLs
- **React Frontend**: http://localhost:3001
- **NestJS API**: http://localhost:3000/api
- **PHP Legacy**: http://localhost:8000

## Login Credentials
**Super Admin:**
- Email: `info@knowebsolutions.com`
- Password: `Knoweb@123`

## Key Features Matching PHP Design

### Sidebar Navigation
- Dashboard
- All Menus
- Menus Section (Add Menu, Add Category, Add Subcategory, Add Food Items)
- QR Codes (Table QR, Room QR)
- Kitchen (Orders, Old Orders)
- Housekeeping (Messages, Room QR)
- Reports (Daily, Monthly, Sales)
- Settings (Profile, Change Password)

### Design Consistency
- Bootstrap 5.2.3 (same version as PHP)
- Font Awesome icons (same icons)
- SweetAlert2 for notifications
- Same color scheme and gradients
- Responsive layout

## Image Assets
All images from the PHP project are available at:
- `/assets/imgs/menu-img/` - Menu images
- `/assets/imgs/category-img/` - Category images
- `/assets/imgs/item-img/` - Food item images
- `/assets/imgs/logo/` - Restaurant logos
- `/assets/imgs/offers/` - Special offers

**Note**: When PHP project adds new images, copy them to React's public folder:
```powershell
Copy-Item -Recurse -Force "menus\assets" "restaurant-frontend\public\assets"
```

## Database Tables Used
- `super_admin_tbl` - Super admin accounts
- `admin_tbl` - Restaurant admin accounts
- `restaurant_tbl` - Restaurant details
- `menu_tbl` - Menus
- `category_tbl` - Menu categories
- `subcategory_tbl` - Category subcategories
- `food_items_tbl` - Food items
- `orders_tbl` - Table orders
- `room_orders_tbl` - Room service orders
- `housekeeping_tbl` - Housekeeping requests
- `qr_codes_tbl` - Generated QR codes

## Next Steps
1. Complete Menu Management APIs
2. Add Categories/Subcategories pages
3. Implement Food Items CRUD
4. Build Kitchen Orders interface
5. Create QR Code generation module
6. Add Housekeeping management
7. Implement Daily/Monthly reports
8. Add file upload functionality

## Notes
- Both PHP and React apps can run simultaneously
- They share the same MySQL database
- Gradual migration: Convert module by module
- Keep UI/UX identical to PHP version
