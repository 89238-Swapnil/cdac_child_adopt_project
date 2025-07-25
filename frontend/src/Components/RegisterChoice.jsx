import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const RegisterChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Register As</h2>
      <div className="d-grid gap-3 col-6 mx-auto">
        <Button variant="success" onClick={() => navigate("/signupparent")}>
          Register as Parent
        </Button>
        <Button variant="primary" onClick={() => navigate("/signup")}>
          Register as Orphanage
        </Button>
      </div>
    </div>
  );
};

export default RegisterChoice;
