import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChildrenSection from '../Add/ChildrenSection';
import { FaBars, FaHome, FaInfoCircle, FaChild, FaEnvelope, FaUserCog } from 'react-icons/fa';

const OrphanageDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orphanageData, setOrphanageData] = useState({
    name: '',
    adminName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    capacity: 50,
    currentChildren: 0,
    established: ''
  });

  const [children, setChildren] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [showRequestDetails, setShowRequestDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setOrphanageData(prev => ({
        ...prev,
        name: userData.orphanageName || 'Your Orphanage',
        adminName: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address,
        city: userData.city,
        state: userData.state,
        pincode: userData.pincode
      }));
    }

    setChildren([
      { id: 1, name: 'Aarav', age: 3, gender: 'Male', joinedDate: '2022-01-15', status: 'Available' },
      { id: 2, name: 'Priya', age: 5, gender: 'Female', joinedDate: '2021-11-20', status: 'Available' },
      { id: 3, name: 'Rohan', age: 2, gender: 'Male', joinedDate: '2023-03-10', status: 'Processing' }
    ]);

    setAdoptionRequests([
      {
        id: 1,
        childId: 1,
        childName: 'Aarav',
        parentName: 'Neha & Raj Patel',
        parentEmail: 'neha.patel@example.com',
        parentPhone: '+91 9876543211',
        parentAddress: '456 Sunshine Apartments, Mumbai',
        parentProfession: 'Doctors',
        status: 'Pending',
        requestDate: '2023-05-15'
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrphanageData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = () => {
    alert('Orphanage details updated successfully!');
    setEditMode(false);
  };

  const handleRequestAction = (requestId, action) => {
    setAdoptionRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: action } : req
      )
    );

    if (action === 'Approved') {
      const request = adoptionRequests.find(req => req.id === requestId);
      setChildren(prev =>
        prev.map(child =>
          child.id === request.childId ? { ...child, status: 'Adopted' } : child
        )
      );
    }

    alert(`Request ${action.toLowerCase()} successfully!`);
    setShowRequestDetails(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Mobile Header */}
      <div className="d-md-none bg-dark text-white p-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-light btn-sm" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h5 className="mb-0 text-center flex-grow-1" style={{ color: '#1E90FF' }}>
          {orphanageData.name}
        </h5>
      </div>

      <div className="row">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="col-md-3 col-lg-2 bg-dark text-white sidebar" style={{ minHeight: '100vh' }}>
            <div className="text-center p-4 d-none d-md-block">
              <h4 className="mb-0" style={{ color: '#1E90FF' }}>{orphanageData.name}</h4>
              <small>Admin: {orphanageData.adminName}</small>
            </div>
            <hr className="bg-light" />
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white text-start ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('dashboard');
                    if (window.innerWidth <= 768) setSidebarOpen(false);
                  }}
                >
                  <FaHome className="me-2" /> Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white text-start ${activeTab === 'orphanage' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('orphanage');
                    if (window.innerWidth <= 768) setSidebarOpen(false);
                  }}
                >
                  <FaInfoCircle className="me-2" /> Orphanage Details
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white text-start ${activeTab === 'children' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('children');
                    if (window.innerWidth <= 768) setSidebarOpen(false);
                  }}
                >
                  <FaChild className="me-2" /> Children
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-white text-start ${activeTab === 'requests' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('requests');
                    if (window.innerWidth <= 768) setSidebarOpen(false);
                  }}
                >
                  <FaEnvelope className="me-2" /> Adoption Requests
                </button>
              </li>
              <li className="nav-item d-md-none">
                <button
                  className="nav-link btn btn-link text-white text-start"
                  onClick={handleLogout}
                >
                  <FaUserCog className="me-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Main Content */}
        <div className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 ${!sidebarOpen ? 'col-12' : ''}`}>
          <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h4">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'orphanage' && 'Orphanage Details'}
              {activeTab === 'children' && 'Children Management'}
              {activeTab === 'requests' && 'Adoption Requests'}
            </h2>
            
          </div>

          {activeTab === 'children' && (
            <ChildrenSection children={children} setChildren={setChildren} />
          )}

          {activeTab === 'dashboard' && (
            <div className="mt-4">
              <div className="row mb-4 g-3">
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="card text-white bg-primary h-100 shadow" style={{ borderRadius: '10px' }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">Total Children</h5>
                      <h2>{children.length}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="card text-white bg-success h-100 shadow" style={{ borderRadius: '10px' }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">Available Children</h5>
                      <h2>{children.filter(c => c.status === 'Available').length}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="card text-white bg-warning h-100 shadow" style={{ borderRadius: '10px' }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">Pending Requests</h5>
                      <h2>{adoptionRequests.filter(r => r.status === 'Pending').length}</h2>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h4 className="card-title">Pending Adoption Requests</h4>
                  {adoptionRequests.filter(req => req.status === 'Pending').length === 0 ? (
                    <p className="text-muted">No pending requests.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Child</th>
                            <th>Requested By</th>
                            <th>Contact</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adoptionRequests.filter(req => req.status === 'Pending').map((req) => (
                            <tr key={req.id}>
                              <td>{req.childName}</td>
                              <td>{req.parentName}</td>
                              <td>
                                <div>{req.parentEmail}</div>
                                <div>{req.parentPhone}</div>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button 
                                    className="btn btn-sm btn-success" 
                                    onClick={() => handleRequestAction(req.id, 'Approved')}
                                  >
                                    Accept
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-danger" 
                                    onClick={() => handleRequestAction(req.id, 'Rejected')}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orphanage' && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title">Orphanage Details</h3>
                {!editMode ? (
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Name:</strong> {orphanageData.name}</p>
                      <p><strong>Admin:</strong> {orphanageData.adminName}</p>
                      <p><strong>Email:</strong> {orphanageData.email}</p>
                      <p><strong>Phone:</strong> {orphanageData.phone}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Address:</strong> {orphanageData.address}, {orphanageData.city}, {orphanageData.state} - {orphanageData.pincode}</p>
                      <p><strong>Capacity:</strong> {orphanageData.capacity}</p>
                      <p><strong>Established:</strong> {orphanageData.established || 'N/A'}</p>
                    </div>
                    <div className="col-12 mt-3">
                      <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Details</button>
                    </div>
                  </div>
                ) : (
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input className="form-control" name="name" value={orphanageData.name} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input className="form-control" name="phone" value={orphanageData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input className="form-control" name="address" value={orphanageData.address} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input className="form-control" name="city" value={orphanageData.city} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input className="form-control" name="state" value={orphanageData.state} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Pincode</label>
                          <input className="form-control" name="pincode" value={orphanageData.pincode} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Established</label>
                          <input className="form-control" name="established" value={orphanageData.established} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-success" onClick={handleSaveDetails}>Save</button>
                      <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title">All Adoption Requests</h3>
                {adoptionRequests.length === 0 ? (
                  <p className="text-muted">No adoption requests found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Child</th>
                          <th>Parent</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adoptionRequests.map((req) => (
                          <tr key={req.id}>
                            <td>{req.childName}</td>
                            <td>{req.parentName}</td>
                            <td>
                              <span className={`badge ${
                                req.status === 'Approved' ? 'bg-success' :
                                req.status === 'Rejected' ? 'bg-danger' : 'bg-warning'
                              }`}>
                                {req.status}
                              </span>
                            </td>
                            <td>{req.requestDate}</td>
                            <td>
                              {req.status === 'Pending' && (
                                <div className="d-flex gap-2">
                                  <button 
                                    className="btn btn-sm btn-success" 
                                    onClick={() => handleRequestAction(req.id, 'Approved')}
                                  >
                                    Accept
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-danger" 
                                    onClick={() => handleRequestAction(req.id, 'Rejected')}
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrphanageDashboard;