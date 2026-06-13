import React, { useState } from "react";
import "./ForgetPass.css";
import axios from "axios";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert("Password reset link sent successfully!");
  };

  return (
    <div className={darkMode ? "forgetPage dark-mode" : "forgetPage"}>
      <div className="forget-container">
        <div className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
          🌙 Dark Mode
        </div>

        <h2>
          <u>Forgot Password</u>
        </h2>

        <p className="info-text">
          Enter your registered email address to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address:</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="forgetBtn">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
