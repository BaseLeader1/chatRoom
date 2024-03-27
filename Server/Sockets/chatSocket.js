import { Server } from "socket.io";
import Message from "../models/message"; // Import your Message model

export default function setupSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("new_message", async (data) => {
      try {
        const savedMessage = await Message.create({
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
        });
        io.emit("new_message", savedMessage);
      } catch (error) {
        console.error("Message saving failed:", error);
        // You might want to send an error response back to the client
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}
