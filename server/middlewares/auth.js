const jwt = require("jsonwebtoken");
const Client = require("../models/Client");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Authorization token is required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Client.findOne({ _id: decoded.id, active: true });

    if (!user) throw new Error("User not found or inactive");

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message, message: "Authentication required!" });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { generateToken, authenticate, authorize };
