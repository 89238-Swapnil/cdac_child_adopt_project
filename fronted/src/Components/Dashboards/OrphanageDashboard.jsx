import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChildrenSection from '../Add/ChildrenSection';

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

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar" style={{ minHeight: '100vh' }}>
          <div className="text-center p-4">
            <h4 className="mb-0" style={{ color: '#1E90FF' }}>{orphanageData.name}</h4>
            <small>Admin: {orphanageData.adminName}</small>
          </div>
          <hr className="bg-light" />
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-white ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-white ${activeTab === 'orphanage' ? 'active' : ''}`}
                onClick={() => setActiveTab('orphanage')}
              >
                Orphanage Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-white ${activeTab === 'children' ? 'active' : ''}`}
                onClick={() => setActiveTab('children')}
              >
                Children
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-white ${activeTab === 'requests' ? 'active' : ''}`}
                onClick={() => setActiveTab('requests')}
              >
                Adoption Requests
              </button>
            </li>
          </ul>
        </div>

        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {activeTab === 'children' && (
            <ChildrenSection children={children} setChildren={setChildren} />
          )}

          {activeTab === 'dashboard' && (
            <div className="mt-4">
              <h3 className="mb-4">Dashboard Overview</h3>
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card text-white bg-primary mb-3 shadow" style={{ borderRadius: '10px' }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">Total Children</h5>
                      <h2>{children.length}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-primary mb-3 shadow" style={{ borderRadius: '10px' }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">Available Children</h5>
                      <h2>{children.filter(c => c.status === 'Available').length}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-primary mb-3 shadow" style={{ borderRadius: '10px' }}>
                    <div className="card-body text-center">
                      <h5 className="card-title">Pending Requests</h5>
                      <h2>{adoptionRequests.filter(r => r.status === 'Pending').length}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4>Pending Adoption Requests</h4>
                {adoptionRequests.filter(req => req.status === 'Pending').length === 0 ? (
                  <p className="text-muted">No pending requests.</p>
                ) : (
                  adoptionRequests.filter(req => req.status === 'Pending').map((req) => (
                    <div key={req.id} className="card mb-3 shadow-sm">
                      <div className="card-body">
                        <h5>Child: {req.childName}</h5>
                        <p><strong>Requested By:</strong> {req.parentName}</p>
                        <p><strong>Email:</strong> {req.parentEmail}</p>
                        <p><strong>Phone:</strong> {req.parentPhone}</p>
                        <p><strong>Address:</strong> {req.parentAddress}</p>
                        <p><strong>Profession:</strong> {req.parentProfession}</p>
                        <div className="d-flex gap-2 mt-2">
                          <button className="btn btn-success" onClick={() => handleRequestAction(req.id, 'Approved')}>Accept</button>
                          <button className="btn btn-danger" onClick={() => handleRequestAction(req.id, 'Rejected')}>Reject</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'orphanage' && (
            <div className="mt-4">
              <h3>Orphanage Details</h3>
              {!editMode ? (
                <div className="card p-4 shadow-sm">
                  <p><strong>Name:</strong> {orphanageData.name}</p>
                  <p><strong>Admin:</strong> {orphanageData.adminName}</p>
                  <p><strong>Email:</strong> {orphanageData.email}</p>
                  <p><strong>Phone:</strong> {orphanageData.phone}</p>
                  <p><strong>Address:</strong> {orphanageData.address}, {orphanageData.city}, {orphanageData.state} - {orphanageData.pincode}</p>
                  <p><strong>Capacity:</strong> {orphanageData.capacity}</p>
                  <p><strong>Established:</strong> {orphanageData.established || 'N/A'}</p>
                  <button className="btn btn-primary mt-2" onClick={() => setEditMode(true)}>Edit</button>
                </div>
              ) : (
                <div className="card p-4 shadow-sm">
                  <div className="form-group mb-2">
                    <label>Name</label>
                    <input className="form-control" name="name" value={orphanageData.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mb-2">
                    <label>Phone</label>
                    <input className="form-control" name="phone" value={orphanageData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mb-2">
                    <label>Address</label>
                    <input className="form-control" name="address" value={orphanageData.address} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mb-2">
                    <label>City</label>
                    <input className="form-control" name="city" value={orphanageData.city} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mb-2">
                    <label>State</label>
                    <input className="form-control" name="state" value={orphanageData.state} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mb-2">
                    <label>Pincode</label>
                    <input className="form-control" name="pincode" value={orphanageData.pincode} onChange={handleInputChange} />
                  </div>
                  <div className="form-group mb-2">
                    <label>Established</label>
                    <input className="form-control" name="established" value={orphanageData.established} onChange={handleInputChange} />
                  </div>
                  <button className="btn btn-success me-2" onClick={handleSaveDetails}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrphanageDashboard;
