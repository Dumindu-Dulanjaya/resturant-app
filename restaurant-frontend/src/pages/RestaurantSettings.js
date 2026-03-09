import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/apiClient';
import Sidebar from '../components/common/Sidebar';
import Swal from 'sweetalert2';
import './RestaurantSettings.css';

function RestaurantSettings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    enableSteward: true,
    enableHousekeeping: true,
    enableKds: true,
    enableReports: true,
  });

  useEffect(() => {
    // Only admins and super admins can access
    if (user?.role !== 'admin' && user?.role !== 'super_admin') {
      navigate('/dashboard');
      return;
    }

    fetchSettings();
  }, [user, navigate]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/restaurant/settings');
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load restaurant settings',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await apiClient.patch('/restaurant/settings', settings);
      
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message || 'Settings updated successfully',
          timer: 2000,
        });

        // Refresh user profile to get updated settings
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update settings',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <Sidebar />
        <div className="content-wrapper">
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <div className="restaurant-settings-container">
          <div className="page-header">
            <h1>
              <i className="fas fa-cog me-2"></i>
              Restaurant Settings
            </h1>
            <p className="text-muted">
              Configure optional modules and features for your restaurant
            </p>
          </div>

          <div className="settings-card">
            <h2 className="settings-title">
              <i className="fas fa-puzzle-piece me-2"></i>
              Module Configuration
            </h2>
            <p className="settings-description">
              Enable or disable modules based on your restaurant's needs. Disabled modules
              will hide related menu items and block access to those features.
            </p>

            <div className="settings-list">
              {/* Steward Module */}
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-header">
                    <i className="fas fa-user-tie setting-icon steward"></i>
                    <div>
                      <h3>Steward Module</h3>
                      <p>
                        Enable Steward role and table service features. Stewards can manage
                        orders and coordinate with kitchen staff.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="setting-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.enableSteward}
                      onChange={() => handleToggle('enableSteward')}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className={`status-badge ${settings.enableSteward ? 'active' : 'inactive'}`}>
                    {settings.enableSteward ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Housekeeping Module */}
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-header">
                    <i className="fas fa-broom setting-icon housekeeping"></i>
                    <div>
                      <h3>Housekeeping Module</h3>
                      <p>
                        Enable Housekeeping management for hotels. Track cleaning tasks,
                        room status, and staff assignments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="setting-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.enableHousekeeping}
                      onChange={() => handleToggle('enableHousekeeping')}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className={`status-badge ${settings.enableHousekeeping ? 'active' : 'inactive'}`}>
                    {settings.enableHousekeeping ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Kitchen Display System */}
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-header">
                    <i className="fas fa-fire setting-icon kds"></i>
                    <div>
                      <h3>Kitchen Display System (KDS)</h3>
                      <p>
                        Enable Kitchen Display System for real-time order tracking and
                        kitchen workflow management.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="setting-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.enableKds}
                      onChange={() => handleToggle('enableKds')}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className={`status-badge ${settings.enableKds ? 'active' : 'inactive'}`}>
                    {settings.enableKds ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Reports Module */}
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-header">
                    <i className="fas fa-chart-bar setting-icon reports"></i>
                    <div>
                      <h3>Reports Module</h3>
                      <p>
                        Enable reporting features including daily, monthly, and sales reports
                        with analytics.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="setting-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={settings.enableReports}
                      onChange={() => handleToggle('enableReports')}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className={`status-badge ${settings.enableReports ? 'active' : 'inactive'}`}>
                    {settings.enableReports ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button
                className="btn-save"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantSettings;
