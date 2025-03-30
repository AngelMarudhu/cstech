import express from "express";
import {
  createAgent,
  deleteAgent,
  editAgent,
  fetchAgents,
  fetchAgentTasks,
  deleteAllTasks,
} from "../controllers/agentControllers.js";

export const agentRouter = express.Router();

agentRouter.post("/create-agent", createAgent);
agentRouter.put("/edit-agent/:id", editAgent);
agentRouter.delete("/delete-agent/:id", deleteAgent);
agentRouter.get("/fetch-agent-tasks", fetchAgentTasks);
agentRouter.get("/fetch-agents", fetchAgents);
agentRouter.delete("/delete-all-task", deleteAllTasks);
