const express = require("express");
const router = express.Router();

const {
  authenticate,
  authorize,
  tokenAuthorize,
} = require("../middlewares/auth");

const {
  register,
  login,
  logout,
  updateProfile,
  updatePassword,
  getEmprunts,
  getClientDetails,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  forgotPassword,
  resetPassword,
} = require("../controllers/clients.controller");

// ! ========== Token Validation ==========
// @desc    Token Validation
// @route   get /api/clients/validToken/:token
// @access  Public
router.get("/validToken/:token", tokenAuthorize);

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
router.post("/logout", authenticate, logout);

// @desc    Forgot Password
// @route   POST /api/clients/forgot-password
// @access  Public
router.post("/forgot-password", forgotPassword);

// @desc    Reset Password
// @route   POST /api/clients/reset-password/:token
// @access  Public
router.post("/reset-password/:token", resetPassword);

// ! ========== Profile ==========

// @desc    Update client profile
// @route   PUT /api/clients/profile
// @access  Client
router.put("/profile", authenticate, updateProfile);

// @desc    Update client password
// @route   PUT /api/clients/password
// @access  Client
router.put("/password", authenticate, updatePassword);

// @desc    Get client details
// @route   GET /api/clients/me
// @access  Client
router.get("/me", authenticate, getClientDetails);

// @desc    Get all emprunts for a client
// @route   GET /api/clients/emprunts
// @access  Client
router.get("/emprunts", authenticate, getEmprunts);

// ! ========== Crud ==========

// @desc    Get all clients
// @route   GET /api/clients/
// @access  Admin
router.get("/", authenticate, authorize(["admin"]), getAllClients);

// @desc    Get a client by ID
// @route   GET /api/clients/:id
// @access  Admin
router.get("/:id", authenticate, authorize(["admin"]), getClientById);

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Admin
router.put("/:id", authenticate, authorize(["admin"]), updateClient);

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Admin
router.delete("/:id", authenticate, authorize(["admin"]), deleteClient);

// ! ==========  ==========

module.exports = router;
