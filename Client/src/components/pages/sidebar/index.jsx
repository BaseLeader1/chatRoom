import React from 'react';
import { Layout, Menu } from 'antd';
import useUserStore from "../../zustand/userStore"; // Import the Zustand store

const { Sider } = Layout;

const Sidebar = () => {
  const { connectedUsers, disconnectedUsers } = useUserStore((state) => ({
    connectedUsers: state.connectedUsers || [], 
    disconnectedUsers: state.disconnectedUsers || [], 
  }));

  return (
    <Sider>
      <div className="logo">{/* Logo content */}</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="menu">
        {/* Display connected users */}
        <div className="connected-users">
          <h3>Connected Users:</h3>
          {connectedUsers.map((user) => (
            <Menu.Item className="online" key={user.id} onClick={() => window.location.href = `/user/${user.id}`}>
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
