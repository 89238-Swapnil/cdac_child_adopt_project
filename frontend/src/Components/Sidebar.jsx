"use client"
import React from "react"
import { ListGroup } from "react-bootstrap"

export default function Sidebar() {
  return (
    <div className="p-3 border rounded bg-light">
      <h5>Filters</h5>
      <ListGroup>
        <ListGroup.Item>City</ListGroup.Item>
        <ListGroup.Item>Gender</ListGroup.Item>
        <ListGroup.Item>Age Group</ListGroup.Item>
      </ListGroup>
    </div>
  )
}
