import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyButton from "../../button";

const Logout = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/api/auth/logout",
        {}, // Pass an empty object as the request body
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the Bearer token in the request headers
          },
        }
      );

      localStorage.clear(); // Clear the user token from localStorage
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      console.error("Signout failed:", error.response.data);
    }
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <MyButton
        onClicking={handleLogout}
        content="Logout"
        className="button-confirm"
        
      />
    </div>
  );
};

export default Logout;
