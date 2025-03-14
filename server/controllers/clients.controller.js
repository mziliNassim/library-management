const Client = require("../models/Client");
const Emprunt = require("../models/Emprunt");
const auth = require("../middlewares/auth");
const TokenBlacklist = require("../models/TokenBlacklist");

// Authentication
const register = async (req, res) => {
  try {
    const { nom, email, password, confirmPassword } = req.body;
    if (!nom || !email || !password || !confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Require all fields!",
        data: null,
      });

    const client = new Client(req.body);

    try {
      // Valid Nom
      await client.validName(nom);

      // Valid Email
      await client.validEmail(email);

      // Password match
      await client.matchPassword(password, confirmPassword);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        data: null,
      });
    }

    client.active = true;
    await client.save();
    const token = await auth.generateToken(client);

    client.password = undefined;
    client.__v = undefined;

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: { client, token },
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({
        success: false,
        message: "Invalid Email address!",
        data: null,
      });

    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client || !(await client.comparePassword(req.body.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
        data: null,
      });
    }

    // Set active to true if it was false
    if (!client.active) {
      client.active = true;
      await client.save();
    }

    const token = await auth.generateToken(client);

    client.password = undefined;
    client.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      data: { client, token },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
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

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

// Profile
const updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["nom", "email", "adresse", "socials"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    // Check if the updates are valid
    if (!isValidOperation) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid updates!", data: null });
    }

    // Check if the email is being updated
    if (updates.includes("email")) {
      const newEmail = req.body.email;

      // Check if the new email already exists in the database
      const emailExists = await Client.emailExists(newEmail);

      // If the email exists and belongs to a different client, return an error
      if (
        emailExists &&
        emailExists._id.toString() !== req.client._id.toString()
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Email!", data: null });
      }
    }

    // Update the client's fields
    updates.forEach((update) => (req.client[update] = req.body[update]));

    // Save the updated client
    const client = await Client.findByIdAndUpdate(req.client._id, req.client, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    // Remove sensitive fields from the response
    client.password = undefined;
    client.__v = undefined;

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: { client },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Check if all required fields are present
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required (oldPassword, newPassword, confirmPassword)!",
        data: null,
      });
    }

    const client = req.client;

    // Verify old password
    const isValidPassword = await client.comparePassword(oldPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect!",
        data: null,
      });
    }

    // Validate and match new passwords
    try {
      await req.client.matchPassword(newPassword, confirmPassword);
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: error.message, data: null });
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
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getClientDetails = async (req, res) => {
  try {
    const client = req.client;

    client.password = undefined;
    client.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Client details fetched successfully!",
      data: { client },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find({ clientId: req.client._id });
    if (emprunts.length === 0)
      return res.status(404).json({
        success: false,
        message: "No emprunts found!",
        data: { emprunts: [] },
      });

    return res.status(200).json({
      success: true,
      message: "Emprunts fetched successfully!",
      data: { emprunts },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

// CRUD
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    if (clients.length === 0)
      return res.status(404).json({
        success: false,
        message: "No clients found!",
        data: { clients: [] },
      });

    clients.map((client) => {
      client.password = undefined;
      client.__v = undefined;
      return client;
    });

    return res.json({
      success: true,
      message: "Clients fetched successfully!",
      data: { clients },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "Client not found!", data: null });

    client.password = undefined;
    client.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Client fetched successfully!",
      data: { client },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "Client not found!", data: null });

    client.password = undefined;
    client.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Client updated successfully!",
      data: { client },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "Client not found!", data: null });

    client.password = undefined;
    client.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully!",
      data: { client },
    });
  } catch (error) {
    return res
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
