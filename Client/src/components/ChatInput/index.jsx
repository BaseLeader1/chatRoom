// MessageInput.jsx
import React from "react";
import "./style.css"; // Import CSS styles

const MessageInput = () => {
  const sendMessage = () => {
    const message = document.getElementById('messageInput').value;
    ChatSocketServer.sendMessage(message);
    document.getElementById('messageInput').value = '';
  };

  return (
    <div className="message-form">
      <input
        id="messageInput"
        className="textarea"
        type="text"
        placeholder="Type your message here"
      />
      <button className="send-button" onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default MessageInput;
