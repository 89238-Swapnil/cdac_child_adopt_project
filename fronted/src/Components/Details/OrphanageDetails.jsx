import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const OrphanageDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orphanage = state?.orphanage;

  const handleShowChildren = () => {
    navigate('/children-list', {
      state: {
        orphanageId: orphanage.id, // must match orphanageId in child
        orphanageName: orphanage.name
      }
    });
  };

  if (!orphanage) {
    return <Container className="text-center mt-5"><h4>No Orphanage Data</h4></Container>;
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <img 
            src={orphanage.image || 'https://via.placeholder.com/400x300?text=Orphanage'} 
            alt={orphanage.name} 
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h2>{orphanage.name}</h2>
          <p><strong>Location:</strong> {orphanage.city}, {orphanage.state}</p>
          <p><strong>Children Available:</strong> {orphanage.childrenCount}</p>
          <p><strong>Description:</strong> {orphanage.description}</p>
          <p><strong>Status:</strong> 
            <span className={`badge ms-2 ${orphanage.available ? 'bg-success' : 'bg-secondary'}`}>
              {orphanage.available ? 'Available' : 'Full'}
            </span>
          </p>

          <Button variant="primary" onClick={handleShowChildren}>
            Show Available Children
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OrphanageDetails;
