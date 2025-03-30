import express from "express";
import { connectDB } from "./config/connectDb.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import adminSchema from "./models/adminSchema.js";
import taskListSchema from "./models/taskListSchema.js";
import bcrypt from "bcryptjs";

dotenv.config({
  path: "./.env",
});

const addingAdminCredentialsManually = async () => {
  {
    try {
      const admin = {
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
      };

      const existingAdmin = await adminSchema.findOne({ email: admin.email });
      if (existingAdmin) {
        console.log("Admin already exists");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashedPassword;

      const adminData = await adminSchema.create(admin);
      console.log(adminData);
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteAllTaskList = async () => {
  try {
    await taskListSchema.deleteMany({});
    console.log("All task list deleted");
  } catch (error) {
    console.log(error);
  }
};

// deleteAllTaskList();

// addingAdminCredentialsManually();

const PORT = process.env.PORT || 9001;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
