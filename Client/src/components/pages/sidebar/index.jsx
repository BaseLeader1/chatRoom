import React from "react";
import { Layout, Menu } from "antd";
import useUserStore from "../../zustand/userStore"; // Import the Zustand store

const { Sider } = Layout;

const Sidebar = () => {
  const { connectedUsers, disconnectedUsers } = useUserStore((state) => ({
    connectedUsers: state.connectedUsers || [],
    disconnectedUsers: state.disconnectedUsers || [],
  }));
  const userName = useUserStore((state) => state.userName); // Access userName from the store

  // Ensure userName is a string
  const userNameString =
    userName && typeof userName === "object" ? userName.username : userName;

  const filteredConnectedUsers = connectedUsers.filter(
    (user) => user.username !== userNameString
  );

  return (
    <Sider>
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
          {filteredConnectedUsers.map((user) => (
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
  );
};

export default Sidebar;
