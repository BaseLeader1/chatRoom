

import React, { useState, useEffect } from 'react';
import useUserStore from '../../zustand/userStore';
import { Spin } from 'antd';
import socketIOClient from 'socket.io-client';
import axios from 'axios'; // Import axios for HTTP requests

import './chatArea.css';
import { MessageBox, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const ChatArea = ({ currentChat }) => {
  const { loading } = useUserStore((state) => ({
    loading: state.loading,
  }));

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(''); // State for input message

  useEffect(() => {
    const fetchMessagesAndUpdateState = async () => {
      try {
        // Fetch messages from your backend API
        const response = await axios.get('/messages'); // Adjust the endpoint accordingly
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessagesAndUpdateState();
  }, []);

  const handleSendMessage = async () => {
    try {
      // Send message to your backend API
      await axios.post('/send', {
        sender: currentChat.senderId,
        receiver: currentChat.receiverId,
        content: inputMessage,
      });
      
      // Add the sent message to the state
      setMessages([...messages, { senderId: currentChat.senderId, content: inputMessage }]);
      
      // Clear the input field
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="chat-area">
      <div className="chat-header">
      <div className="chat-header">
  Chat with {currentChat && currentChat.username}
</div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            position={message.senderId === currentChat.senderId ? 'right' : 'left'}
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