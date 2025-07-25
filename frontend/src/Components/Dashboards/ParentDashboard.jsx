import React, { useState, useEffect } from 'react';
import { FaHome, FaBuilding, FaUserEdit, FaKey, FaSignOutAlt } from 'react-icons/fa';
import Orphanages from "../../Components/Add/OrphanagesList";

const ParentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState('dashboard');
  const [totalRequests, setTotalRequests] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
    const parentRequests = allRequests.filter(req => req.parentId === user?.id);

    setTotalRequests(parentRequests.length);
    setAcceptedCount(parentRequests.filter(r => r.status === "accepted").length);
    setRejectedCount(parentRequests.filter(r => r.status === "rejected").length);
  }, [user?.id]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = '/home';
  };

  if (!user || user.role !== "parent") {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-danger">Unauthorized Access</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-4 d-flex flex-column">
          <h4 className="text-center mb-4">Parent Panel</h4>

          <div className={`p-2 mb-2 rounded ${activeTab === 'dashboard' ? 'bg-primary' : ''}`} role="button" onClick={() => setActiveTab('dashboard')}>
            <FaHome className="me-2" />
            Dashboard
          </div>

          <div className={`p-2 mb-2 rounded ${activeTab === 'orphanages' ? 'bg-primary' : ''}`} role="button" onClick={() => setActiveTab('orphanages')}>
            <FaBuilding className="me-2" />
            Orphanages
          </div>

          <div className={`p-2 mb-2 rounded ${activeTab === 'update-profile' ? 'bg-primary' : ''}`} role="button" onClick={() => setActiveTab('update-profile')}>
            <FaUserEdit className="me-2" />
            Update Profile
          </div>

          <div className={`p-2 mb-2 rounded ${activeTab === 'change-password' ? 'bg-primary' : ''}`} role="button" onClick={() => setActiveTab('change-password')}>
            <FaKey className="me-2" />
            Change Password
          </div>

          <div className="p-2 mb-2 rounded mt-auto" role="button" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4 bg-light">
          <h3 className="mb-4">Welcome, {user.name} 👋</h3>

          {activeTab === 'dashboard' && (
            <>
              <div className="d-flex gap-4 flex-wrap mb-4">
                <div className="bg-primary text-white p-4 rounded shadow" style={{ minWidth: "260px" }}>
                  <h5>Total Requests Made</h5>
                  <h2>{totalRequests}</h2>
                </div>
                <div className="bg-primary text-white p-4 rounded shadow" style={{ minWidth: "260px" }}>
                  <h5>Adoption Status</h5>
                  <div><strong>Accepted:</strong> {acceptedCount}</div>
                  <div><strong>Rejected:</strong> {rejectedCount}</div>
                </div>
              </div>

              <div className="card shadow p-4 mb-3" style={{ maxWidth: "600px" }}>
                <h5>Parent Information</h5>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>City:</strong> {user.city}, <strong>State:</strong> {user.state}</p>
              </div>
            </>
          )}

          {activeTab === 'orphanages' && (
            <div>
              <Orphanages />
            </div>
          )}

          {activeTab === 'update-profile' && (
            <div className="card shadow p-4" style={{ maxWidth: "600px" }}>
              <h5 className="mb-3">Update Profile</h5>
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="name" value={profileData.name} onChange={handleProfileChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={profileData.email} onChange={handleProfileChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-control" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" value={profileData.address} onChange={handleProfileChange} />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" name="city" value={profileData.city} onChange={handleProfileChange} />
                  </div>
                  <div className="col">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="state" value={profileData.state} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input type="text" className="form-control" name="pincode" value={profileData.pincode} onChange={handleProfileChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
              </form>
            </div>
          )}

          {activeTab === 'change-password' && (
            <div className="card shadow p-4" style={{ maxWidth: "600px" }}>
              <h5 className="mb-3">Change Password</h5>
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-control" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-control" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
