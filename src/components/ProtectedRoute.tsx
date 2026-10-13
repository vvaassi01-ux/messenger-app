import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  // Show nothing (or a clean spinner) while checking Firebase authentication states
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  // If no active session token exists, force redirect back to login
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};
