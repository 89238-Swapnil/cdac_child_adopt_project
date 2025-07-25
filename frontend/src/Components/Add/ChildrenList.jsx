import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ChildDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const child = state?.child;

  const handleAdopt = () => {
    alert(`Adoption request sent for ${child.name}`);
    // Later: store in localStorage or send to backend
  };

  if (!child) {
    return (
      <Container className="text-center mt-5">
        <h4>No child data provided.</h4>
      </Container>
    );
  }

  // Validate image: if not present or invalid, fallback
  const imageUrl =
    child.image && child.image.startsWith("http")
      ? child.image
      : "https://via.placeholder.com/300x200?text=Child";

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={5}>
          <img
            src={imageUrl}
            alt={child.name}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={7}>
          <h2>{child.name}</h2>
          <p><strong>Age:</strong> {child.age}</p>
          <p><strong>Gender:</strong> {child.gender}</p>
          <p><strong>Bio:</strong> {child.bio}</p>
          <div className="d-flex gap-2 mt-3">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="success" onClick={handleAdopt}>
              Adopt
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChildDetails;
