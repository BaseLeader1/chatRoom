import React, { useState, useEffect } from 'react';
import MessageInput from "./MessageInput"; // Use your actual path for MessageInput
import { useUserStore, useUserName } from "../../zustand/userStore"; // Adjust the path to your useUserStore

const ChatArea = ({ currentChat }) => {
  const { chats, sendMessage } = useUserStore((state) => ({
    chats: state.chats[currentChat.id],
    sendMessage: state.sendMessage,
  }));
  const [messages, setMessages] = useState([]); // Local state for messages

  // Load messages for the current chat from the store
  useEffect(() => {
    if (chats) {
      setMessages(chats);
    }
  }, [chats, currentChat.id]);

  // Send message and add it to the chat area
  const handleSendMessage = (content) => {
    sendMessage(currentChat.senderId, currentChat.receiverId, content);
    // Add new message to local state
    setMessages([...messages, { senderId: currentChat.senderId, content }]);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        Chat with {currentChat.username}
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.senderId === currentChat.senderId ? 'sent' : 'received'}`}>
            {message.content}
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;