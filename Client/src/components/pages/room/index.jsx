import React, { useState } from 'react';
import { Layout } from 'antd';
import ChatArea from '../chatArea/chatArea';
import Sidebar from '../sidebar/index';
import FetchUsers from '../fetchUsers/fetchUsers';
import MessageInput from '../../ChatInput'; 
import useUserStore from '../../zustand/userStore';
import axios from 'axios';
import Logout from '../logout';
import UserAuth from '../userAuth';

import './style.css';

const { Header, Content } = Layout;

const Room = () => {
  const currentUser = useUserStore((state) => state.user);

  const { connectedUsers } = useUserStore((state) => ({
    connectedUsers: state.connectedUsers.filter(
      (user) => user.id !== currentUser.id
    ),
  }));

  const [selectedChatUser, setSelectedChatUser] = useState(null);

  const handleChatUserSelection = (user) => {
    setSelectedChatUser(user);
  };

  const handleSendMessage = async (message) => {
    try {
      // Send message to your backend API
      await axios.post('http://localhost:5001/api/auth/send', {
        sender: currentUser.userName, 
        receiverName: selectedChatUser.userName, 
        content: message,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <FetchUsers />
      <Sidebar onSelectUser={handleChatUserSelection} />
      <Layout className="site-layout">
        <Header className="site-layout-background " style={{ padding: 0 }}>
          <UserAuth />
          <Logout />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <ChatArea currentChat={selectedChatUser} />
          </div>
          <div className="message-input-container">
            {/* Pass handleSendMessage as a prop to MessageInput */}
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Room;
