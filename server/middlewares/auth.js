const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const Admin = require("../models/Admin");

const generateToken = (user) => {
  return jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const clientAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await Client.findOne({ _id: decoded.id, active: true });

    if (!client) throw new Error();

    req.token = token;
    req.client = client;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: error.message, message: "Authentication required!" });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: decoded.id });

    if (!admin) throw new Error();

    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message,
      message: "Admin authentication required!",
    });
  }
};

module.exports = { generateToken, clientAuth, adminAuth };
