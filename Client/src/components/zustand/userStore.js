import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  user: null,
  userName: "",
  isConnected: false,
  connectedUser: null, // Initialize connectedUser here
  connectedUsers: [],
  disconnectedUsers: [],
  chats: {},
  authToken: "",
  login: ({ connectedUsers, disconnectedUsers, user }) => {
    set({
      user,
      isConnected: true,
      connectedUsers,
      disconnectedUsers,
      connectedUser: user,
    });
  },

  sendMessage: async (sender, receiver, content) => {
    try {
      const response = await axios.post("/api/messages/send", {
        sender,
        receiver,
        content,
      });
      if (response.status === 201) {
        set((state) => {
          const existingMessages = state.chats[receiver] || [];
          return {
            chats: {
              ...state.chats,
              [receiver]: [
                ...existingMessages,
                { sender, content, timestamp: new Date() },
              ],
            },
          };
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  },
  logout: () =>
    set({
      user: null,
      isConnected: false,
      connectedUser: null,
      connectedUsers: [],
      disconnectedUsers: [],
      authToken: "",
    }),

  setConnectedUser: (user) => set({ connectedUser: user }),
  CurrentUser: (userName) => set({ userName: userName }),
}));

export default useUserStore;
