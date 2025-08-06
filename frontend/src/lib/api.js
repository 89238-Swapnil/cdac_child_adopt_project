const API_BASE_URL = 'http://localhost:8080/api';

// Token & User Management
const getAuthToken = () => localStorage.getItem('token');

const setAuthToken = (token) => localStorage.setItem('token', token);

const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const clearStorage = () => {
  localStorage.clear();
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const saveAuthToken = setAuthToken;
const saveUser = setUser;

// Basic Request Wrapper
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

// Authentication API
export const authAPI = {
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      setAuthToken(response.token);
      setUser({ id: response.id, email: response.email, role: response.role });
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
      setUser({ id: response.id, email: response.email, role: response.role });
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
      setUser({ id: response.id, email: response.email, role: response.role });
    }

    return response;
  },

  logout: () => {
    removeAuthToken();
  },

  fetchCurrentUser: async () => {
    return await apiRequest('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  },
};

// Parent APIs
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

// Orphanage APIs
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

// Children APIs
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

// Adoption APIs
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

// Utility Exports
export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUser,
  setUser,
  saveAuthToken,
  saveUser,
  clearStorage,
};
