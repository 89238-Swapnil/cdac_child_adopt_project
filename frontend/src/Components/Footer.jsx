import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-5"
      style={{ 
        backgroundColor: "#000000", // black background
        color: "#ffffff" // white text
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h2 className="mb-3" style={{ color: "#ffffff" }}>AdoptCare</h2>
            <p style={{ color: "#ffffff" }}>
              Connecting loving families with children who need homes.<br />
              We believe every child deserves a loving family and every family deserves the joy of a child.
            </p>
          </div>
          
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3" style={{ color: "#ffffff" }}>About Us</h5>
            <ul className="list-unstyled">
              <li><a href="/our-story" className="text-decoration-none" style={{ color: "#ffffff" }}>Our Story</a></li>
              <li><a href="/mission" className="text-decoration-none" style={{ color: "#ffffff" }}>Mission & Vision</a></li>
              <li><a href="/team" className="text-decoration-none" style={{ color: "#ffffff" }}>Our Team</a></li>
              <li><a href="/careers" className="text-decoration-none" style={{ color: "#ffffff" }}>Careers</a></li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5 className="mb-3" style={{ color: "#ffffff" }}>Support</h5>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-decoration-none" style={{ color: "#ffffff" }}>Help Center</a></li>
              <li><a href="/faqs" className="text-decoration-none" style={{ color: "#ffffff" }}>FAQs</a></li>
              <li><a href="/contact" className="text-decoration-none" style={{ color: "#ffffff" }}>Contact Us</a></li>
              <li><a href="/donate" className="text-decoration-none" style={{ color: "#ffffff" }}>Donate</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "#ffffff" }} />

        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="d-flex">
              <a href="/privacy" className="text-decoration-none me-3" style={{ color: "#ffffff" }}>Privacy Policy</a>
              <a href="/terms" className="text-decoration-none me-3" style={{ color: "#ffffff" }}>Terms of Service</a>
              <a href="/cookies" className="text-decoration-none" style={{ color: "#ffffff" }}>Cookie Policy</a>
            </div>
          </div>
          
          <div className="col-md-6 text-md-end">
            <p className="mb-0" style={{ color: "#ffffff" }}>
              &copy; {new Date().getFullYear()} AdoptCare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;