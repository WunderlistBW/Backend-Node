// Dependency Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authMiddleware = require("../auth/authMiddleware");

// Server Creation
const server = express();

// Middleware Libraries
server.use(cors());
server.use(helmet());
server.use(express.json());

// Custom Routers
const authRouter = require("../auth/authRouter");
const taskRouter = require("../tasks/taskRouter");
server.use("/api/auth", authRouter);
server.use("/api/tasks", authMiddleware, taskRouter);

// Test Endpoint
server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
