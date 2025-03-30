import jwt from "jsonwebtoken";
import adminSchema from "../models/adminSchema.js";

export const authenticateUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "provide your token" });
    }

    const doecodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminSchema.findById(doecodeToken.id);

    req.user = admin;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
