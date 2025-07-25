"use client"
import React from "react"
import { Modal, Button } from "react-bootstrap"

export default function AuthModal({ isOpen, onClose, mode, userType, onModeChange }) {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "login" ? "Sign In" : "Sign Up"} as {userType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add Form Here */}
        <p>Form for {mode} ({userType}) goes here.</p>
        <Button variant="link" onClick={() => onModeChange(mode === "login" ? "register" : "login")}>
          Switch to {mode === "login" ? "Sign Up" : "Sign In"}
        </Button>
      </Modal.Body>
    </Modal>
  )
}
