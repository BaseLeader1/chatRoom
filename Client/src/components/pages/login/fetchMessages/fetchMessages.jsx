import React, { useEffect } from "react";
import axios from "axios";
import useUserStore from "../../zustand/userStore";

const FetchMessages = () => {
  const { setChats } = useUserStore();

  useEffect(() => {
    let intervalId;

    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/messages");
        const messages = response.data.messages;
        setChats(messages); 
      } catch (error) {
        console.error("Error fetching messages:", error);

      }
    };

    fetchMessages(); 

    intervalId = setInterval(fetchMessages, 5000); 

    return () => {
      clearInterval(intervalId);
    };
  }, [setChats]);

  return null;
};

export default FetchMessages;
