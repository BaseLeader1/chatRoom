import Message from "../models/message.js";
import { io } from "../index.js"; // Import io instance from index.js

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = new Message({ sender, receiver, content });
    await message.save();

    // Emit a WebSocket event to notify clients about the new message
    io.emit("newMessage", message);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // Extract sender and receiver from query parameters or request body
    const { sender, receiver } = req.query; // Assuming sender and receiver are sent as query parameters

    // Fetch messages from the database based on sender and receiver
    const messages = await Message.find({
      $or: [
        { sender, receiver }, // Messages sent from sender to receiver
        { sender: receiver, receiver: sender }, // Messages sent from receiver to sender
      ],
    });

    // Return the messages in the response
    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
