import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterParent from './pages/RegisterParent';
import RegisterOrphanage from './pages/RegisterOrphanage';
import ParentDashboard from './pages/ParentDashboard';
import OrphanageDashboard from './pages/OrphanageDashboard';
import OrphanageList from './pages/OrphanageList';
import OrphanageChildren from './pages/OrphanageChildren';
import ChildrenList from './pages/ChildrenList';
import ChildDetails from './pages/ChildDetails';
import ManageChildren from './pages/ManageChildren';
import AdoptionRequests from './pages/AdoptionRequests';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register/parent" element={<RegisterParent />} />
              <Route path="/register/orphanage" element={<RegisterOrphanage />} />
              
              {/* Protected Routes for Parents */}
              <Route 
                path="/parent/dashboard" 
                element={
                  <ProtectedRoute role="PARENT">
                    <ParentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orphanages" 
                element={
                  <ProtectedRoute role="PARENT">
                    <OrphanageList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orphanage/:orphanageId/children" 
                element={
                  <ProtectedRoute role="PARENT">
                    <OrphanageChildren />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/children" 
                element={
                  <ProtectedRoute role="PARENT">
                    <ChildrenList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/children/:id" 
                element={
                  <ProtectedRoute role="PARENT">
                    <ChildDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-requests" 
                element={
                  <ProtectedRoute role="PARENT">
                    <AdoptionRequests />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Routes for Orphanages */}
              <Route 
                path="/orphanage/dashboard" 
                element={
                  <ProtectedRoute role="ORPHANAGE">
                    <OrphanageDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/manage-children" 
                element={
                  <ProtectedRoute role="ORPHANAGE">
                    <ManageChildren />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/adoption-requests" 
                element={
                  <ProtectedRoute role="ORPHANAGE">
                    <AdoptionRequests />
                  </ProtectedRoute>
                } 
              />
              
              {/* Common Protected Routes */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;

