import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  priority: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 3,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
