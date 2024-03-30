
import React, { useState } from "react";
import "./style.css";
import MyButton from "../button";
import useUserStore from "../zustand/userStore"; // Import the Zustand store

const MessageInput = ({ onSendMessage }) => { // Receive the onSendMessage handler
  const [message, setMessage] = useState(""); // Local state for the input

  // Update the local state as the user types a message
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Send the message when the button is clicked
  const handleSendClick = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="message-form">
      <input
        id="messageInput"
        className="messageInput"
        type="text"
        placeholder="Type your message here"
        value={message} // Controlled input
        onChange={handleInputChange} // Update local state on change
      />
      <MyButton content={<>&#10148; Send</>} onClicking={handleSendClick} />
    </div>
  );
};

export default MessageInput;
