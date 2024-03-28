import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const getUserFromToken = async (req, res, next) => {
  // Get the token from the request headers
  const header = req.headers.authorization;
  console.log("token in the server:", header);

  if (!header) {
    console.log("no header");
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the Authorization header format is correct
  if (!header.startsWith("Bearer ")) {
    console.log("no bearer");
    return res.status(401).json({ message: "Unauthorized: No Bearer" });
  }

  // Extract the actual token from the Authorization header
  const token = header.split(" ")[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    // Extract the user's ID from the decoded token
    const { id } = decoded;

    // Retrieve the user from the database using the user's ID
    const fullUser = await User.findById(id);
    console.log("fullUser:", fullUser);
    if (!fullUser) {
      return res.status(401).json({ message: "User not found" });
    }

    // Add the user to the request object
    req.user = { ...fullUser._doc, username: fullUser.username }; // Storing the username under a 'username' property for clarity

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
