import React, { useEffect, useState } from 'react';
import ChildCard from '../Card/ChildCard';
import { Container, Row, Col, Form } from 'react-bootstrap';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Get all orphanage users with children
    const orphanagesWithChildren = users
      .filter(user => user.role === "admin" && Array.isArray(user.children))
      .flatMap(orphanage => {
        return orphanage.children.map(child => ({
          ...child,
          orphanageName: orphanage.name, // Add orphanage info if needed
        }));
      });

    setChildren(orphanagesWithChildren);
    setFiltered(orphanagesWithChildren);
  }, []);

  useEffect(() => {
    let filteredData = [...children];

    if (gender) {
      filteredData = filteredData.filter(child => child.gender?.toLowerCase() === gender.toLowerCase());
    }

    if (age) {
      filteredData = filteredData.filter(child => String(child.age) === age);
    }

    setFiltered(filteredData);
  }, [gender, age, children]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Available Children for Adoption</h2>

      <Form className="mb-4 d-flex gap-3 justify-content-center">
        <Form.Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="">Filter by Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </Form.Select>

        <Form.Select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="">Filter by Age</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </Form.Select>
      </Form>

      <Row className="justify-content-center">
        {filtered.length > 0 ? (
          filtered.map((child, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <ChildCard child={child} />
            </Col>
          ))
        ) : (
          <p className="text-center">No children found with the selected filters.</p>
        )}
      </Row>
    </Container>
  );
};

export default ChildrenList;
