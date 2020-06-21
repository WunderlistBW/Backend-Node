// Dependency Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Server Creation
const server = express();

// Middleware Libraries
server.use(cors());
server.use(helmet());
server.use(express.json());

// Custom Routers
const authRouter = require("../auth/authRouter");
server.use("/api/auth", authRouter);

// Test Endpoint
server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
