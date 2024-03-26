import express from "express";
import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { getOnlineUsers } from "../controllers/getOnlineUsers.js";
import { getOfflineUsers } from "../controllers/getOfflineUsers.js";
import { sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/online", getOnlineUsers);

router.get("/offline", getOfflineUsers);

router.post("/send", sendMessage);

export default router;
