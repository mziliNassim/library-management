const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middlewares/auth");

const {
  createEmprunt,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt,
  getAllEmprunts,
  getEmpruntsByClient,
  returnEmprunt,
} = require("../controllers/emprunts.controller");

// @desc    Create a new emprunt
// @route   POST /api/emprunts/:livreId
// @access  Client
router.post("/:livreId", authenticate, createEmprunt);

// @desc    Get an emprunt by ID (only for the client who made the emprunt)
// @route   GET /api/emprunts/:id
// @access  Client
router.get("/:id", authenticate, getEmpruntById);

// @desc    Update an emprunt (e.g., extend return date)
// @route   PUT /api/emprunts/:id
// @access  Admin
router.put("/:id", authenticate, authorize(["admin"]), updateEmprunt);

// @desc    Delete an emprunt
// @route   DELETE /api/emprunts/:id
// @access  Admin
router.delete("/:id", authenticate, authorize(["admin"]), deleteEmprunt);

// @desc    Get all emprunts (for admin)
// @route   GET /api/emprunts
// @access  Admin
router.get("/", authenticate, authorize(["admin"]), getAllEmprunts);

// @desc    Get all emprunts for a specific client
// @route   GET /api/emprunts/client/:clientId
// @access  Client
router.get("/client/:clientId", authenticate, getEmpruntsByClient);

// @desc    Return a book (mark emprunt as returned)
// @route   POST /api/emprunts/:id/return
// @access  Client
router.post("/:id/return", authenticate, returnEmprunt);

module.exports = router;
