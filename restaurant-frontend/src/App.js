import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Menus from './pages/Menus';
import Categories from './pages/Categories';
import Subcategories from './pages/Subcategories';
import FoodItems from './pages/FoodItems';
import KitchenKDS from './pages/KitchenKDS';
import CustomerQROrder from './pages/CustomerQROrder';
import GenerateQRCodes from './pages/GenerateQRCodes';
import SalesReports from './pages/SalesReports';
import DailyReport from './pages/DailyReport';
import MonthlyReport from './pages/MonthlyReport';
import OrderManagement from './pages/OrderManagement';
import RestaurantSettings from './pages/RestaurantSettings';
import HousekeepingMessages from './pages/HousekeepingMessages';
import RoomQRCodes from './pages/RoomQRCodes';
import GenerateRoomQRCodes from './pages/GenerateRoomQRCodes';
import GuestRequestForm from './pages/GuestRequestForm';
import AddOffer from './pages/AddOffer';
import EditOffer from './pages/EditOffer';
import Offers from './pages/Offers';
import ManageRestaurants from './pages/ManageRestaurants';
import AddRestaurant from './pages/AddRestaurant';
import AddAdmin from './pages/AddAdmin';
import RestaurantProfile from './pages/RestaurantProfile';

import PrivateRoute from './components/auth/PrivateRoute';
import RoleRoute from './components/auth/RoleRoute';
import FeatureRoute from './components/auth/FeatureRoute';
import RoleBasedRedirect from './components/auth/RoleBasedRedirect';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/qr/:tableKey" element={<CustomerQROrder />} />
        <Route path="/room/:roomKey" element={<GuestRequestForm />} />

        {/* Default Authenticated Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleRoute
                allowedRoles={[
                  'admin',
                  'super_admin',
                  'kitchen',
                  'steward',
                  'housekeeper'
                ]}
              >
                <Dashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Menu Management */}
        <Route
          path="/menus/all"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <Menus />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/menus/categories"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <Categories />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/menus/subcategories"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <Subcategories />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/menus/food-items"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <FoodItems />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Offers */}
        <Route
          path="/offers/add"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <AddOffer />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/offers/edit/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <EditOffer />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/menus/offers"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <Offers />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Kitchen */}
        <Route
          path="/kitchen/kds"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen', 'steward']}>
                <FeatureRoute requiredFeature="KDS">
                  <KitchenKDS />
                </FeatureRoute>
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* QR Codes */}
        <Route
          path="/qr-codes/generate"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <GenerateQRCodes />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Housekeeping */}
        <Route
          path="/housekeeping/messages"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin', 'housekeeper']}>
                <FeatureRoute requiredFeature="HOUSEKEEPING">
                  <HousekeepingMessages />
                </FeatureRoute>
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/housekeeping/room-qr"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <FeatureRoute requiredFeature="HOUSEKEEPING">
                  <RoomQRCodes />
                </FeatureRoute>
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/housekeeping/room-qr/generate"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <FeatureRoute requiredFeature="HOUSEKEEPING">
                  <GenerateRoomQRCodes />
                </FeatureRoute>
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports/daily"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <FeatureRoute requiredFeature="REPORTS">
                  <DailyReport />
                </FeatureRoute>
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/reports/monthly"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <FeatureRoute requiredFeature="REPORTS">
                  <MonthlyReport />
                </FeatureRoute>
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/reports/sales"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <FeatureRoute requiredFeature="REPORTS">
                  <SalesReports />
                </FeatureRoute>
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Orders */}
        <Route
          path="/orders/manage"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen', 'steward']}>
                <OrderManagement />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings/restaurant"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['admin', 'super_admin']}>
                <RestaurantSettings />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Super Admin */}
        <Route
          path="/super-admin/manage-restaurants"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['super_admin']}>
                <ManageRestaurants />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/super-admin/add-hotel"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['super_admin']}>
                <AddRestaurant />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/super-admin/add-admin"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['super_admin']}>
                <AddAdmin />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/super-admin/hotel-profile/:id"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={['super_admin']}>
                <RestaurantProfile />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* Redirect Routes */}
        <Route path="/" element={<RoleBasedRedirect />} />
        <Route path="*" element={<RoleBasedRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;