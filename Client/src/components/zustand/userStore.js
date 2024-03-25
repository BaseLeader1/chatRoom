import { create } from "zustand";
import FetchUsers from "../pages/fetchUsers/fetchUsers";

const useUserStore = create((set) => ({
  user: null,
  isConnected: false,
  connectedUser: null, // Add a property to store the connected user's information
  login: (user) =>
    set({
      user,
      isConnected: true,
      connectedUser: user, // Store the connected user's information
      authToken:
        FetchUsers.connectedUsersResponse.data.users == user
          ? authToken
          : user.token,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isConnected: false,
      connectedUser: null,
    }), // Reset connectedUser upon logout
}));

export default useUserStore;
