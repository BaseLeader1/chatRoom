import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Login from "../login";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        password,
      });
      console.log("Signup successful:", response.data);
      navigate("/login");
      // Handle successful registration
    } catch (error) {
      setError(error.response.data.message);
      console.error("Signup failed:", error.response.data);
    }
  };

  return (
    <div className="form">
      <h2 className="title">Signup</h2>
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
      <button
        onClick={handleSignup}
        className="button-confirm"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSignup(e); // Call handleSignup when Enter key is pressed
          }
        }}
      >
        Signup
      </button>
      <span style={{ color: "black" }}>
        Already have an account?{" "}
        <a href="/login" className="link">
          Log in
        </a>
      </span>
    </div>
  );
};

export default Signup;
