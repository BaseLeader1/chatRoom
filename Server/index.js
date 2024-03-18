import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routs.js";
import mongoose from "mongoose";
import cors from 'cors';

dotenv.config();
const app = express();
const PORT =process.env.PORT || 3000;
app.use(express.json());
app.use(cors()); 
app.use("/api/auth", authRoutes);

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
               app.listen(PORT, () => {
                 console.log(`Server listening on port ${PORT}`);
               });          
        })
        .catch((err) => {
            throw err;
        });
};

connect();



