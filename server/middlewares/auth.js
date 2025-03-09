const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const TokenBlacklist = require("../models/TokenBlacklist");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    "e89f4s8d4f98sd4f984sd984f984f449s8d4f984sdf984sd984f9s84d984f984sd84f98sd4f",
    { expiresIn: "62h" }
  );
};

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Authorization token is required");

    // Check if the token is blacklisted
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    if (isBlacklisted) throw new Error("Token is invalid");

    const decoded = jwt.verify(
      token,
      "e89f4s8d4f98sd4f984sd984f984f449s8d4f984sdf984sd984f9s84d984f984sd84f98sd4f"
    );
    const client = await Client.findOne({ _id: decoded.id });

    if (!client) throw new Error("client not found or inactive");

    req.token = token;
    req.client = client;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication required!",
      data: null,
    });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.client.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
        data: null,
      });
    }
    next();
  };
};

module.exports = { generateToken, authenticate, authorize };
