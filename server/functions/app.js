const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.use("/", require("../routes/endpoint.js"));

app.use("/api/livres", require("../routes/livres"));
app.use("/api/clients", require("../routes/clients"));
app.use("/api/categories", require("../routes/categories"));
app.use("/api/emprunts", require("../routes/emprunts"));

// Database connection and serverless function export
let isDatabaseConnected = false;
const handler = async (req, res) => {
  if (!isDatabaseConnected) {
    try {
      await connectDB();
      isDatabaseConnected = true;
      console.log("Database connected successfully!");
    } catch (err) {
      console.error("Database connection error:", err);
      return res.status(500).send("Database connection failed");
    }
  }

  // Pass the request to the Express app
  return app(req, res);
};

module.exports.handler = serverless(handler);
