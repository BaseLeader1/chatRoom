import axios from "axios";

const fetchMessages = async () => {
    try {
      const response = await axios.get("/api/auth/send");
      return response.data.messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };
  
  export default fetchMessages;