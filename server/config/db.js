const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
    return mongoose.connection;
  } catch (err) {
    console.error(`MongoDB connected Failed! Error : ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
