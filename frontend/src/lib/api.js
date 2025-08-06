const API_BASE_URL = 'http://localhost:8080/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get user data from localStorage
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Set user data in localStorage
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Create API request without auth header (simplified)
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      setAuthToken(response.token);
      setUser({
        id: response.id,
        email: response.email,
        role: response.role,
      });
    }
    
    return response;
  },

  registerParent: async (parentData) => {
    const response = await apiRequest('/auth/register/parent', {
      method: 'POST',
      body: JSON.stringify(parentData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
      setUser({
        id: response.id,
        email: response.email,
        role: response.role,
      });
    }
    
    return response;
  },

  registerOrphanage: async (orphanageData) => {
    const response = await apiRequest('/auth/register/orphanage', {
      method: 'POST',
      body: JSON.stringify(orphanageData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
      setUser({
        id: response.id,
        email: response.email,
        role: response.role,
      });
    }
    
    return response;
  },

  logout: () => {
    removeAuthToken();
  },
};

// Parent API calls
export const parentAPI = {
  getProfile: (userId) => apiRequest(`/parent/profile/${userId}`),
  updateProfile: (userId, profileData) => apiRequest(`/parent/profile/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ parent: profileData }),
  }),
  changePassword: (userId, passwordData) => apiRequest(`/parent/password/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  }),
};

// Orphanage API calls
export const orphanageAPI = {
  getAll: () => apiRequest('/orphanage/all'),
  getProfile: (userId) => apiRequest(`/orphanage/profile/${userId}`),
  updateProfile: (userId, profileData) => apiRequest(`/orphanage/profile/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ orphanage: profileData }),
  }),
  changePassword: (userId, passwordData) => apiRequest(`/orphanage/password/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  }),
  getById: (id) => apiRequest(`/orphanage/${id}`),
};

// Children API calls
export const childrenAPI = {
  getAllAvailable: () => apiRequest('/children/available'),
  getByOrphanage: (orphanageId) => apiRequest(`/children/orphanage/${orphanageId}`),
  getMyChildren: (userId) => apiRequest(`/children/my-children/${userId}`),
  getById: (id) => apiRequest(`/children/${id}`),
  add: (orphanageUserId, childData) => apiRequest('/children', {
    method: 'POST',
    body: JSON.stringify({ orphanageUserId, child: childData }),
  }),
  update: (orphanageUserId, id, childData) => apiRequest(`/children/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ orphanageUserId, child: childData }),
  }),
  delete: (orphanageUserId, id) => apiRequest(`/children/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ orphanageUserId }),
  }),
  updateAvailability: (orphanageUserId, id, isAvailable) => apiRequest(`/children/${id}/availability`, {
    method: 'PUT',
    body: JSON.stringify({ orphanageUserId, isAvailable }),
  }),
};

// Adoption Request API calls
export const adoptionAPI = {
  getMyRequests: (userId) => apiRequest(`/adoption-requests/my-requests/${userId}`),
  getOrphanageRequests: (userId) => apiRequest(`/adoption-requests/orphanage-requests/${userId}`),
  getOrphanageRequestsByStatus: (userId, status) => apiRequest(`/adoption-requests/orphanage-requests/${userId}/status/${status}`),
  getById: (id) => apiRequest(`/adoption-requests/${id}`),
  create: (parentUserId, childId, parentNotes) => apiRequest('/adoption-requests/create', {
    method: 'POST',
    body: JSON.stringify({ parentUserId, childId, parentNotes }),
  }),
  createWithForm: (parentUserId, childId, parentNotes, adoptionForm) => apiRequest('/adoption-requests/create-with-form', {
    method: 'POST',
    body: JSON.stringify({ parentUserId, childId, parentNotes, adoptionForm }),
  }),
  updateStatus: (orphanageUserId, id, status, orphanageNotes) => apiRequest(`/adoption-requests/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ orphanageUserId, status, orphanageNotes }),
  }),
  cancel: (parentUserId, id) => apiRequest(`/adoption-requests/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ parentUserId }),
  }),
  getForm: (id) => apiRequest(`/adoption-requests/${id}/form`),
  updateForm: (parentUserId, id, formData) => apiRequest(`/adoption-requests/${id}/form`, {
    method: 'PUT',
    body: JSON.stringify({ parentUserId, ...formData }),
  }),
};

// Utility functions
export { getAuthToken, setAuthToken, removeAuthToken, getUser, setUser };

