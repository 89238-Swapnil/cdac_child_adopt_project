import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import children from '../../Data/Children';

const ChildrenList = () => {
  const navigate = useNavigate();

  const handleViewDetails = (child) => {
    navigate("/child-details", { state: { child } });
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Available Children</h2>
      <Row>
        {children.map((child) => (
          <Col md={4} key={child.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={child.image} />
              <Card.Body>
                <Card.Title>{child.name}</Card.Title>
                <Card.Text>Age: {child.age}</Card.Text>
                <Card.Text>Gender: {child.gender}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(child)}
                >
                  View Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ChildrenList;
