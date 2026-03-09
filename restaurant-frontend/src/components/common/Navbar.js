import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Swal from 'sweetalert2';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from the system',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been successfully logged out',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    });
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-open');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary">
      <div className="container-fluid">
        <button className="btn btn-link text-white d-lg-none" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        
        <span className="navbar-brand mb-0 h1">
          <i className="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </span>

        <div className="ms-auto d-flex align-items-center">
          {/* Notifications */}
          <div className="dropdown me-3">
            <button className="btn btn-link text-white position-relative" type="button">
              <i className="fas fa-bell fa-lg"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>

          {/* User Profile */}
          <div className="dropdown">
            <button
              className="btn btn-link text-white dropdown-toggle d-flex align-items-center"
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-avatar me-2">
                <i className="fas fa-user-circle fa-lg"></i>
              </div>
              <div className="user-info text-start d-none d-md-block">
                <div className="user-name">{user?.name || user?.email.split('@')[0]}</div>
                <div className="user-role">{user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}</div>
              </div>
            </button>
            
            {showDropdown && (
              <ul className="dropdown-menu dropdown-menu-end show">
                <li>
                  <a className="dropdown-item" href="/settings/profile">
                    <i className="fas fa-user me-2"></i>
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/settings/password">
                    <i className="fas fa-key me-2"></i>
                    Change Password
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item text-danger" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} style={{ cursor: 'pointer' }}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
