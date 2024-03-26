import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { io } from "../index.js"; // Import io instance from index.js

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      token,
    });
    io.on("connection", (socket) => {
      console.log("New client connected");
      socket.join(user._id); // Join room with userId
      console.log(`User ${user._id} logged in`);
      io.emit("userLoggedIn", user._id); // Emit event to all clients
    });

    // Update user's isConnected status
    user.isConnected = true;
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
