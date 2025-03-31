import agentSchema from "../models/agentSchema.js";
import taskListSchema from "../models/taskListSchema.js";
import bcrypt from "bcryptjs";

export const createAgent = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingAgent = await agentSchema.findOne({ email });

    if (existingAgent) {
      return res.status(400).json({ message: "Please use a different email" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const agent = await agentSchema.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      message: "Agent created successfully",
      agent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editAgent = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const agent = await agentSchema.findById(id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const existingAgent = await agentSchema.findOne({ email });

    if (existingAgent && existingAgent._id.toString() !== id) {
      return res.status(400).json({ message: "please use different email" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedAgent = await agentSchema.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashedPassword,
        phone,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Agent updated successfully",
      data: {
        id: updatedAgent._id,
        name: updatedAgent.name,
        email: updatedAgent.email,
        phone: updatedAgent.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await agentSchema.findById(id);
    const findTheirAgentTasks = await taskListSchema.findOne({
      assignedTo: id,
    });

    if (findTheirAgentTasks) {
      await taskListSchema.findOneAndDelete({ assignedTo: id });
    }

    if (!agent) {
      return res.status(404).json({ message: "user not found" });
    }

    await agentSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAgents = async (req, res) => {
  try {
    const agents = await agentSchema.find().select("-password");

    if (agents.length === 0) {
      return res.status(404).json({ message: "No Agents Found" });
    }

    res.status(200).json({
      message: "Agents fetched successfully",
      data: agents,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAgentTasks = async (req, res) => {
  try {
    const taskListDetails = await taskListSchema.find().populate("assignedTo");

    const totalTasks = await taskListSchema.aggregate([
      {
        $project: {
          taskCount: { $size: "$taskList" },
        },
      },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: "$taskCount" },
        },
      },
    ]);

    if (taskListDetails.length === 0) {
      return res.status(404).json({ message: "Please assign tasks to agent" });
    }

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: taskListDetails,
      totalTasks: totalTasks[0]?.totalTasks || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAllTasks = async (req, res) => {
  try {
    await taskListSchema.deleteMany({});

    res.status(200).json({ message: "All tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
