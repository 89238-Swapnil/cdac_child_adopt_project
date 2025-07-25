import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ChildCard = ({ child }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/child/${child.child_id}`, { state: { child } });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={child.image} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{child.name}</Card.Title>
        <Card.Text>
          Age: {child.age}<br />
          Gender: {child.gender}<br />
          Education: {child.education}
        </Card.Text>
        <Button variant="primary" onClick={handleViewProfile}>View Profile</Button>
      </Card.Body>
    </Card>
  );
};

export default ChildCard;
