import React from "react";
import useUserStore from "../../zustand/userStore"; // Import the Zustand store

const UserList = () => {
  const { connectedUsers, disconnectedUsers } = useUserStore((state) => ({
    connectedUsers: state.connectedUsers,
    disconnectedUsers: state.disconnectedUsers,
  }));

  return (
    <div>
      <div className="connected-users">
        <h3>Connected Users:</h3>
        {connectedUsers.map((user) => (
          <div key={user.id} className="user online">
            {user.username}
          </div>
        ))}
      </div>

      <div className="disconnected-users">
        <h3>Disconnected Users:</h3>
        {disconnectedUsers.map((user) => (
          <div key={user.id} className="user offline">
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
