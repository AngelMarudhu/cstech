import express, { urlencoded } from "express";
import cors from "cors";
import { adminRouter } from "./routes/adminRoutes.js";
import { agentRouter } from "./routes/agentRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
import { authenticateUser } from "./middleware/authenticateUser.js";
import multer from "./middleware/multer.js";

export const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(urlencoded({ extended: true }));

// app.use("/", async (req, res, next) => {
//   res.status(200).json({
//     message: "Welcome to Task Management Systesm",
//   });s
// });

app.use("/admin", adminRouter);
app.use("/agent", authenticateUser, agentRouter);
app.use("/task", authenticateUser, multer.single("file"), taskRouter);
