import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const getUserFromToken = async (userToken) => {
  // Get the token from the request headers
  console.log("you are inside getUserFromToken:", userToken);
  console.log(userToken);

  if (!userToken) {
    console.log("No token provided");
    return false;
  }


  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

    // Extract the user's ID from the decoded token
    const { id } = decoded;

    // Retrieve the user from the database using the user's ID
    const fullUser = await User.findById(id);
    if (!fullUser) {
      console.log("User not found");
      return false;
    }

    // Add the user to the request object
    return  { username: fullUser.username  }; // Storing the username under a 'username' property for clarity
  } catch (error) {
    console.log("Error verifying token:", error);
    return false;
  }
};
