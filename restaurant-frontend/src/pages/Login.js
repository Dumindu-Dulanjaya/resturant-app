import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/apiClient';
import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const getRedirectPathByRole = (role) => {
    const normalizedRole = role?.toString().trim().toLowerCase();

    switch (normalizedRole) {
      case 'super_admin':
      case 'superadmin':
        return '/super-admin/manage-restaurants';

      case 'admin':
      case 'kitchen':
      case 'steward':
      case 'housekeeper':
      case 'manager':
      case 'cashier':
      case 'staff':
        return '/dashboard';

      default:
        return '/dashboard';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter both email and password.'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(email, password);

      if (response?.data?.success) {
        const { access_token, user } = response.data.data;

        if (!user || !access_token) {
          throw new Error('Invalid login response from server.');
        }

        login(user, access_token);

        const authStorageData = {
          state: {
            user: user,
            token: access_token,
            isAuthenticated: true
          },
          version: 0
        };

        localStorage.setItem('auth-storage', JSON.stringify(authStorageData));

        const redirectPath = getRedirectPathByRole(user.role);

        console.log('Login successful');
        console.log('User:', user);
        console.log('Role:', user.role);
        console.log('Redirecting to:', redirectPath);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didClose: () => {
            // Force page reload with new URL
            window.location.href = redirectPath;
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response?.data?.message || 'Invalid credentials.'
        });
      }
    } catch (error) {
      console.error('Login error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error?.response?.data?.message ||
          error?.message ||
          'Failed to login. Please check your credentials.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header bg-gradient-primary">
                <h3 className="text-center font-weight-light my-4 text-white">
                  <i className="fas fa-utensils me-2"></i>
                  Restaurant Management
                </h3>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="inputEmail">
                      <i className="fas fa-envelope me-2"></i>
                      Email address
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="inputPassword">
                      <i className="fas fa-lock me-2"></i>
                      Password
                    </label>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary btn-lg"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Logging in...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Login
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="mb-2">
                    <strong>Test Credentials:</strong>
                  </p>
                  <div className="credential-box">
                    <small className="text-muted d-block">Super Admin</small>
                    <small className="d-block">
                      info@knowebsolutions.com / Knoweb@123
                    </small>
                  </div>
                </div>
              </div>

              <div className="card-footer text-center py-3">
                <div className="small">
                  <a href="#!">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;