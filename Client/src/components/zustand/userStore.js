
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  isConnected: false,
  connectedUser: null, // Initialize connectedUser here
  connectedUsers: [],
  disconnectedUsers: [],
  authToken: '',

  login: ({ connectedUsers, disconnectedUsers, user }) => {
    set({
      isConnected: true,
      connectedUsers,
      disconnectedUsers,
      connectedUser: user,
    });
  },

  logout: () => set({
    user: null,
    isConnected: false,
    connectedUser: null,
    connectedUsers: [],
    disconnectedUsers: [],
    authToken: '',
  }),

  setConnectedUser: (user) => set({ connectedUser: user }),
}));

export default useUserStore;
