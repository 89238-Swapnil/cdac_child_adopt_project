import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrphanageCard = ({ orphanage }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/orphanages/${orphanage.id}`, { state: { orphanage } });
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={orphanage.image} 
        height="200"
        style={{ objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Orphanage';
        }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title>{orphanage.name}</Card.Title>
          <Button 
            variant="link" 
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaHeart color={isFavorite ? "red" : "gray"} />
          </Button>
        </div>
        
        <div className="mb-2">
          <small className="text-muted">
            <FaMapMarkerAlt className="me-1" />
            {orphanage.city}, {orphanage.state}
          </small>
        </div>
        
        <Card.Text className="flex-grow-1">
          {orphanage.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
          <small>
            <FaUsers className="me-1" />
            {orphanage.childrenCount} children
          </small>
          <span className={`badge ${orphanage.available ? 'bg-success' : 'bg-secondary'}`}>
            {orphanage.available ? 'Available' : 'Full'}
          </span>
        </div>

        <Button variant="primary" onClick={handleViewDetails}>View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default OrphanageCard;
