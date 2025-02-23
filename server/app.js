const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test Route
app.get("/", (req, res) => {
  return res.send("Library Management System");
});

// Routes
app.use("/api/livres", require("./routes/livres"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/emprunts", require("./routes/emprunts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
