import adminSchema from "../models/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    const admin = await adminSchema.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "password missmatch" });
    }

    //// generate the token for the admin
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "20d",
    });

    res.status(200).json({
      message: "Admin Logged In Successfully",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminInfo = async (req, res) => {
  // console.log(req.user);

  try {
    const requestAdmin = req.user._id;

    const admin = await adminSchema.findById(requestAdmin).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    res.status(200).json({
      message: "Admin Info",
      admin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
