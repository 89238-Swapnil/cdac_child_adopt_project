import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Navbar.css';

const AppNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const isParent = user?.role === "parent";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Navbar expand="md" className="custom-navbar shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fmiddle%2F0-3253_heart-icon-red-hollow-valentine-svg-transparent-background.png&f=1&nofb=1&ipt=e50260949e3c93e973ab2217eb9d056d18e5ec3838ce7d4a65de5b6c356c0a8b"
            alt="AdoptCare Logo"
            width="30"
            height="30"
            className="me-2"
          />
          <b className="text-black">AdoptCare</b>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-center">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-custom"><b>Home</b></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link className="nav-link-custom"><b>About</b></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/process">
              <Nav.Link className="nav-link-custom"><b>Process</b></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/orphanages">
              <Nav.Link className="nav-link-custom"><b>Orphanages</b></Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="ms-auto text-center">
            {/* Show "My Profile" only when parent is logged in */}
            {isParent && (
              <LinkContainer to="/parent-dashboard">
                <Nav.Link className="nav-link-custom">
                  <b>My Profile</b>
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Conditional rendering for Login/Logout */}
            {user ? (
              <>
                <Nav.Link onClick={handleLogout} className="nav-link-custom text-danger">
                  <b>Logout</b>
                </Nav.Link>
              </>
            ) : (
              <LinkContainer to="/signin">
                <Nav.Link className="nav-link-custom"><b>SignIn</b></Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;