// models/TokenBlacklist.js
const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" }, // Automatically delete after 24h
});

const TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);
module.exports = TokenBlacklist;
