import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * RoleRoute - Protects routes based on user roles
 * 
 * Usage:
 * <RoleRoute allowedRoles={['admin', 'super_admin']}>
 *   <AdminPage />
 * </RoleRoute>
 */
function RoleRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, token } = useAuthStore();

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role for comparison
  const userRole = user?.role?.toString().trim().toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map(role => role.toString().trim().toLowerCase());

  // Check if user's role is in the allowed roles list
  if (!userRole || !normalizedAllowedRoles.includes(userRole)) {
    // Redirect to dashboard if user doesn't have permission
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;
