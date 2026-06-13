import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [darkMode, setDarkMode] = useState(false);
const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = async (e) => {
    e.preventDefault();

    if (username.length < 3) {
      alert("Username must be at least 3 characters.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d+$/.test(password)) {
      alert("Password must contain only numbers.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 digits.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    

    try {
  await axios.post(
    "https://todo-app-ugo7.onrender.com/api/auth/signup",
    {
      username,
      email,
      password,
    }
  );

  alert("Signup Successful!");
  navigate("/login");

} catch (err) {
  alert(err.response?.data?.message || "Signup Failed");
}
  };

  return (
    <div className={darkMode ? "signupPage dark-mode" : "signupPage"}>
      <div className="container">
        <div
          className="toggle-mode"
          onClick={() => setDarkMode(!darkMode)}
        >
          🌙 Dark Mode
        </div>

        <h2>
          <u>Sign Up</u>
        </h2>

        <form onSubmit={validateForm}>
          <label>Username:</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email:</label>

          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>

          <input
            type="password"
            placeholder="Only numbers, min 6 chars"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password:</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="signupBtn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;