import express from "express";
import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import Logout from "../controllers/logout.js";
import { getOnlineUsers } from "../controllers/getOnlineUsers.js";
import { getOfflineUsers } from "../controllers/getOfflineUsers.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { getUser } from "../controllers/getUser.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", Logout);

router.get("/online", getOnlineUsers);

router.get("/offline", getOfflineUsers);

router.post("/send", sendMessage);

router.get("/send", getMessages);

router.get("/getuser", getUser, (req, res) => {
  // Access the authenticated user through req.user
  res.json(req.user);
});

export default router;
