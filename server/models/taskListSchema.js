import mongoose from "mongoose";

const taskListStyle = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

const taskListSchema = new mongoose.Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  taskList: [taskListStyle],
});

export default mongoose.model("TaskList", taskListSchema);
