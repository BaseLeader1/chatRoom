import React, { useState } from "react";
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
  const userName = useUserStore((state) => state.userName); // Access userName from the store
  const selectedUser = useUserStore((state) => state.selectedUser);
  const setSelectedUser= useUserStore((state) => state.setSelectedUser);

  const connectedUsers = useUserStore((state) => ({
    connectedUsers: state.connectedUsers.filter(
      (user) => user.id !== userName.id
    ),
  }));

  const handleChatUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async (message) => {
    try {
      console.log("selectedChatUser", selectedUser.username);
      console.log("currentUser", userName.username);
      console.log("message", message);
      // Send message to your backend API
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
            <ChatArea currentChat={selectedUser} />
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
