const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nassim:nassim@bibliotheque.8pdbr.mongodb.net/bibliotheque?retryWrites=true&w=majority&appName=bibliotheque"
    );
    console.log("MongoDB connected successfully!");
    return mongoose.connection;
  } catch (err) {
    console.error(`MongoDB connected Failed! Error : ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
