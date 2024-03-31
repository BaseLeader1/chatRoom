import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import socketIOClient from 'socket.io-client';
import axios from 'axios'; // Import axios for HTTP requests

import './chatArea.css';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const ChatArea = ({ currentChat }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const fetchMessagesAndUpdateState = async () => {
      try {
        // Fetch initial messages from your backend API
        const response = await axios.get('http://localhost:5001/api/auth/messages');
        setMessages(response.data.messages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
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
        Chat with {currentChat && currentChat.username}
      </div>
      <div className="chat-messages">
      {messages.map((message, index) => (
  <MessageBox
    key={index}
    position={message.sender.username === currentChat.sender.username ? 'right' : 'left'}
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
