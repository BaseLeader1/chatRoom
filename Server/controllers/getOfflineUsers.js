import User from "../models/user.js";

export const getOfflineUsers = async (req, res) => {
  try {
    const users = await User.find({ isConnected: false });

    res.status(200).json({ users, message: "Offline users fetched" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
