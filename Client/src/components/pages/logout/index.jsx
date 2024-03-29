import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyButton from "../../button";
const Logout = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");
    console.log("userToken in logout", userToken);
    try {
      const response = await axios.post("/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the Bearer token in the request headers
        },
      });
      console.log("logout successful:", response.data);
      const userToken = localStorage.clear();
      navigate("/login");

      // Handle successful login (e.g., saving token to localStorage)
    } catch (error) {
      setError(error.response.data.message);
      console.error("Signout failed:", error.response.data);
    }
  };
  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <MyButton
        onClick={handleLogout}
        content="Logout"
        className="button-confirm"
      ></MyButton>
    </div>
  );
};
export default Logout;
