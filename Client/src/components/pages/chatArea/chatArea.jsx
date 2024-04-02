import React, { useState, useEffect } from "react";
import { Spin, Button } from "antd";
import axios from "axios";
import { MessageBox } from "react-chat-elements";
import useUserStore from "../../zustand/userStore";
import "react-chat-elements/dist/main.css";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./chatArea.css";

const ChatArea = ({ selectedUser, onSendMessage }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const userName = useUserStore((state) => state.userName);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessagesAndUpdateState = async () => {
      try {
        if (userName && userName.username && selectedUser) {
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
          setLoading(false);
          localStorage.setItem("opponent", selectedUser.username);

          const socket = socketIOClient("http://localhost:5001");

          socket.on("newMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });

          return () => {
            socket.disconnect();
          };
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessagesAndUpdateState();
  }, [selectedUser, userName]);

  const handleMessageSend = async (message) => {
    try {
      if (message.trim()) {
        // Check if the message is not empty
        // Add the new message with a fade-in effect
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: userName.username,
            content: message,
            createdAt: new Date(),
            fadeEffect: true,
          },
        ]);
        onSendMessage(message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handlePlayClick = () => {
    // Navigate to the Tic Tac Toe game page and pass the selected user information
    navigate("/play-tictactoe");
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="welcome-message">
          Welcome, please choose one of the connected users to continue
        </div>
        <div className="loading-info">
          In the meantime, we're loading the chat history for you
          <span className="loading-spinner-icon">
            <Spin size="large" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      <div className="chat-header">
        Chat with {selectedUser && selectedUser.username}
      </div>
      <button className="play-button" onClick={handlePlayClick}>
        Play Tic Tac Toe
      </button>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <MessageBox
            key={message.createdAt} // Use message timestamp as key
            position={message.sender === userName.username ? "right" : "left"}
            type="text"
            text={message.content}
            dateString={formatDateString(message.createdAt)}
            className={
              message.sender === userName.username
                ? "sent-message"
                : "received-message"
            }
            onMessageClick={() => handleMessageSend(message.content)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
function formatDateString(dateString) {
  const messageDate = new Date(dateString);
  const now = new Date();

  // Check if the message was sent today
  if (
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear()
  ) {
    return formatTimeString(dateString); // Use formatTimeString for today's messages
  } else {
    // Display the date if the message was sent on a different day
    return `${padZero(messageDate.getDate())}/${padZero(
      messageDate.getMonth() + 1
    )}/${messageDate.getFullYear()}`;
  }
}

function formatTimeString(dateString) {
  const messageDate = new Date(dateString);
  return `${padZero(messageDate.getHours())}:${padZero(
    messageDate.getMinutes()
  )}`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
