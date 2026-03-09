import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import Swal from 'sweetalert2';
import SuperAdminDashboard from './SuperAdminDashboard';

function AddAdmin() {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin',
    restaurantId: '',
  });
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await apiClient.get('/restaurant');

      if (response.data.success) {
        setRestaurants(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Swal.fire('Error!', 'Please enter a valid email address', 'error');
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire('Error!', 'Password must be at least 6 characters', 'error');
      return;
    }

    if (!formData.restaurantId && formData.role !== 'super_admin') {
      Swal.fire('Error!', 'Please select a restaurant for admin role', 'error');
      return;
    }

    try {
      const dataToSend = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        restaurantId: formData.restaurantId ? parseInt(formData.restaurantId) : undefined,
      };

      const response = await apiClient.post('/auth/admin/create', dataToSend);

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Admin created successfully',
        });

        // Reset form
        setFormData({
          email: '',
          password: '',
          role: 'admin',
          restaurantId: '',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to create admin',
      });
    }
  };

  return (
    <SuperAdminDashboard>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Add New Admin</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Hotel</label>
                    <select
                      className="form-select"
                      name="restaurantId"
                      value={formData.restaurantId}
                      onChange={handleChange}
                      disabled={formData.role === 'super_admin'}
                      required={formData.role !== 'super_admin'}
                    >
                      <option value="">Select a restaurant</option>
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.restaurantId} value={restaurant.restaurantId}>
                          {restaurant.restaurantName}
                        </option>
                      ))}
                    </select>
                    {formData.role === 'super_admin' && (
                      <small className="text-muted">
                        Super admins don't need a specific restaurant
                      </small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Add User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminDashboard>
  );
}

export default AddAdmin;
