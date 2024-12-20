import "dotenv/config";

import express, { json } from "express";
import cors from 'cors'
import { dbConnect } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

// env config

const app = express();
const port = process.env.PORT || 3000;

// db connection
dbConnect();

function requestLogger(req, res, next) {
    console.log("\x1b[36m", "===============================================");
    console.log("\x1b[33m", `Method: ${req.method}, Route: ${req.originalUrl}`);
    console.log("\x1b[33m", `Request Body: ${JSON.stringify(req.body)}`);
    console.log("\x1b[36m", "===============================================");
    console.log("\x1b[33m", `Query Parameters: ${JSON.stringify(req.query)}`);
    console.log("\x1b[36m", "===============================================");
    console.log("\x1b[33m", `Request Headers: ${JSON.stringify(req.headers)}`);
    console.log("\x1b[36m", "===============================================");
    next();
}

app.use(requestLogger);

// middlewares
app.use(express.json())
app.use(cors());

app.use("/user", userRoutes);
app.use("/todo", authenticateToken, todoRoutes);


// // testing port
// app.get("/",(req,res)=>{
//     res.send("hello world");
// })


app.listen(port,()=>{
    console.log("server is running in port 3000");
})