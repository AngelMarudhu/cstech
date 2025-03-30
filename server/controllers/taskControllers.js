import agentSchema from "../models/agentSchema.js";
import taskListSchema from "../models/taskListSchema.js";
import cloudinary from "../config/cloudinary.js";
import csvParser from "csv-parser";
import fs from "fs";
import stripBomStream from "strip-bom-stream";

export const fileUploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    const uploadCloudinary = await cloudinary.uploader.upload(filePath, {
      folder: process.env.CLOUDINARY_FOLDER,
      resource_type: "raw",
    });

    const taskList = [];

    const parser = fs
      .createReadStream(filePath)
      .pipe(stripBomStream())
      .pipe(csvParser());

    parser.on("data", (data) => {
      // console.log(data);

      if (data.firstname && data.phone && data.notes) {
        // to before push to change toLowerCase all the firstname phone, tasks
        taskList.push({
          firstName: data.firstname.toLowerCase(),
          phone: data.phone.toLowerCase(),
          notes: data.notes.toLowerCase(),
        });
      }
    });

    parser.on("end", async () => {
      fs.unlinkSync(filePath);

      const agent = await agentSchema.find();

      if (agent.length < 1) {
        return res.status(400).json({ error: "No agent found" });
      }

      if (taskList.length === 0) {
        return res
          .status(400)
          .json({ error: "CSV file contains no valid data" });
      }

      let distributedList = {};
      let agentIndex = 0;

      taskList.forEach((task) => {
        const assignedAgent = agent[agentIndex]._id; //// selected agent id
        if (!distributedList[assignedAgent]) {
          distributedList[assignedAgent] = [];
        }
        distributedList[assignedAgent].push(task);
        agentIndex = (agentIndex + 1) % agent.length;
        //// the agentindex working as a circular array like robin algorithm
        //// for example 0,1,2,0,1,2,0,1,2---> 1 mod 4 = 1, 2 mod 4 = 2, 3 mod 4 = 3, 4 mod 4 = 0 again......
      });

      for (let agentId in distributedList) {
        const agent = await agentSchema.findById(agentId);
        const taskList = distributedList[agentId];

        const existingAgentNotes = await taskListSchema.findOne({
          assignedTo: agentId,
        });

        if (existingAgentNotes) {
          await taskListSchema.findOneAndUpdate(
            { assignedTo: agentId },
            {
              $push: {
                taskList: {
                  $each: taskList,
                },
              },
            }
          );
        } else {
          await taskListSchema.create({
            assignedTo: agent._id,
            taskList: taskList,
          });
        }
      }
      res.status(200).json({
        message: "File uploaded and distributed done",
        data: uploadCloudinary.original_filename,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
