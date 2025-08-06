import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, role, redirectTo = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Access log - helpful for debugging or future analytics
  useEffect(() => {
    if (!loading && isAuthenticated()) {
      console.log(`🔐 Accessed Protected Route - Role: ${user?.role}`);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    const defaultRedirect = user?.role === 'PARENT' ? '/parent/dashboard' : '/orphanage/dashboard';
    const targetPath = redirectTo || defaultRedirect;

    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center px-4">
        <h2 className="text-xl font-semibold text-red-600">Unauthorized Access</h2>
        <p className="text-gray-700">
          You do not have permission to view this page.
        </p>
        <Navigate to={targetPath} replace />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
