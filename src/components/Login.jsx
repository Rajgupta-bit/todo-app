import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const validator =async  (e) => {
    e.preventDefault();
    try {

  const res = await axios.post(
    "https://todo-app-ugo7.onrender.com/api/auth/login",
    {
      email,
      password,
    }
  );

  localStorage.setItem(
    "token",
    res.data.token
  );
  localStorage.setItem("user", JSON.stringify(res.data.user));
  // alert("Login Successful!");

  navigate("/");

} catch (err) {

  alert(
    err.response?.data?.message ||
    "Login Failed"
  );

}
  };

  return (
    <div className={darkMode ? "loginPage dark-mode" : "loginPage"}>
      <div className="login-container">
        <div
          className="toggle-mode"
          onClick={() => setDarkMode(!darkMode)}
        >
          🌙 Dark Mode
        </div>

        <h2>
          <u>Login</u>
        </h2>

        <form onSubmit={validator}>
          <label>User Email:</label>

          <input
            type="text"
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

          <button className="btn" type="submit">
            Login
          </button>

          <div className="forgot-password">
            <Link to="/ForgetPass">Forget Password?</Link>
          </div>

          <div className="signup">
            <p>
              Don't have an account? <Link to="/SignUp">SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;