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
  

  return (
    <div
      className="message-form"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSendClick(e);
        }
      }}
    >
      <input
        id="messageInput"
        className="messageInput"
        type="text"
        placeholder="Type your message here"
        value={message}
        onChange={handleInputChange}
      />
      <MyButton content={<>&#10148; Send</>} onClicking={handleSendClick} />
    </div>
  );
};

export default MessageInput;
