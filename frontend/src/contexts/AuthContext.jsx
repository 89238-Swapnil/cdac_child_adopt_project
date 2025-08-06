import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser, getAuthToken, authAPI, clearStorage, saveAuthToken, saveUser } from '../lib/api';

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

    const tokenExpiryTimeout = setTimeout(() => {
      logout();
    }, getTokenExpiryTime());

    setLoading(false);

    return () => clearTimeout(tokenExpiryTimeout);
  }, []);

  const getTokenExpiryTime = () => {
    return 60 * 60 * 1000;
  };

  const login = async (credentials, remember = true) => {
    try {
      const result = await authAPI.login(credentials);
      const userInfo = {
        id: result.id,
        email: result.email,
        role: result.role,
      };
      setUser(userInfo);
      if (remember) {
        saveAuthToken(result.token);
        saveUser(userInfo);
      }
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
      saveAuthToken(result.token);
      saveUser(newUser);
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
      saveAuthToken(result.token);
      saveUser(newUser);
      return result;
    } catch (err) {
      throw err;
    }
  };

  const refreshProfile = async () => {
    try {
      const result = await authAPI.fetchCurrentUser();
      const updatedUser = {
        id: result.id,
        email: result.email,
        role: result.role,
      };
      setUser(updatedUser);
      saveUser(updatedUser);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    authAPI.logout();
    clearStorage();
    setUser(null);
  };

  const isAuthenticated = () => !!user && !!getAuthToken();
  const isParent = () => user?.role === 'PARENT';
  const isOrphanage = () => user?.role === 'ORPHANAGE';
  const isAdmin = () => user?.role === 'ADMIN';

  const value = {
    user,
    login,
    registerParent,
    registerOrphanage,
    logout,
    isAuthenticated,
    isParent,
    isOrphanage,
    isAdmin,
    refreshProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
