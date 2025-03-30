import express from "express";
import { adminLogin, getAdminInfo } from "../controllers/adminControllers.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

export const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/get-admin-info", authenticateUser, getAdminInfo);
