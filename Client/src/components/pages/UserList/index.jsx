import React from "react";
import useUserStore from "../../zustand/userStore"; 

const UserList = () => {
  const { currentUser, connectedUsers, disconnectedUsers } = useUserStore(
    (state) => ({
      currentUser: state.user,
      connectedUsers: state.connectedUsers,
      disconnectedUsers: state.disconnectedUsers,
    })
  );
  const filteredConnectedUsers = connectedUsers.filter(user => user.id !== currentUser.id);

  const onSelectUser = (user) => {
    console.log(`Selected user: ${user.username}`);
  };
  return (
    <div>
      <div className="connected-users">
        <h3>Connected Users:</h3>
        {filteredConnectedUsers.map((user) => (
          <div key={user.id} className="user online"
           onClick={() => onSelectUser(user)}
          >
            {user.username}
          </div>
        ))}
      </div>

      <div className="disconnected-users">
        <h3>Disconnected Users:</h3>
        {disconnectedUsers.map((user) => (
          <div key={user.id} className="user offline"
          onClick={() => onSelectUser(user)}>
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
