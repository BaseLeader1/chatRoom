import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../zustand/userStore';
import { Spin } from 'antd';
import socketIOClient from 'socket.io-client';
import fetchMessages from './FetchMessages';
import './ChatArea.css';
import { MessageBox, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'; // Import RCE styles

const ChatArea = ({ currentChat }) => {
  const { sendMessage, loading } = useUserStore((state) => ({
    sendMessage: state.sendMessage,
    loading: state.loading,
  }));
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const socket = socketIOClient('http://localhost:5001');
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessagesAndUpdateState = async () => {
      try {
        const fetchedMessages = await fetchMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessagesAndUpdateState();
  }, []);

  const handleSendMessage = async (content) => {
    try {
      await sendMessage(currentChat.senderId, currentChat.receiverId, content);
      setMessages([...messages, { senderId: currentChat.senderId, content }]);
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
        Chat with {currentChat.username}
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
      <Input
        placeholder="Type a message..."
        multiline={true}
        onKeyPress={(e) => {
          if (e.shiftKey && e.charCode === 13) {
            return true;
          }
          if (e.charCode === 13) {
            handleSendMessage(e.target.value);
            e.target.value = ''; // Clear input after send
            e.preventDefault();
            return false;
          }
        }}
        rightButtons={
          <button onClick={() => handleSendMessage(document.querySelector('.rce-input').value)}>Send</button>
        }
      />
    </div>
  );
};

export default ChatArea;
