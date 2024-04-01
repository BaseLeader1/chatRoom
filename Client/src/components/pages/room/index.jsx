import React from "react";
import { Layout } from "antd";
import ChatArea from "../chatArea/chatArea";
import Sidebar from "../sidebar/index";
import FetchUsers from "../fetchUsers/fetchUsers";
import MessageInput from "../../ChatInput";
import useUserStore from "../../zustand/userStore";
import axios from "axios";
import Logout from "../logout";
import UserAuth from "../userAuth";

import "./style.css";

const { Header, Content } = Layout;

const Room = () => {
  const userName = useUserStore((state) => state.userName);
  const selectedUser = useUserStore((state) => state.selectedUser);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  const handleChatUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async (message) => {
    try {
      // Send message to the backend API
      await axios.post("http://localhost:5001/api/auth/send", {
        sender: userName.username,
        receiver: selectedUser.username,
        content: message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <FetchUsers />
      <Sidebar onSelectUser={handleChatUserSelection} />
      <Layout className="site-layout">
        <Header className="site-layout-background " style={{ padding: 0 }}>
          <UserAuth />
          <Logout />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <ChatArea selectedUser={selectedUser} onSendMessage={handleSendMessage} />
          </div>
          <div className="message-input-container">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Room;
