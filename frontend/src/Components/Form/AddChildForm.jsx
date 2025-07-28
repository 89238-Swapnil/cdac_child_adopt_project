import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

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

const AddChildForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age) {
      alert('Please fill required fields.');
      return;
    }

    const newChild = {
      ...formData,
      id: Date.now()
    };

    const existing = JSON.parse(localStorage.getItem("children")) || [];
    localStorage.setItem("children", JSON.stringify([...existing, newChild]));

    setSuccess(true);
    setFormData(initialForm);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="mb-4 text-center">Add New Child</h3>

          {success && <Alert variant="success">Child added successfully!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                {formData.image && <img src={formData.image} alt="Preview" className="img-fluid rounded mb-3" />}
                <Form.Group>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" name="image" accept="image/*" onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={8}>
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
                  <Form.Group className="mb-2" key={field}>
                    <Form.Control
                      type={field === 'age' ? 'number' : field === 'joinedDate' ? 'date' : 'text'}
                      name={field}
                      value={formData[field]}
                      placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      onChange={handleInputChange}
                      required={field === 'name' || field === 'age'}
                    />
                  </Form.Group>
                ))}

                <Form.Group className="mb-2">
                  <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Available">Available</option>
                    <option value="Processing">Processing</option>
                    <option value="Adopted">Adopted</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Add Child
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddChildForm;
