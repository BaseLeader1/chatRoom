import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import axios from "axios";
import { MessageBox, Input } from "react-chat-elements";
import "./style.css";

const { Header, Content, Footer, Sider } = Layout;

const Room = () => {
  const items = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }));

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [disconnectedUsers, setDisconnectedUsers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchUsers = async () => {
    try {
      const connectedUsersResponse = await axios.get("/api/auth/online");
      const disconnectedUsersResponse = await axios.get("/api/auth/offline");
      setConnectedUsers(connectedUsersResponse.data.users);
      setDisconnectedUsers(disconnectedUsersResponse.data.users);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchUsers, 2000); // Poll every 5 seconds
    fetchUsers(); // Initial fetch

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">{/* Logo content */}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="menu"
        >
          {/* Display connected users */}
          <div className="connected-users">
            <h3>Connected Users:</h3>
            {connectedUsers.map((user) => (
              <Menu.Item className="online" key={user.id}>
                {user.username}
              </Menu.Item>
            ))}
          </div>

          {/* Display disconnected users */}
          <div className="disconnected-users">
            <h3>Disconnected Users:</h3>
            {disconnectedUsers.map((user) => (
              <Menu.Item className="offline" key={user.id}>
                {user.username}
              </Menu.Item>
            ))}
          </div>
        </Menu>
      </Sider>
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
        </Content>
      </Layout>
    </Layout>
  );
};
export default Room;
