const express = require("express");
const router = express.Router();

const { clientAuth } = require("../middlewares/auth");

const {
  register,
  login,
  logout,
  updateProfile,
  getEmprunts,
  getClientDetails,
} = require("../controllers/clients.controller");

// ! ========== Authentification ==========

// @desc    Register a new client
// @route   POST /api/clients/register
// @access  Public
router.post("/register", register);

// @desc    Login a client
// @route   POST /api/clients/login
// @access  Public
router.post("/login", login);

// @desc    Logout a client
// @route   POST /api/clients/logout
// @access  Client
router.post("/logout", clientAuth, logout);

// ! ========== Profile ==========

// @desc    Update client profile
// @route   PUT /api/clients/profile
// @access  Client
router.put("/profile", clientAuth, updateProfile);

// @desc    Get client details
// @route   GET /api/clients/me
// @access  Client
router.get("/me", clientAuth, getClientDetails);

// @desc    Get all emprunts for a client
// @route   GET /api/clients/emprunts
// @access  Client
router.get("/emprunts", clientAuth, getEmprunts);

// ! ========== Crud ==========

// @desc    Get all clients
// @route   GET /api/clients/
// @access  Admin
router.get("/", adminAuth, getAllClients);

// @desc    Get a client by ID
// @route   GET /api/clients/:id
// @access  Admin
router.get("/:id", adminAuth, getClientById);

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Admin
router.put("/:id", adminAuth, updateClient);

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Admin
router.delete("/:id", adminAuth, deleteClient);

// ! ==========  ==========

module.exports = router;
