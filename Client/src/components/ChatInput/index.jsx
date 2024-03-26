import React from "react";
import "./style.css"; 
import MyButton from "../button";

const MessageInput = () => {
  
  const sendMessage = () => {
    console.log("Message sent!");
    
  };

  return (
    <div className="message-form">
      <input
        id="messageInput"
        className="textarea"
        type="text"
        placeholder="Type your message here"
      />
     <MyButton content={<>&#10148; Send</>} onClick={sendMessage} />
    </div>
  );
};

export default MessageInput;
