import React, { useEffect, useState } from 'react';
import OrphanageCard from '../../Components/Card/OrphanageCard';
import { Container, Row, Col } from 'react-bootstrap';

const Orphanages = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const registeredOrphanages = users
      .filter(user => user.role === "admin")
      .map((user, index) => {
        const imageSrc =
          user.imageFile ||
          user.image ||
          "https://source.unsplash.com/400x300/?children,orphanage";

        return {
          id: index + 1,
          name: user.name || user.orphanageName || "Orphanage",
          image: imageSrc,
          city: user.city || "Unknown City",
          state: user.state || "Unknown State",
          description: user.description || "Registered orphanage.",
          childrenCount: user.children?.length || 0,
          available: (user.children?.length || 0) > 0,
        };
      });

    setTimeout(() => {
      setOrphanages(registeredOrphanages);
      setLoading(false);
    }, 500); // Simulated delay
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h3>Loading orphanages...</h3>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Available Orphanages</h2>
      <Row>
        {orphanages.length > 0 ? (
          orphanages.map((orphanage) => (
            <Col key={orphanage.id} md={4} className="mb-4">
              <OrphanageCard orphanage={orphanage} />
            </Col>
          ))
        ) : (
          <p className="text-center">No orphanages found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Orphanages;
