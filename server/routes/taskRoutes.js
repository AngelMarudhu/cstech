import express from "express";
import fileUpload from "express-fileupload";
import cloudinary from "../config/cloudinary.js";
import { fileUploadController } from "../controllers/taskControllers.js";

export const taskRouter = express.Router();

taskRouter.post("/upload", fileUploadController);
