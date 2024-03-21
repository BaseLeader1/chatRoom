import express from "express";
import { createServer } from "http"; // Import createServer from http module
import { Server } from "socket.io";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routs.js";
import mongoose from "mongoose";
import cors from 'cors';

dotenv.config();
const app = express();
const server = createServer(app); // Create HTTP server
export const io = new Server(server); // Attach Socket.IO to HTTP server
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 
app.use("/api/auth", authRoutes);

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
               server.listen(PORT, () => { // Use server.listen instead of app.listen
                 console.log(`Server listening on port ${PORT}`);
               });          
        })
        .catch((err) => {
            throw err;
        });
};

connect();

io.on("connection", (socket) => {
  console.log("New client connected");
  
  socket.on("login", (userId) => {
    socket.join(userId); // Join room with userId
    console.log(`User ${userId} logged in`);
    io.emit("userLoggedIn", userId); // Emit event to all clients
  });

  socket.on("logout", (userId) => {
    socket.leave(userId); // Leave room with userId
    console.log(`User ${userId} logged out`);
    io.emit("userLoggedOut", userId); // Emit event to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
