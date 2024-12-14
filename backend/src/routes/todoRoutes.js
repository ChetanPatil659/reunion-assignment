import { Router } from "express";
import Todo from "../Models/todoSchema.js";
import User from "../Models/userSchema.js";
import { timeDifferenceInHours } from "../helper/timeInHours.js";

const router = Router();

router.get("/getTodos", async (req, res) => {
  try {
    const { email, userName } = req.user;
    if (!email || !userName) {
      res.status(404).json({ message: "User not found" });
    }
    const todos = await Todo.find();

    const todosWithElapsedTime = todos.map(async (todo) => {
      const todoDate = await Todo.findOne({ _id: todo._id });
      const elapsedTime = timeDifferenceInHours(todoDate.startDate) > 0 ? timeDifferenceInHours(todoDate.startDate) : 0;
      const timeLeft = timeDifferenceInHours(todoDate.endDate) > 0 ? 0 : Math.abs(timeDifferenceInHours(todoDate.endDate));

      return {...todoDate._doc, elapsedTime, timeLeft};
    });

    const tem = await Promise.all(todosWithElapsedTime);

    return res.status(200).json({ todos: tem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { email, userName } = req.user;
    const {
      title,
      startDate,
      endDate,
      priority = 3,
      status = "pending",
    } = req.body;
    if (!email || !userName) {
      res.status(404).json({ message: "User not found" });
    }

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todo = await Todo.create({
      title,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      priority,
      status,
    });

    if (status === "completed") {
      user.completedTodos = user.completedTodos + 1;
      user.save();
    }

    user.pendingTodos = user.pendingTodos + 1;
    user.save();

    await User.findOneAndUpdate({ email }, { $push: { todos: todo._id } });

    return res.status(201).json({ todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { email, userName } = req.user;
    const { id } = req.params;
    const { title, startDate, endDate, priority = 4, status } = req.body;

    if (!email || !userName) {
      res.status(404).json({ message: "User not found" });
    }

    if (!id) {
      return res.status(400).json({ message: "Todo id is required" });
    }

    const todo = await Todo.findOne({ _id: id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.status === "completed") {
      return res.status(400).json({ message: "Todo is already completed" });
    }

    if (!title && !startDate && !endDate && !priority && !status) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    if (status === "completed") {
      const user = await User.findOne({ email });
      user.completedTodos = user.completedTodos + 1;
      user.pendingTodos = user.pendingTodos - 1;
      todo.totalTime = timeDifferenceInHours(todo.startDate);
      if (user.averageTimeToComplete === 0) {
        user.averageTimeToComplete = timeDifferenceInHours(todo.startDate);
      }
      user.averageTimeToComplete =
        (user.averageTimeToComplete + timeDifferenceInHours(todo.startDate)) /
        2;
      await user.save();
    }

    todo.title = title || todo?.title;
    todo.startDate = new Date(startDate).toISOString() || todo?.startDate;
    todo.endDate = new Date(endDate).toISOString() || todo?.endDate;
    todo.priority = priority || todo?.priority;
    todo.status = status || todo?.status;

    await todo.save();

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ todo, message: "Todo updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
