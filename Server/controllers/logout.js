import User from "../models/user.js";
import { io } from "../index.js"; // Import io instance from index.js
import { getUserFromToken } from "./getUserFromToken.js";
const Logout = async (req, res) => {
  console.log("Logout request received");
  console.log("request header:"+req.header);
  const token = req.header("authorization")?.split(" ")[1];
  console.log("token inside logout:"+token);
  const user = await getUserFromToken(token);
  const username = user.username;
  console.log(username);
  try {
    const user = await User.findOne({ username });
    if (user) {
      io.on("disconnect", (socket) => {
        console.log("Client disconnected");
        socket.leave(user._id); // Leave room with userId
        console.log(`User ${user._id} logged out`);
        io.emit("userLoggedOut", user._id); // Emit event to all clients
      });

      user.isConnected = false;
      await user.save(); // Call the save method to update the document
      res.status(200).json({ message: "User logged out" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default Logout;
