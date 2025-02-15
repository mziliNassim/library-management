const Client = require("../models/Client");
const Emprunt = require("../models/Emprunt");
const auth = require("../middlewares/auth");
const TokenBlacklist = require("../models/TokenBlacklist");

// Authentication
const register = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    const token = await auth.generateToken(client);
    res.status(201).json({ client, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client || !(await client.comparePassword(req.body.password))) {
      return res.status(401).json({ message: "Login failed" });
    }
    const token = await auth.generateToken(client);
    res.json({ client, token });
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
  getClientDetails,
  getEmprunts,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
