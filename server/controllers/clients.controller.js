const Client = require("../models/Client");
const Emprunt = require("../models/Emprunt");
const auth = require("../middlewares/auth");

// Authentication
const register = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    const token = await auth.generateToken(client);
    res.status(201).send({ client, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client || !(await client.login(req.body.password))) {
      return res.status(401).send({ error: "Login failed" });
    }
    const token = await auth.generateToken(client);
    res.send({ client, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Profile
const logout = async (req, res) => {
  try {
    // Invalidate the token (optional, depending on your token management strategy)
    req.client.tokens = req.client.tokens.filter(
      (token) => token !== req.token
    );
    await req.client.save();
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["nom", "email", "adresse"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    updates.forEach((update) => (req.client[update] = req.body[update]));
    await req.client.save();
    res.send({ client: req.client, message: "Profile updated successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getClientDetails = async (req, res) => {
  try {
    res.send(req.client);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find({ clientId: req.client._id }).populate(
      "livreId"
    );
    if (emprunts.length === 0)
      return res.status(404).send({ message: "No emprunts found!" });
    res.send(emprunts);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// CRUD
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    if (clients.length === 0)
      return res.status(404).send({ message: "No clients found!" });
    res.send(clients);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).send({ message: "Client not found" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client) return res.status(404).send({ message: "Client not found" });
    res.status(200).json({ client, message: "Client updated successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).send({ message: "Client not found" });
    res.status(200).json({ message: "Client deleted successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
  getClientDetails,
  getEmprunts,
};
