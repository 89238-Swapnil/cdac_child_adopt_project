import React, { useState } from 'react';

const ChildrenSection = () => {
 const [children, setChildren] = useState([
  {
    id: 1,
    name: 'Anjali',
    age: '8',
    gender: 'Female',
    status: 'Available',
    education: '2nd Grade',
    blood_group: 'A+',
    colour_complexity: 'Fair',
    deficiency: 'None',
    medical_history: 'Healthy',
    other: 'Loves drawing and storytelling',
    joinedDate: '2023-06-01',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 2,
    name: 'Rahul',
    age: '10',
    gender: 'Male',
    status: 'Available',
    education: '4th Grade',
    blood_group: 'B+',
    colour_complexity: 'Wheatish',
    deficiency: 'Mild Anemia',
    medical_history: 'Under observation',
    other: 'Enjoys cricket and reading comics',
    joinedDate: '2022-09-15',
    image: 'https://images.unsplash.com/photo-1627201261872-edd6b5ed505e?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 3,
    name: 'Sneha',
    age: '7',
    gender: 'Female',
    status: 'Available',
    education: '1st Grade',
    blood_group: 'O+',
    colour_complexity: 'Dusky',
    deficiency: 'None',
    medical_history: 'Healthy',
    other: 'Sings beautifully',
    joinedDate: '2024-02-11',
    image: 'https://images.unsplash.com/photo-1554189097-ffe88e998a2b?auto=format&fit=crop&w=400&q=60'
  }
]);


  const [showAddForm, setShowAddForm] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);

  const initialForm = {
    name: '',
    age: '',
    status: 'Available',
    education: '',
    gender: 'Male',
    blood_group: '',
    colour_complexity: '',
    deficiency: '',
    medical_history: '',
    other: '',
    image: '',
    joinedDate: ''
  };

  const [childForm, setChildForm] = useState(initialForm);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChildForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setChildForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddChild = () => {
    if (!childForm.name || !childForm.age) {
      alert('Please fill required fields.');
      return;
    }

    const newChild = {
      ...childForm,
      id: editingChild ? editingChild.id : Date.now()
    };

    if (editingChild) {
      setChildren((prev) => prev.map((child) => (child.id === editingChild.id ? newChild : child)));
      setEditingChild(null);
    } else {
      setChildren((prev) => [...prev, newChild]);
    }

    setChildForm(initialForm);
    setShowAddForm(false);
  };

  const handleEditChild = (child) => {
    setEditingChild(child);
    setChildForm(child);
    setShowAddForm(true);
  };

  const handleDeleteChild = (id) => {
    if (window.confirm('Are you sure you want to remove this child?')) {
      setChildren((prev) => prev.filter((child) => child.id !== id));
      setSelectedChild(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">Children</h3>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setShowAddForm(true);
          setEditingChild(null);
          setChildForm(initialForm);
        }}
      >
        Add Child
      </button>

      {showAddForm && (
        <div className="card p-3 mb-4">
          <div className="row">
            <div className="col-md-4">
              {childForm.image && <img src={childForm.image} alt="Preview" className="img-fluid rounded mb-3" />}
              <input type="file" name="image" accept="image/*" className="form-control" onChange={handleInputChange} />
            </div>
            <div className="col-md-8">
              {[
                'name',
                'age',
                'education',
                'blood_group',
                'colour_complexity',
                'deficiency',
                'medical_history',
                'other',
                'joinedDate'
              ].map((field) => (
                <div className="mb-2" key={field}>
                  <input
                    type={field === 'age' ? 'number' : field === 'joinedDate' ? 'date' : 'text'}
                    name={field}
                    placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    className="form-control"
                    value={childForm[field]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}

              <div className="mb-2">
                <select name="gender" className="form-control" value={childForm.gender} onChange={handleInputChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-2">
                <select name="status" className="form-control" value={childForm.status} onChange={handleInputChange}>
                  <option value="Available">Available</option>
                  <option value="Processing">Processing</option>
                  <option value="Adopted">Adopted</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={handleAddChild}>
                {editingChild ? 'Update' : 'Add'} Child
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {children.length === 0 ? (
          <p className="text-muted text-center">No children added yet.</p>
        ) : (
          children.map((child) => (
            <div key={child.id} className="col-md-4 mb-4">
              <div className="card h-100" onClick={() => setSelectedChild(child)} style={{ cursor: 'pointer' }}>
                {child.image && (
                  <img
                    src={child.image}
                    alt={child.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{child.name}</h5>
                  <p className="card-text">Age: {child.age}</p>
                  <p className="card-text">Status: {child.status}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedChild && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedChild.name}'s Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedChild(null)}></button>
              </div>
              <div className="modal-body">
                {selectedChild.image && (
                  <img src={selectedChild.image} alt={selectedChild.name} className="img-fluid rounded mb-3" />
                )}
                {Object.entries(selectedChild).map(([key, value]) =>
                  key !== 'id' && key !== 'image' ? (
                    <p key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                    </p>
                  ) : null
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    handleEditChild(selectedChild);
                    setSelectedChild(null);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteChild(selectedChild.id)}>
                  Delete
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedChild(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenSection;
