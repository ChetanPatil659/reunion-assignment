import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  accessToken: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
  },
  averageTimeToComplete: {
    type: Number,
    default: 0,
  },
  pendingTodos: {
    type: Number,
    default: 0,
  },
  completedTodos: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
