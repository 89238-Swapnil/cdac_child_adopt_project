import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page" style={{ minHeight: "100vh" }}>
      {/* Main Content */}
      <main className="container py-5">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline-secondary mb-4"
        >
          ← Back
        </button>
        
        <h2 className="text-center mb-4">About AdoptCare</h2>
        <div className="about-content" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="lead">
            AdoptCare is a compassionate platform dedicated to connecting loving families with children in need of permanent homes.
          </p>
          
          <div className="mt-4">
            <h4>Our Mission</h4>
            <p>
              We simplify the adoption process while maintaining the highest standards of child safety and family vetting.
            </p>
          </div>

          <div className="mt-4">
            <h4>Key Features</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Verified network of orphanages</li>
              <li className="list-group-item">Streamlined matching system</li>
              <li className="list-group-item">Secure document management</li>
              <li className="list-group-item">24/7 support</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;