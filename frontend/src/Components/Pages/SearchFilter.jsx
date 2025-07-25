// src/components/SearchFilter.jsx

import React from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const SearchFilter = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        padding: "100px 20px",
        color: "#fff",
      }}
    >
      <h1 className="fw-bold display-5 mb-3">Find Your Perfect Match</h1>
      <p className="fs-5 mb-5">
        Connect loving families with children who need homes. Start your adoption journey today.
      </p>

      <div
        className="d-flex flex-wrap gap-3 bg-white p-3 rounded shadow"
        style={{ maxWidth: "90%", borderRadius: "12px" }}
      >
        {/* Location */}
        <div className="d-flex align-items-center bg-dark text-white px-3 py-2 rounded flex-grow-1">
          <FaMapMarkerAlt className="me-2" />
          <input
            type="text"
            placeholder="Location"
            className="form-control bg-dark text-white border-0"
            defaultValue="Pune"
          />
        </div>

        {/* Age Group */}
        <select className="form-select form-select-lg bg-dark text-white flex-grow-1" defaultValue="">
          <option value="" disabled>Age Group</option>
          <option value="0-2">0-2 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="6-10">6-10 Years</option>
          <option value="11+">11+ Years</option>
        </select>

        {/* Gender */}
        <select className="form-select form-select-lg bg-dark text-white flex-grow-1" defaultValue="">
          <option value="" disabled>Gender</option>
          <option value="male">Boy</option>
          <option value="female">Girl</option>
          <option value="any">Any</option>
        </select>

        {/* Search Button */}
        <button className="btn btn-primary btn-lg d-flex align-items-center justify-content-center px-4">
          <FaSearch className="me-2" />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
