import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ChildDetails = () => {
  const { state } = useLocation();
  const child = state?.child;
  const navigate = useNavigate();

  if (!child) return <p className="text-center mt-5">Child not found.</p>;

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <Row>
          {/* Left Column - Child Image */}
          <Col md={5} className="d-flex align-items-center">
            <Card.Img
              src={child.image}
              alt={child.name}
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '10px' }}
            />
          </Col>

          {/* Right Column - Details */}
          <Col md={7}>
            <Card.Body>
              <Card.Title className="mb-4">
                <h3>{child.name}</h3>
              </Card.Title>
            <Card.Text>
  <strong>Orphanage:</strong> {child.orphanage} <br />
  <strong>Age:</strong> {child.age} <br />
  <strong>Gender:</strong> {child.gender} <br />
  <strong>Education:</strong> {child.education} <br />
  <strong>Blood Group:</strong> {child.blood_group} <br />
  <strong>Complexion:</strong> {child.colour_complexity} <br />
  <strong>Deficiency:</strong> {child.deficiency} <br />
  <strong>Medical History:</strong> {child.medical_history}
</Card.Text>

              <div className="d-flex gap-2 mt-4">
  <Button
    variant="primary"
    onClick={() => {
      alert("Adoption request was sent successfully!");
      // You can also store this request to localStorage or backend here
    }}
  >
    Adopt
  </Button>

  <Button variant="secondary" onClick={() => navigate(-1)}>
    Back
  </Button>
</div>

            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ChildDetails;
