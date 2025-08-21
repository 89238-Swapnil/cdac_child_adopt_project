import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, setUser as setUserInStorage, authAPI } from '../lib/api';

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
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const userData = {
        id: response.id,
        email: response.email,
        role: response.role,
      };
      setUser(userData);
      setUserInStorage(userData); // Store in localStorage
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerParent = async (parentData) => {
    try {
      const response = await authAPI.registerParent(parentData);
      const userData = {
        id: response.id,
        email: response.email,
        role: response.role,
      };
      setUser(userData);
      setUserInStorage(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerOrphanage = async (orphanageData) => {
    try {
      const response = await authAPI.registerOrphanage(orphanageData);
      const userData = {
        id: response.id,
        email: response.email,
        role: response.role,
      };
      setUser(userData);
      setUserInStorage(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setUserInStorage(null);
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

  // Add getUser function for compatibility
  const getUser = () => {
    return user;
  };

  const value = {
    user,
    getUser, // Add this for backward compatibility
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

