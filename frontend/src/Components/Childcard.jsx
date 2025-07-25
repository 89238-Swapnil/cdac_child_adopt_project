"use client"
import React from "react"
import { Card, Badge } from "react-bootstrap"

export default function ChildCard({ child }) {
  return (
    <Card style={{ width: '18rem' }} className="mb-4">
      <Card.Img variant="top" src={child.image} />
      <Card.Body>
        <Card.Title>{child.name}</Card.Title>
        <Card.Text>
          Age: {child.age}<br />
          Gender: {child.gender}<br />
          City: {child.city}, {child.state}<br />
          Orphanage: {child.orphanage}<br />
        </Card.Text>
        <Badge bg={child.specialNeeds ? "warning" : "success"}>
          {child.specialNeeds ? "Special Needs" : "Healthy"}
        </Badge>
      </Card.Body>
    </Card>
  )
}
