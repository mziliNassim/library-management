const Client = require("../models/Client");
const Emprunt = require("../models/Emprunt");
const auth = require("../middlewares/auth");
const TokenBlacklist = require("../models/TokenBlacklist");

// Authentication
const register = async (req, res) => {
  try {
    const client = new Client(req.body);

    // Password match
    if (
      !(await client.matchPassword(req.body.password, req.body.confirmPassword))
    ) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    client.active = true;
    await client.save();
    const token = await auth.generateToken(client);
    return res.status(201).json({ client, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    console.log("login ~ req.body:", req.body);
    const client = await Client.findOne({ email: req.body.email });
    if (!client || !(await client.comparePassword(req.body.password))) {
      return res.status(401).json({ message: "Login failed" });
    }

    // Set active to true if it was false
    if (!client.active) {
      client.active = true;
      await client.save();
    }

    const token = await auth.generateToken(client);
    res.status(200).json({ client, token });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.token;
    const blacklistedToken = new TokenBlacklist({ token });
    await blacklistedToken.save();

    // Set active to false
    const client = req.client;
    if (client.active) {
      client.active = false;
      await client.save();
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

// Profile
const updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["nom", "email", "adresse"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    updates.forEach((update) => (req.client[update] = req.body[update]));
    await req.client.save();
    res.json({ client: req.client, message: "Profile updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Check if all required fields are present
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message:
          "All fields are required (oldPassword, newPassword, confirmPassword)!",
      });
    }

    // Verify old password
    const isValidPassword = await req.client.comparePassword(oldPassword);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect!" });
    }

    // Validate and match new passwords
    try {
      await req.client.matchPassword(newPassword, confirmPassword);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    // Update password
    req.client.password = newPassword;
    await req.client.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
      data: {
        ...req.client._doc,
        password: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

const getClientDetails = async (req, res) => {
  try {
    res.status(200).json({
      message: "Client details fetched successfully!",
      client: {
        ...req.client._doc,
        password: undefined,
        role: undefined,
        active: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const getEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find({ clientId: req.client._id });
    if (emprunts.length === 0)
      return res.status(404).json({ message: "No emprunts found!" });
    res
      .status(200)
      .json({ message: "Emprunts fetched successfully!", emprunts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

// CRUD
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    if (clients.length === 0)
      return res.status(404).json({ message: "No clients found!" });
    res.json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json(client);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json({ client, message: "Client updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json({ message: "Client deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
  updatePassword,
  getClientDetails,
  getEmprunts,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
