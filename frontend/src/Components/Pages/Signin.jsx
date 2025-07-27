import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) =>
        user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (matchedUser) {
  localStorage.setItem("user", JSON.stringify(matchedUser));
  alert("Login Successful!");

  if (matchedUser.role === "parent") {
    navigate("/"); // ✅ Redirect parent to home
  } else if (matchedUser.role === "admin") {
    navigate("/orphanage/dashboard");
  } else {
    alert("Unknown role.");
  }
}
else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow rounded" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label className="form-label">Email<span className="text-danger">*</span></label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password<span className="text-danger">*</span></label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        

        <div className="mt-3 d-flex justify-content-center align-items-center">
          <p className="mb-0 me-2">Not registered yet?</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/register-choice")}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
