import express from "express";
import { login, signup, logout,getOnlineUsers,getOfflineUsers } from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/online",getOnlineUsers);

router.get("/offline", getOfflineUsers);

export default router;