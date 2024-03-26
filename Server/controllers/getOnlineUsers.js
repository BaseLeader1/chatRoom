import User from "../models/user.js";
export const getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ isConnected: true });

    res.status(200).json({ users, message: "Online users fetched" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
