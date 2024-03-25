import React from "react";

const MessageInput = () => {
  return (
    <div className="message-form">
      <input
        className="textarea"
        type="text"
        placeholder="Type your message here"
      ></input>
      <button onClick="sendMessage()">Send Message</button>
    </div>
  );
};

export default MessageInput;
