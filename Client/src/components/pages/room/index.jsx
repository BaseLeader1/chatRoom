import React from "react";
import { Layout } from "antd";
import Sidebar from "../sidebar/index";
import FetchUsers from "../fetchUsers/fetchUsers";
import MessageInput from "../../ChatInput";
import {useUserStore, useUserName} from "../../zustand/userStore";
import "./style.css";

const { Header, Content } = Layout;

const Room = () => {
  const connectedUser = useUserStore((state) => state.connectedUser);

  const userName = useUserName((state) => state.userName);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <FetchUsers />
      <Sidebar />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="welcome-message">Welcome, {connectedUser ? (connectedUser.name || 'User') : 'Guest'}!</div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {/* Content */}
          </div>
          <MessageInput />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Room;
