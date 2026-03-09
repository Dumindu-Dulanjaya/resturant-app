import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Swal from 'sweetalert2';
import SuperAdminDashboard from './SuperAdminDashboard';
import './RestaurantProfile.css';

function RestaurantProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      // Fetch restaurant data
      const restRes = await apiClient.get(`/restaurant/${id}`);
      if (restRes.data.success) {
        setRestaurant(restRes.data.data);
      } else {
        Swal.fire('Error!', 'Restaurant not found', 'error');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Restaurant fetch error:', error.response || error);
      Swal.fire('Error!', `Failed to load restaurant: ${error.response?.data?.message || error.message}`, 'error');
      setLoading(false);
      return;
    }

    try {
      // Fetch admins separately so a failure here doesn't block the page
      const adminRes = await apiClient.get('/auth/admins');
      if (adminRes.data.success) {
        const filtered = adminRes.data.data.filter(
          (a) => a.restaurantId === parseInt(id)
        );
        setAdmins(filtered);
      }
    } catch (error) {
      console.warn('Admins fetch failed (non-critical):', error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    const result = await Swal.fire({
      title: 'Delete admin?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete',
    });
    if (!result.isConfirmed) return;
    try {
      await apiClient.delete(`/auth/admins/${adminId}`);
      Swal.fire('Deleted!', 'Admin removed successfully.', 'success');
      fetchData();
    } catch {
      Swal.fire('Error!', 'Failed to delete admin.', 'error');
    }
  };

  if (loading) {
    return (
      <SuperAdminDashboard>
        <div className="rp-loading">
          <div className="spinner-border text-primary" role="status" />
        </div>
      </SuperAdminDashboard>
    );
  }

  if (!restaurant) {
    return (
      <SuperAdminDashboard>
        <div className="rp-loading">Restaurant not found.</div>
      </SuperAdminDashboard>
    );
  }

  const logoUrl = restaurant.logo
    ? `http://localhost:3000${restaurant.logo.startsWith('/') ? '' : '/'}${restaurant.logo}`
    : null;

  const privileges = [
    restaurant.enableSteward && 'QR Menu System',
    restaurant.enableHousekeeping && 'QR Housekeeping System',
    restaurant.enableKds && 'Kitchen Display System',
    restaurant.enableReports && 'Reports',
    'Special Offers',
  ].filter(Boolean);

  return (
    <SuperAdminDashboard>

      {/* ── Page Header Bar ── */}
      <div className="rp-page-header">
        <div className="rp-page-header-inner">
          <h1 className="rp-page-title">Restaurant Details</h1>
          <nav className="rp-breadcrumb">
            <span
              className="rp-bc-link"
              onClick={() => navigate('/super-admin/manage-restaurants')}
            >
              <i className="fas fa-home"></i> Home
            </span>
            <span className="rp-bc-sep">/</span>
            <span className="rp-bc-current">Restaurant Details</span>
          </nav>
        </div>
      </div>

      <div className="rp-wrapper">
        <div className="rp-grid">

          {/* ── Left Panel ── */}
          <div className="rp-left">
            <div className="rp-logo-wrap">
              {logoUrl ? (
                <img src={logoUrl} alt="logo" className="rp-logo" />
              ) : (
                <div className="rp-logo-placeholder">
                  <i className="fas fa-hotel"></i>
                </div>
              )}
            </div>
            <h2 className="rp-name">{restaurant.restaurantName}</h2>
            <p className="rp-address">{restaurant.address}</p>

            <div className="rp-privileges">
              <h5 className="rp-priv-title">Privileges</h5>
              {privileges.map((p) => (
                <div key={p} className="rp-priv-item">{p}</div>
              ))}
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div className="rp-right">
            <table className="rp-detail-table">
              <tbody>
                <tr>
                  <td className="rp-label">Restaurant Name</td>
                  <td className="rp-value">{restaurant.restaurantName}</td>
                </tr>
                <tr>
                  <td className="rp-label">Email</td>
                  <td className="rp-value">{restaurant.email}</td>
                </tr>
                <tr>
                  <td className="rp-label">Contact Number</td>
                  <td className="rp-value">{restaurant.contactNumber}</td>
                </tr>
                <tr>
                  <td className="rp-label">Address</td>
                  <td className="rp-value">{restaurant.address}</td>
                </tr>
                <tr>
                  <td className="rp-label">Subscription Status</td>
                  <td className="rp-value">
                    <span
                      className={`rp-badge ${
                        restaurant.subscriptionStatus === 'active'
                          ? 'rp-badge-active'
                          : 'rp-badge-inactive'
                      }`}
                    >
                      {restaurant.subscriptionStatus}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="rp-label">Subscription Expiry</td>
                  <td className="rp-value">
                    {restaurant.subscriptionExpiryDate
                      ? new Date(restaurant.subscriptionExpiryDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td className="rp-label">Opening Time</td>
                  <td className="rp-value">{restaurant.openingTime}</td>
                </tr>
                <tr>
                  <td className="rp-label">Closing Time</td>
                  <td className="rp-value">{restaurant.closingTime}</td>
                </tr>
              </tbody>
            </table>

            {/* Admins Table */}
            <div className="rp-admins">
              <h5 className="rp-admins-title">Admins</h5>
              {admins.length === 0 ? (
                <p className="rp-no-admins">No admins found for this restaurant.</p>
              ) : (
                <table className="rp-admins-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.adminId}>
                        <td>{admin.email}</td>
                        <td>{admin.role}</td>
                        <td>
                          <button
                            className="rp-btn-delete"
                            onClick={() => handleDeleteAdmin(admin.adminId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>
    </SuperAdminDashboard>
  );
}

export default RestaurantProfile;
