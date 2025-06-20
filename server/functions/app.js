const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

// Routes
app.get("/", (req, res) =>
  res.json({ success: true, message: "API is running...!" })
);

app.use("/api/livres", require("../routes/livres"));
app.use("/api/clients", require("../routes/clients"));
app.use("/api/categories", require("../routes/categories"));
app.use("/api/emprunts", require("../routes/emprunts"));
app.use("/api/blog", require("../routes/blog"));

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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

module.exports.handler = serverless(handler);
