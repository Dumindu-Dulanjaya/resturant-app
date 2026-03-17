import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuthStore();
  const [menuStates, setMenuStates] = useState({
    menus: false,
    qrcodes: false,
    kitchen: false,
    housekeeping: false,
    offers: false,
    reports: false,
    settings: false
  });

  const toggleMenu = (menuName) => {
    setMenuStates(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Role-based permissions
  const isSuperAdmin = user?.role === 'super_admin';
  const isAdmin = user?.role === 'admin';
  const isKitchen = user?.role === 'kitchen';
  const isCashier = user?.role === 'cashier';
  const isHousekeeper = user?.role === 'housekeeper';

  // Restaurant feature flags
  const restaurantSettings = user?.restaurantSettings || {};
  const isHousekeepingEnabled = restaurantSettings.enableHousekeeping == null || Boolean(restaurantSettings.enableHousekeeping);
  const isKdsEnabled = restaurantSettings.enableKds == null || Boolean(restaurantSettings.enableKds);
  const isReportsEnabled = restaurantSettings.enableReports == null || Boolean(restaurantSettings.enableReports);

  // Permission helpers
  const canAccessAdminFeatures = isSuperAdmin || isAdmin;
  const canAccessKitchen = (isSuperAdmin || isAdmin || isKitchen) && isKdsEnabled;
  const canAccessKitchenDashboard = (isKitchen || isSuperAdmin) && isKdsEnabled;
  const canAccessCashierDashboard = isCashier;
  const canAccessHousekeeping = (isSuperAdmin || isAdmin || isHousekeeper) && isHousekeepingEnabled;
  const canAccessReports = canAccessAdminFeatures && isReportsEnabled;
  const dashboardPath = isKitchen ? '/kitchen/dashboard' : isCashier ? '/cashier/dashboard' : '/dashboard';

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <i className="fas fa-utensils me-2"></i>
        Restaurant System
      </div>
      
      <ul className="sidebar-menu">
        <li className={isActive(dashboardPath)}>
          <Link to={dashboardPath}>
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {canAccessCashierDashboard && (
          <li className={isActive('/cashier/dashboard')}>
            <Link to="/cashier/dashboard">
              <i className="fas fa-cash-register"></i>
              <span>Cashier Dashboard</span>
            </Link>
          </li>
        )}

        {/* Menus Section - Admin Only */}
        {canAccessAdminFeatures && (
          <li className={`has-submenu ${menuStates.menus ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu('menus'); }}>
            <i className="fas fa-book-open"></i>
            <span>Menus</span>
            <i className={`fas fa-chevron-${menuStates.menus ? 'down' : 'right'} submenu-arrow`}></i>
          </a>
          <ul className="submenu" style={{ display: menuStates.menus ? 'block' : 'none' }}>
            <li className={isActive('/menus/all')}>
              <Link to="/menus/all">
                <i className="fas fa-list"></i>
                All Menus
              </Link>
            </li>
            <li className={isActive('/menus/categories')}>
              <Link to="/menus/categories">
                <i className="fas fa-th-large"></i>
                Categories
              </Link>
            </li>
            <li className={isActive('/menus/subcategories')}>
              <Link to="/menus/subcategories">
                <i className="fas fa-th"></i>
                Subcategories
              </Link>
            </li>
            <li className={isActive('/menus/food-items')}>
              <Link to="/menus/food-items">
                <i className="fas fa-hamburger"></i>
                Food Items
              </Link>
            </li>
          </ul>
        </li>
        )}

        {/* Offers Section - Admin Only */}
        {canAccessAdminFeatures && (
          <li className={`has-submenu ${menuStates.offers ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu('offers'); }}>
            <i className="fas fa-tag"></i>
            <span>Offers</span>
            <i className={`fas fa-chevron-${menuStates.offers ? 'down' : 'right'} submenu-arrow`}></i>
          </a>
          <ul className="submenu" style={{ display: menuStates.offers ? 'block' : 'none' }}>
            <li className={isActive('/offers/add')}>
              <Link to="/offers/add">
                <i className="fas fa-plus-circle"></i>
                Add New Offer
              </Link>
            </li>
            <li className={isActive('/menus/offers')}>
              <Link to="/menus/offers">
                <i className="fas fa-list"></i>
                Manage Offers
              </Link>
            </li>
          </ul>
        </li>
        )}

        {/* QR Codes Section - Admin Only */}
        {canAccessAdminFeatures && (
          <li className={isActive('/qr-codes/generate')}>
          <Link to="/qr-codes/generate">
            <i className="fas fa-qrcode"></i>
            <span>QR Codes</span>
          </Link>
        </li>
        )}

        {/* Kitchen Section - Kitchen Staff + Admin */}
        {canAccessKitchen && (
          <li className={`has-submenu ${menuStates.kitchen ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu('kitchen'); }}>
            <i className="fas fa-fire"></i>
            <span>Kitchen</span>
            <i className={`fas fa-chevron-${menuStates.kitchen ? 'down' : 'right'} submenu-arrow`}></i>
          </a>
          <ul className="submenu" style={{ display: menuStates.kitchen ? 'block' : 'none' }}>
            {canAccessKitchenDashboard && (
              <li className={isActive('/kitchen/dashboard')}>
                <Link to="/kitchen/dashboard">
                  <i className="fas fa-tachometer-alt"></i>
                  Kitchen Dashboard
                </Link>
              </li>
            )}
            <li className={isActive('/kitchen/kds')}>
              <Link to="/kitchen/kds">
                <i className="fas fa-chart-line"></i>
                Kitchen KDS
              </Link>
            </li>
            <li className={isActive('/kitchen/orders')}>
              <Link to="/kitchen/orders">
                <i className="fas fa-clipboard-list"></i>
                Active Orders
              </Link>
            </li>
            <li className={isActive('/kitchen/history')}>
              <Link to="/kitchen/history">
                <i className="fas fa-history"></i>
                Order History
              </Link>
            </li>
            <li className={isActive('/orders/manage')}>
              <Link to="/orders/manage">
                <i className="fas fa-tasks"></i>
                Order Management
              </Link>
            </li>
            <li className={isActive('/billing')}>
              <Link to="/billing">
                <i className="fas fa-file-invoice-dollar"></i>
                Service &amp; Billing
              </Link>
            </li>
          </ul>
        </li>
        )}

        {/* Housekeeping Section - Housekeepers + Admin */}
        {canAccessHousekeeping && (
          <li className={`has-submenu ${menuStates.housekeeping ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu('housekeeping'); }}>
            <i className="fas fa-broom"></i>
            <span>Room Service</span>
            <i className={`fas fa-chevron-${menuStates.housekeeping ? 'down' : 'right'} submenu-arrow`}></i>
          </a>
          <ul className="submenu" style={{ display: menuStates.housekeeping ? 'block' : 'none' }}>
            <li className={`has-submenu ${menuStates.housekeeping ? 'open' : ''}`}>
              <span style={{ paddingLeft: '20px', fontSize: '0.85rem', fontWeight: '600', color: '#999', textTransform: 'uppercase' }}>
                Housekeeping
              </span>
            </li>
            <li className={isActive('/housekeeping/messages')}>
              <Link to="/housekeeping/messages">
                <i className="fas fa-envelope"></i>
                Messages
              </Link>
            </li>
            <li className={isActive('/housekeeping/room-qr')}>
              <Link to="/housekeeping/room-qr">
                <i className="fas fa-qrcode"></i>
                All Room QR codes
              </Link>
            </li>
            <li className={isActive('/housekeeping/room-qr/generate')}>
              <Link to="/housekeeping/room-qr/generate">
                <i className="fas fa-plus-circle"></i>
                Generate Room QR Codes
              </Link>
            </li>
          </ul>
        </li>
        )}

        {/* Reports Section - Admin Only */}
        {canAccessReports && (
          <li className={`has-submenu ${menuStates.reports ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu('reports'); }}>
            <i className="fas fa-chart-bar"></i>
            <span>Reports</span>
            <i className={`fas fa-chevron-${menuStates.reports ? 'down' : 'right'} submenu-arrow`}></i>
          </a>
          <ul className="submenu" style={{ display: menuStates.reports ? 'block' : 'none' }}>
            <li className={isActive('/reports/daily')}>
              <Link to="/reports/daily">
                <i className="fas fa-calendar-day"></i>
                Daily Report
              </Link>
            </li>
            <li className={isActive('/reports/monthly')}>
              <Link to="/reports/monthly">
                <i className="fas fa-calendar-alt"></i>
                Monthly Report
              </Link>
            </li>
            <li className={isActive('/reports/sales')}>
              <Link to="/reports/sales">
                <i className="fas fa-dollar-sign"></i>
                Sales Report
              </Link>
            </li>
          </ul>
        </li>
        )}

        {/* Super Admin Only */}
        {isSuperAdmin && (
          <>
            <li className={isActive('/restaurants')}>
              <Link to="/restaurants">
                <i className="fas fa-building"></i>
                <span>Restaurants</span>
              </Link>
            </li>
            <li className={isActive('/admins')}>
              <Link to="/admins">
                <i className="fas fa-user-shield"></i>
                <span>Admins</span>
              </Link>
            </li>
          </>
        )}

        {/* Settings */}
        <li className={`has-submenu ${menuStates.settings ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMenu('settings'); }}>
            <i className="fas fa-cog"></i>
            <span>Settings</span>
            <i className={`fas fa-chevron-${menuStates.settings ? 'down' : 'right'} submenu-arrow`}></i>
          </a>
          <ul className="submenu" style={{ display: menuStates.settings ? 'block' : 'none' }}>
            <li className={isActive('/settings/profile')}>
              <Link to="/settings/profile">
                <i className="fas fa-user"></i>
                Profile
              </Link>
            </li>
            <li className={isActive('/settings/password')}>
              <Link to="/settings/password">
                <i className="fas fa-key"></i>
                Change Password
              </Link>
            </li>
            {canAccessAdminFeatures && (
              <li className={isActive('/settings/restaurant')}>
                <Link to="/settings/restaurant">
                  <i className="fas fa-building"></i>
                  Restaurant Settings
                </Link>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
