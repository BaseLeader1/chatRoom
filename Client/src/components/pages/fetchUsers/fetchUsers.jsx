import React, { useEffect } from 'react';
import axios from 'axios';
import useUserStore from "../../zustand/userStore";

const FetchUsers = () => {
  const { login } = useUserStore(); // Get the login action from the store

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const connectedUsersResponse = await axios.get('/api/auth/online');
        const disconnectedUsersResponse = await axios.get('/api/auth/offline');
        login({ connectedUsers: connectedUsersResponse.data.users, disconnectedUsers: disconnectedUsersResponse.data.users });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const intervalId = setInterval(fetchUsers, 5000); 
    fetchUsers(); 

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [login]);

  return null; // FetchUsers component does not render anything directly
};

export default FetchUsers;
