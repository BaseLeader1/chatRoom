import express from "express";
import { login, signup, logout,getUsers } from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/room", (req, res) => {
        res.send(getUsers);
    });

export default router;