import React, { useState, useEffect } from "react";
import useUserStore from "../../zustand/userStore";
import axios from "axios";

const UserAuth = () => {
  const CurrentUser = useUserStore((state) => state.CurrentUser);
  const userName = useUserStore((state) => state.userName); // Access userName from the store
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve user data from the server when the component mounts
    const fetchData = async () => {
      try {
        // Get the user token from localStorage
        const userToken = localStorage.getItem("token");

        // Make a GET request to a protected route on the server
        const response = await axios.get("/api/auth/getuser", {
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the Bearer token in the request headers
          },
        });
        // Set the retrieved user data to state
        CurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Set error state if request fails
        setError("Error fetching user data");
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array to ensure the effect runs only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!CurrentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white" }}>
        Hello, {userName.username}
      </h1>{" "}
      {/* Render userName.username here */}
    </div>
  );
};

export default UserAuth;
