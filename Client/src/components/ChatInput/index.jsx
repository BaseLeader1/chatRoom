import React, { useState } from "react";
import "./style.css";
import MyButton from "../button";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Handle sending message on pressing Enter key
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <div className="message-form">
      <input
        id="messageInput"
        className="messageInput"
        type="text"
        placeholder="Type your message here"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Handle key press events
      />
      <MyButton content={<>&#10148; Send</>} onClicking={handleSendClick} />
    </div>
  );
};

export default MessageInput;
