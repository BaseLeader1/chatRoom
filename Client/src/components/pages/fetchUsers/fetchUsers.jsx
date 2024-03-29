import React, { useEffect } from "react";
import axios from "axios";
import useUserStore from "../../zustand/userStore";

const FetchUsers = () => {
  const { login, setConnectedUser } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const connectedUsersResponse = await axios.get("/api/auth/online");
        const disconnectedUsersResponse = await axios.get("/api/auth/offline");
        console.log("after axios");
        const currentUser = connectedUsersResponse.data.users[0];
        login({
          connectedUsers: connectedUsersResponse.data.users,
          disconnectedUsers: disconnectedUsersResponse.data.users,
          user: currentUser,
        });
        setConnectedUser(currentUser); // Set the connected user
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    const intervalId = setInterval(fetchUsers, 5000);

    return () => clearInterval(intervalId);
  }, [login, setConnectedUser]);

  return null;
};

export default FetchUsers;
