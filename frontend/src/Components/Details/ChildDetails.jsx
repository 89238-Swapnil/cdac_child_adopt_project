import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ChildDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const child = state?.child;

  const handleAdopt = () => {
  navigate("/adoption-form", { state: { child } });
};


  if (!child) {
    return (
      <Container className="text-center mt-5">
        <h4>No child data provided.</h4>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={5}>
          <img
            src={child.image || 'https://via.placeholder.com/300x200?text=Child'}
            alt={child.name}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={7}>
          <h2>{child.name}</h2>
          <p><strong>Age:</strong> {child.age}</p>
          <p><strong>Gender:</strong> {child.gender}</p>
          <p><strong>Bio:</strong> {child.bio}</p>
          <div className="d-flex">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="success" className="ms-2" onClick={handleAdopt}>
              Adopt
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChildDetails;