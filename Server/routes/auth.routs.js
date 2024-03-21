import express from "express";
import { login, signup, logout,getOnlineUsers,getOffineUsers } from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/online",getOnlineUsers);

router.get("/offline",getOffineUsers);

export default router;