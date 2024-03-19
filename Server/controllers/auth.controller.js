import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup= async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      password
    });

    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      token,
    });
    user.isConnected = true;
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const logout = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      user.isConnected = false;
      await user.save(); // Call the save method to update the document
      res.status(200).json({ message: "User logged out" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({users, message: "Users fetched" });
    console.log
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

