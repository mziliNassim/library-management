const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/livres", require("./routes/livres"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/emprunts", require("./routes/emprunts"));

// Server listening
const listenServer = async () => {
  try {
    const connection = await connectDB();
    if (connection) {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
  } catch (err) {
    process.exit(1);
  }
};
listenServer();

module.exports = app;
