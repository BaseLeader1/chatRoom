import React from "react";
import { Layout, Menu } from "antd";
import useUserStore from "../../zustand/userStore";

const { Sider } = Layout;

const Sidebar = ({ onSelectUser }) => { // Receive onSelectUser function as prop
  const { connectedUsers, disconnectedUsers, userName } = useUserStore(
    (state) => ({
      connectedUsers: state.connectedUsers || [],
      disconnectedUsers: state.disconnectedUsers || [],
      userName: state.userName,
    })
  );

  const handleUserClick = (user) => { // Function to handle user click
    onSelectUser(user); // Pass selected user data to parent component
  };

  // Ensure userName is a string
  const userNameString =
    userName && typeof userName === "object" ? userName.username : userName;

  const filteredConnectedUsers = connectedUsers.filter(
    (user) => user.username !== userNameString
  );

  return (
    <Sider>
     <div className="logo">
  Chat Zone
</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} className="menu">
        {/* Display connected users */}
        <div className="connected-users">
          <h3>Connected Users:</h3>
          {filteredConnectedUsers.map((user) => (
            <Menu.Item
              className="online"
              key={user.id}
              onClick={() => handleUserClick(user)} // Handle user click event
            >
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
