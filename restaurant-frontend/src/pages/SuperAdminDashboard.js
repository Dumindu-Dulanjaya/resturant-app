import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './SuperAdminDashboard.css';

function SuperAdminDashboard({ children }) {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('manage-restaurants');
  const { user, token, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    // Check if user is logged in and is super admin
    if (!isAuthenticated || !token || !user) {
      navigate('/login');
      return;
    }

    const userRole = user?.role?.toString().trim().toLowerCase();
    if (userRole !== 'super_admin' && userRole !== 'superadmin') {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, token, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const loadContent = (view) => {
    setActiveView(view);
    navigate(`/super-admin/${view}`);
  };

  return (
    <div className="sa-layout">

      {/* ── Fixed Navbar ── */}
      <nav className="sa-navbar">
        <button className="sa-hamburger" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <span className="sa-brand">Super Admin</span>
        <button className="sa-logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </nav>

      {/* ── Body (sidebar + content side by side) ── */}
      <div className="sa-body">

        {/* Mobile overlay */}
        {sidebarOpen && <div className="sa-overlay" onClick={closeSidebar}></div>}

        {/* Sidebar */}
        <aside className={`sa-sidebar${sidebarOpen ? ' open' : ''}`}>

          <nav className="sa-sidebar-nav">
            <a
              className={`sa-nav-link${activeView === 'manage-restaurants' ? ' active' : ''}`}
              href="#"
              onClick={(e) => { e.preventDefault(); loadContent('manage-restaurants'); closeSidebar(); }}
            >
              <i className="fas fa-hotel"></i> All Hotels
            </a>
            <a
              className={`sa-nav-link${activeView === 'add-hotel' ? ' active' : ''}`}
              href="#"
              onClick={(e) => { e.preventDefault(); loadContent('add-hotel'); closeSidebar(); }}
            >
              <i className="fas fa-plus-square"></i> Add Hotel
            </a>
            <a
              className={`sa-nav-link${activeView === 'add-admin' ? ' active' : ''}`}
              href="#"
              onClick={(e) => { e.preventDefault(); loadContent('add-admin'); closeSidebar(); }}
            >
              <i className="fas fa-user-plus"></i> Add Admin
            </a>
          </nav>
          <div className="sa-sidebar-footer">
            <div className="sa-footer-label">Logged in as:</div>
            <div className="sa-footer-email">{user?.email}</div>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`sa-content${sidebarOpen ? ' sidebar-open' : ''}`}>
          <main>{children}</main>
          <footer className="sa-footer">
            <span>Copyright &copy; Knoweb PVT LTD {new Date().getFullYear()}</span>
          </footer>
        </div>

      </div>
    </div>
  );
}

export default SuperAdminDashboard;
