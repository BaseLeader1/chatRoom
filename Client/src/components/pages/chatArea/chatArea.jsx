import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import socketIOClient from "socket.io-client";
import axios from "axios"; // Import axios for HTTP requests
import "./chatArea.css";
import { MessageBox } from "react-chat-elements";
import useUserStore from "../../zustand/userStore";
import "react-chat-elements/dist/main.css";

const ChatArea = ({}) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const selectedUser = useUserStore((state) => state.selectedUser);
  const userName = useUserStore((state) => state.userName);

  useEffect(() => {
    const fetchMessagesAndUpdateState = async () => {
      try {
        console.log("currentChat sender: ", userName.username);
        console.log("currentChat receiver: ", selectedUser.username);
        // Fetch initial messages from your backend API
        const response = await axios.get(
          "http://localhost:5001/api/auth/messages",
          {
            params: {
              sender: userName.username,
              receiver: selectedUser.username,
            },
          }
        );
        setMessages(response.data.messages);
        console.log("messages", response.data.messages); // Log the messages here
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessagesAndUpdateState();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="chat-area">
      <div className="chat-header">
        Chat with {selectedUser && selectedUser.username}
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            position={
              message.sender.username === userName.username ? "right" : "left"
            }
            type="text"
            text={message.content}
            dateString={new Date(message.createdAt).toLocaleString()}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
