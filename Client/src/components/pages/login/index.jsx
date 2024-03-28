// components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
        token: ""
      });
      const token = response.data.token;
      localStorage.setItem("token", token); 
      console.log("Signin successful:", response.data);
      navigate("/room");

      // Handle successful login (e.g., saving token to localStorage)
    } catch (error) {
      setError(error.response.data.message);
      console.error("Signin failed:", error.response.data);
    }
  };

  return (
    <div className="form">
      <h2 className="title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleLogin} className="button-confirm">
        Login
      </button>
      <span style={{ color: "black" }}>New here? <a href="/signup" className="link">Sign up</a></span>
    </div>
  );
};

export default Login;