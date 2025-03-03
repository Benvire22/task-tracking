import mongoose from "mongoose";
import { TaskFields } from "@/taskTypes";

const Schema = mongoose.Schema;

const TaskSchema = new Schema<TaskFields>({
  title: {
    required: true,
    type: String,
  },
  description: String,
  status: {
    required: true,
    type: String,
    enum: ["Backlog", "To be completed", "In progress", "Complete"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
