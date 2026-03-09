import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayOrders: 0,
    totalRevenue: 0,
    activeMenus: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  useEffect(() => {
    // TODO: Fetch dashboard stats from API
    // For now, using dummy data
    setStats({
      totalOrders: 1250,
      todayOrders: 45,
      totalRevenue: 45890,
      activeMenus: 8,
      pendingOrders: 12,
      completedOrders: 33
    });
  }, []);

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-content">
          <div className="container-fluid">
            {/* Welcome Header */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="welcome-card">
                  <h2>
                    <i className="fas fa-hand-wave me-2"></i>
                    Welcome back, {user?.name || user?.email.split('@')[0]}!
                  </h2>
                  <p className="text-muted mb-0">
                    Here's what's happening with your restaurant today
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
              <div className="col-xl-3 col-md-6">
                <div className="stats-card gradient-blue">
                  <div className="stats-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div className="stats-content">
                    <h3>{stats.todayOrders}</h3>
                    <p>Today's Orders</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="stats-card gradient-green">
                  <div className="stats-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stats-content">
                    <h3>${stats.totalRevenue.toLocaleString()}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="stats-card gradient-orange">
                  <div className="stats-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="stats-content">
                    <h3>{stats.pendingOrders}</h3>
                    <p>Pending Orders</p>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6">
                <div className="stats-card gradient-purple">
                  <div className="stats-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <div className="stats-content">
                    <h3>{stats.activeMenus}</h3>
                    <p>Active Menus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Recent Orders */}
            <div className="row g-4">
              {/* Recent Orders */}
              <div className="col-lg-8">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">
                      <i className="fas fa-list-alt me-2"></i>
                      Recent Orders
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Table/Room</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span className="badge bg-primary">#ORD-1234</span></td>
                            <td>Table 5</td>
                            <td>3 items</td>
                            <td>$45.50</td>
                            <td><span className="badge bg-warning">Pending</span></td>
                            <td>2 mins ago</td>
                          </tr>
                          <tr>
                            <td><span className="badge bg-primary">#ORD-1233</span></td>
                            <td>Room 201</td>
                            <td>2 items</td>
                            <td>$32.00</td>
                            <td><span className="badge bg-info">Preparing</span></td>
                            <td>5 mins ago</td>
                          </tr>
                          <tr>
                            <td><span className="badge bg-primary">#ORD-1232</span></td>
                            <td>Table 12</td>
                            <td>5 items</td>
                            <td>$78.90</td>
                            <td><span className="badge bg-success">Completed</span></td>
                            <td>10 mins ago</td>
                          </tr>
                          <tr>
                            <td><span className="badge bg-primary">#ORD-1231</span></td>
                            <td>Room 105</td>
                            <td>1 item</td>
                            <td>$15.00</td>
                            <td><span className="badge bg-success">Completed</span></td>
                            <td>15 mins ago</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">
                      <i className="fas fa-bolt me-2"></i>
                      Quick Actions
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary btn-lg">
                        <i className="fas fa-plus-circle me-2"></i>
                        New Order
                      </button>
                      <button className="btn btn-success btn-lg">
                        <i className="fas fa-hamburger me-2"></i>
                        Add Food Item
                      </button>
                      <button className="btn btn-info btn-lg">
                        <i className="fas fa-qrcode me-2"></i>
                        Generate QR Code
                      </button>
                      <button className="btn btn-warning btn-lg">
                        <i className="fas fa-chart-line me-2"></i>
                        View Reports
                      </button>
                      {isSuperAdmin && (
                        <button className="btn btn-danger btn-lg">
                          <i className="fas fa-building me-2"></i>
                          Manage Restaurants
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="card shadow-sm mt-4">
                  <div className="card-header bg-white">
                    <h5 className="mb-0">
                      <i className="fas fa-server me-2"></i>
                      System Status
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="status-item">
                      <span className="status-label">Database</span>
                      <span className="badge bg-success">Online</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">API Server</span>
                      <span className="badge bg-success">Running</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Kitchen Display</span>
                      <span className="badge bg-success">Active</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">QR Service</span>
                      <span className="badge bg-success">Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
