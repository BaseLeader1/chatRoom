import React from "react";
import { Layout } from "antd";
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
  const connectedUser = useUserStore((state) => state.connectedUser);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <FetchUsers />
      <Sidebar />
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
            {/* Content */}
          </div>
          <div className="message-input-container">
            <MessageInput />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Room;
