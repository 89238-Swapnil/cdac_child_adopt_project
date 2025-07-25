import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

const statesList = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    profession: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    orphanageName: '',
    adminName: '',
    imageFile: null,
  });

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      ...formData,
      name: formData.role === 'admin' ? formData.orphanageName : formData.name,
      imageUrl: formData.imageFile?.name || '',
    };

    if (formData.role === 'admin') {
      delete userData.orphanageName;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(userData));

    alert("Registered successfully!");
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>

      {!formData.role && (
        <div className="text-center mb-4">
          <h5>Select Registration Type</h5>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => handleRoleSelect('parent')}
            >
              Register As Parent
            </button>
            <button
              className="btn btn-success btn-lg"
              onClick={() => handleRoleSelect('admin')}
            >
              Register As Orphanage
            </button>
          </div>
        </div>
      )}

      {formData.role && (
        <Form onSubmit={handleSignUp}>
          {formData.role === 'admin' ? (
            <>
              <Form.Group controlId="orphanageName" className="mb-3">
                <Form.Label>Orphanage Name<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="orphanageName"
                  value={formData.orphanageName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="adminName" className="mb-3">
                <Form.Label>Admin Name<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone Number<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Full Name<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone Number<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="profession" className="mb-3">
                <Form.Label>Profession<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </>
          )}

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email<span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {formData.role === 'admin' && (
            <>
              <Form.Group controlId="address" className="mb-3">
                <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group controlId="city" className="mb-3">
                    <Form.Label>City<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="state" className="mb-3">
                    <Form.Label>State<span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select State</option>
                      {statesList.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="pincode" className="mb-3">
                    <Form.Label>Pincode<span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="imageFile" className="mb-3">
                <Form.Label>Upload Image<span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="file"
                  name="imageFile"
                  onChange={handleInputChange}
                  accept="image/*"
                  required
                />
              </Form.Group>
            </>
          )}

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      )}
    </div>
  );
};

export default SignUp;
