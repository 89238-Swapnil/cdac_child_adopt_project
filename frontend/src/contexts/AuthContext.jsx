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
    const token = getAuthToken();
    const storedUser = getUser();

    if (token && storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const result = await authAPI.login(credentials);
      const userInfo = {
        id: result.id,
        email: result.email,
        role: result.role,
      };
      setUser(userInfo);
      return result;
    } catch (err) {
      throw err;
    }
  };

  const registerParent = async (parentInfo) => {
    try {
      const result = await authAPI.registerParent(parentInfo);
      const newUser = {
        id: result.id,
        email: result.email,
        role: result.role,
      };
      setUser(newUser);
      return result;
    } catch (err) {
      throw err;
    }
  };

  const registerOrphanage = async (orphanageInfo) => {
    try {
      const result = await authAPI.registerOrphanage(orphanageInfo);
      const newUser = {
        id: result.id,
        email: result.email,
        role: result.role,
      };
      setUser(newUser);
      return result;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const isAuthenticated = () => !!user && !!getAuthToken();

  const isParent = () => user?.role === 'PARENT';

  const isOrphanage = () => user?.role === 'ORPHANAGE';

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
