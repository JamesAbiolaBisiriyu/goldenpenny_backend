


const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request
    // console.log("User in authMiddleware:", req.user);
    next();
  } catch (error) {
    // console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
