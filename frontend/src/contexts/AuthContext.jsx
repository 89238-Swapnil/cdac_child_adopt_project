import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser, getAuthToken, authAPI } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = getAuthToken();
    const userData = getUser();
    
    if (token && userData) {
      setUser(userData);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      setUser({
        id: response.id,
        email: response.email,
        role: response.role,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerParent = async (parentData) => {
    try {
      const response = await authAPI.registerParent(parentData);
      setUser({
        id: response.id,
        email: response.email,
        role: response.role,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerOrphanage = async (orphanageData) => {
    try {
      const response = await authAPI.registerOrphanage(orphanageData);
      setUser({
        id: response.id,
        email: response.email,
        role: response.role,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!getAuthToken();
  };

  const isParent = () => {
    return user?.role === 'PARENT';
  };

  const isOrphanage = () => {
    return user?.role === 'ORPHANAGE';
  };

  const value = {
    user,
    login,
    registerParent,
    registerOrphanage,
    logout,
    isAuthenticated,
    isParent,
    isOrphanage,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

