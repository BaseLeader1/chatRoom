// Room.jsx
import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "../sidebar/index";
import FetchUsers from "../fetchUsers/fetchUsers";
import MessageInput from "../../ChatInput";
import "./style.css";

const { Header, Content } = Layout;

const Room = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [disconnectedUsers, setDisconnectedUsers] = useState([]);

  const handleFetchUsersSuccess = (connectedUsers, disconnectedUsers) => {
    setConnectedUsers(connectedUsers);
    setDisconnectedUsers(disconnectedUsers);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <FetchUsers onSuccess={handleFetchUsersSuccess} />
      <Sidebar
        connectedUsers={connectedUsers}
        disconnectedUsers={disconnectedUsers}
      />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* NavBar content here */}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {/* Game or activity area */}
            {/* Chat interface */}
          </div>
          <MessageInput />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Room;
