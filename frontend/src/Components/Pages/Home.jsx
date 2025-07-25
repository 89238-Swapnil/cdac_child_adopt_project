import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import SearchFilter from "./SearchFilter";

const Home = () => {
  const [orphanages, setOrphanages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrphanages = JSON.parse(localStorage.getItem('users')) || [];
    setOrphanages(storedOrphanages);
  }, []);

  return (
    
    <>
      {/* Hero Section */}
      <section
        className="hero-section position-relative d-flex flex-column justify-content-center align-items-center text-white text-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #00008b 0%, #1E90FF 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="overlay position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,139,0.3) 0%, rgba(30,144,255,0.3) 100%)',
            zIndex: 1
          }}
        ></div>

        <div style={{ zIndex: 2 }}>
          <h1 className="fw-bold display-4 mb-3 text-start">Be The Smile of Someone</h1>
          <div className="mb-5">
            <h2 className="fw-bold display-5">Find Your Perfect Match</h2>
            <p className="lead">
              Connect loving families with children who need homes. Start your adoption journey today.
            </p>
          </div>

          {/* Search Filter */}
          <div
            className="search-bar d-flex flex-wrap justify-content-center bg-white p-3 rounded shadow w-100 mx-auto"
            style={{ maxWidth: '1100px' }}
          >
            <div className="input-group m-2" style={{ minWidth: '200px' }}>
              <span className="input-group-text bg-dark text-white">
                <FaMapMarkerAlt />
              </span>
              <input type="text" className="form-control bg-dark text-white border-0" placeholder="Location" />
            </div>
            <div className="form-group m-2" style={{ minWidth: '180px' }}>
              <select className="form-select bg-dark text-white border-0">
                <option>Age Group</option>
                <option>0-2 Years</option>
                <option>3-5 Years</option>
                <option>6-10 Years</option>
                <option>11+ Years</option>
              </select>
            </div>
            <div className="form-group m-2" style={{ minWidth: '160px' }}>
              <select className="form-select bg-dark text-white border-0">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="m-2">
              <button className="btn btn-primary px-4 h-100">
                <FaSearch className="me-2" />
                Search
              </button>
            </div>
          </div>

          {/* Register Orphanage Button */}
          <div className="mt-4">
            <button className="btn btn-warning fw-bold px-4 py-2" onClick={() => navigate('/signup')}>
  Register Your Orphanage
</button>

          </div>
        </div>
      </section>

      {/* Orphanages Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Featured Orphanages</h2>
          <div className="row g-4">
            {orphanages.length > 0 ? (
              orphanages.map((orphanage, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={orphanage.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                      className="card-img-top"
                      alt={orphanage.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-primary">{orphanage.name}</h5>
                      <p className="card-text text-muted">
                        <FaMapMarkerAlt className="me-1" />
                        {orphanage.city}, {orphanage.state}
                      </p>
                      <p className="card-text">{orphanage.description || 'No description available.'}</p>
                      <button className="btn btn-outline-primary w-100 mt-3">View Orphanage</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No orphanages available yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4 fw-bold">What Our Families Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <p>"Adopting through this platform changed our lives. We are now a happy family of four!"</p>
                <h6 className="mt-3 mb-0 text-primary">– Neha & Raj</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <p>"The process was smooth, transparent, and filled with care and support."</p>
                <h6 className="mt-3 mb-0 text-primary">– Sunita</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 shadow-sm h-100">
                <p>"Thanks to the amazing team, we now have our little angel with us."</p>
                <h6 className="mt-3 mb-0 text-primary">– Ankit & Priya</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
