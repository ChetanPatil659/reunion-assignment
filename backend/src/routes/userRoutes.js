import { Router } from "express";
import User from "../Models/userSchema.js";
import { comparePassword, hashPassword } from "../helper/hashing.js";
import { generateToken, generateRefreshToken } from "../helper/jwtUtils.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import Todo from "../Models/todoSchema.js";
import { timeDifferenceInHours } from "../helper/timeInHours.js";
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const accessToken = generateToken({ userName, email });
    const refreshToken = generateRefreshToken({ userName, email });

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      accessToken,
      refreshToken,
    });
    return res
      .status(201)
      .json({
        message: "User registered successfully",
        accessToken,
        refreshToken,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("todos");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken({
      userName: user.userName,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      userName: user.userName,
      email: user.email,
    });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();
    return res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUser", authenticateToken, async (req, res) => {
  try {
    const { email, userName } = req.user;
    if (!email || !userName) {
      res.status(404).json({ message: "User not found" });
    }
    const user = await User.findOne({ email }).populate("todos");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = generateToken({ userName, email });
    const refreshToken = generateRefreshToken({ userName, email });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    const todosWithElapsedTime = user.todos.map(async (todo) => {
        const todoDate = await Todo.findOne({ _id: todo._id });
        const elapsedTime = timeDifferenceInHours(todoDate.startDate) > 0 ? timeDifferenceInHours(todoDate.startDate) : 0;
        const timeLeft = timeDifferenceInHours(todoDate.endDate) > 0 ? 0 : Math.abs(timeDifferenceInHours(todoDate.endDate));
  
        return {...todoDate._doc, elapsedTime, timeLeft};
      });
  
      const tem = {...user._doc, todos: await Promise.all(todosWithElapsedTime)}
  
    return res.status(200).json({ user: tem, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/logout", authenticateToken, async (req, res) => {
  try {
    const { email, userName } = req.user;
    if (!email || !userName) {
      res.status(404).json({ message: "User not found" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.accessToken = null;
    user.refreshToken = null;
    await user.save();
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
