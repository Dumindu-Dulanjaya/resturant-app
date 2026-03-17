import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SuperAdminLogin from './pages/SuperAdminLogin';
import KitchenLogin from './pages/KitchenLogin';
import CashierLogin from './pages/CashierLogin';
import Dashboard from './pages/Dashboard';
import Menus from './pages/Menus';
import Categories from './pages/Categories';
import Subcategories from './pages/Subcategories';
import FoodItems from './pages/FoodItems';
import KitchenKDS from './pages/KitchenKDS';
import KitchenDashboard from './pages/KitchenDashboard';
import CustomerQROrder from './pages/CustomerQROrder';
import GenerateQRCodes from './pages/GenerateQRCodes';
import SalesReports from './pages/SalesReports';
import DailyReport from './pages/DailyReport';
import MonthlyReport from './pages/MonthlyReport';
import OrderManagement from './pages/OrderManagement';
import ActiveOrders from './pages/ActiveOrders';
import OrderHistory from './pages/OrderHistory';
import RestaurantSettings from './pages/RestaurantSettings';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
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
import PendingSettingsRequests from './pages/PendingSettingsRequests';
import PendingRegistrations from './pages/PendingRegistrations';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import ServiceBillingDashboard from './pages/ServiceBillingDashboard';
import CashierDashboard from './pages/CashierDashboard';

import PrivateRoute from './components/auth/PrivateRoute';
import RoleRoute from './components/auth/RoleRoute';
import FeatureRoute from './components/auth/FeatureRoute';
import RoleBasedRedirect from './components/auth/RoleBasedRedirect';
import { NotificationProvider } from './components/common/NotificationToast';
import { WebSocketProvider, useWebSocket } from './hooks/useWebSocket';
import { useAuthStore } from './store/authStore';
import apiClient from './api/apiClient';

import './App.css';

// Keeps user.restaurantSettings in the auth store in sync whenever settings
// are changed (approved request or direct super-admin save). Runs globally so
// Sidebar and FeatureRoute always reflect current feature flags.
function SettingsSyncProvider() {
  const { user, updateUser } = useAuthStore();
  const { subscribe } = useWebSocket();

  // On mount: refresh settings so stale persisted values are corrected
  useEffect(() => {
    if (!user || user.role !== 'admin' || !user.restaurantId) return;
    apiClient
      .get('/restaurant/settings')
      .then((res) => {
        if (res?.data?.success) {
          updateUser({ restaurantSettings: res.data.data });
        }
      })
      .catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real-time: update auth store whenever settings change for this restaurant
  useEffect(() => {
    if (!user || user.role !== 'admin' || !user.restaurantId) return;

    const unsubReviewed = subscribe('settings-request:reviewed', (data) => {
      if (data.restaurantId !== user.restaurantId) return;
      if (data.status !== 'APPROVED') return;
      if (data.approvedSettings) {
        updateUser({ restaurantSettings: data.approvedSettings });
      } else {
        // Fallback: fetch fresh settings
        apiClient
          .get('/restaurant/settings')
          .then((res) => {
            if (res?.data?.success) updateUser({ restaurantSettings: res.data.data });
          })
          .catch(() => { });
      }
    });

    const unsubUpdated = subscribe('settings:updated', (data) => {
      if (data.restaurantId !== user.restaurantId) return;
      if (data.settings) {
        updateUser({ restaurantSettings: data.settings });
      }
    });

    return () => {
      unsubReviewed();
      unsubUpdated();
    };
  }, [subscribe, user, updateUser]);

  return null;
}

function App() {
  return (
    <NotificationProvider>
      <WebSocketProvider>
        <SettingsSyncProvider />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/super-admin/login" element={<SuperAdminLogin />} />
            <Route path="/kitchen-login" element={<KitchenLogin />} />
            <Route path="/cashier-login" element={<CashierLogin />} />
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
                      'housekeeper'
                    ]}
                  >
                    <Dashboard />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/kitchen/dashboard"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['kitchen', 'super_admin']}>
                    <FeatureRoute requiredFeature="KDS">
                      <KitchenDashboard />
                    </FeatureRoute>
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
                  <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen']}>
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
                  <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen']}>
                    <OrderManagement />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/kitchen/orders"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen']}>
                    <ActiveOrders />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/kitchen/history"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen']}>
                    <OrderHistory />
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

            <Route
              path="/settings/profile"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen', 'housekeeper', 'cashier']}>
                    <Profile />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/settings/password"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['admin', 'super_admin', 'kitchen', 'housekeeper', 'cashier']}>
                    <ChangePassword />
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

            <Route
              path="/super-admin/pending-approvals"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['super_admin']}>
                    <PendingSettingsRequests />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/super-admin/pending-registrations"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['super_admin']}>
                    <PendingRegistrations />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            {/* Billing */}
            <Route
              path="/cashier/dashboard"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['cashier', 'super_admin']}>
                    <CashierDashboard />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/billing"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['super_admin', 'kitchen']}>
                    <ServiceBillingDashboard />
                  </RoleRoute>
                </PrivateRoute>
              }
            />

            {/* Redirect Routes */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<RoleBasedRedirect />} />
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
    </NotificationProvider>
  );
}

export default App;