// src/Components/Forms/AdoptionForm.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const AdoptionForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const child = state?.child || {};

  const [formData, setFormData] = useState({
    nationality: "",
    childId: child.childId || "",
    applicant_gender: "",
    permanent_address: "",
    spouse_name: "",
    spouse_gender: "",
    occupation: "",
    annual_income: "",
    company_details: "",
    qualification: "",
    adoption_reason: "",
    biologicalChildren: "",
    pancard: "",
    identity_proof: "",
    address_proof: "",
    income_proof: "",
    nonCriminal_certificate: "",
    nationality_certificate: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0].name });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Adoption request submitted!");
    console.log(formData);
    // Later: Save to localStorage or send to backend
    navigate("/");
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow">
        <h3 className="mb-4 text-center">Adoption Request Form</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nationality</Form.Label>
                <Form.Control name="nationality" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Applicant Gender</Form.Label>
                <Form.Select name="applicant_gender" onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Permanent Address</Form.Label>
                <Form.Control name="permanent_address" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Spouse Name</Form.Label>
                <Form.Control name="spouse_name" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Spouse Gender</Form.Label>
                <Form.Select name="spouse_gender" onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Occupation</Form.Label>
                <Form.Control name="occupation" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Annual Income</Form.Label>
                <Form.Control name="annual_income" type="number" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Details</Form.Label>
                <Form.Control name="company_details" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Qualification</Form.Label>
                <Form.Control name="qualification" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Reason for Adoption</Form.Label>
                <Form.Control name="adoption_reason" as="textarea" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Biological Children</Form.Label>
                <Form.Control name="biologicalChildren" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Card</Form.Label>
                <Form.Control name="pancard" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4">Upload Documents</h5>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Identity Proof</Form.Label>
                <Form.Control type="file" name="identity_proof" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Address Proof</Form.Label>
                <Form.Control type="file" name="address_proof" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Income Proof</Form.Label>
                <Form.Control type="file" name="income_proof" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Non-Criminal Certificate</Form.Label>
                <Form.Control type="file" name="nonCriminal_certificate" onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Nationality Certificate</Form.Label>
                <Form.Control type="file" name="nationality_certificate" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="primary">Submit Request</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AdoptionForm;
