import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAuth = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve user data from the server when the component mounts
    const fetchData = async () => {
      try {
        // Get the user token from localStorage
        const userToken = localStorage.getItem('userToken');

        // Make a GET request to a protected route on the server
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: userToken, // Include the user token in the request headers
          },
        });

        // Set the retrieved user data to state
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Set error state if request fails
        setError('Error fetching user data');
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array to ensure the effect runs only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello:{userData.username}</h1>
    </div>
  );
};

export default UserAuth;
