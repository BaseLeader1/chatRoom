import { getUserFromToken } from "./getUserFromToken.js";

export const getUser = async (req, res) => {
  console.log("Get user request received");

  const token = req.header("authorization")?.split(" ")[1];
  console.log(token);
  const user = await getUserFromToken(token);
  console.log(user);
  if (!user) {
    console.log("Unauthorized");
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.json(user);
};
