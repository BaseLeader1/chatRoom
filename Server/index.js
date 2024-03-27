import express from "express";
import { createServer } from "http"; // Import createServer from http module
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routs.js";
import mongoose from "mongoose";
import cors from "cors";

console.log("MONGO:", process.env.MONGO);
console.log("PORT:", process.env.PORT);
const app = express();
const server = createServer(app); // Create HTTP server
export const io = new Server(server); // Attach Socket.IO to HTTP server
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

const connect = () => {
  console.log("MongoDB URI:", process.env.MONGO);
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1); // Exit the process if unable to connect to MongoDB
    });
    

};
connect();
