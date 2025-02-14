const express = require("express");
const router = express.Router();

const { clientAuth, adminAuth } = require("../middlewares/auth");

const {
  createEmprunt,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt,
  getAllEmprunts,
  getEmpruntsByClient,
  returnEmprunt,
} = require("../controllers/emprunts.controller");

// @desc    Create a new emprunt (borrow a book)
// @route   POST /api/emprunts
// @access  Client
router.post("/", clientAuth, createEmprunt);

// @desc    Get an emprunt by ID
// @route   GET /api/emprunts/:id
// @access  Client or Admin
router.get("/:id", clientAuth, getEmpruntById);

// @desc    Update an emprunt (e.g., extend return date)
// @route   PUT /api/emprunts/:id
// @access  Admin
router.put("/:id", adminAuth, updateEmprunt);

// @desc    Delete an emprunt
// @route   DELETE /api/emprunts/:id
// @access  Admin
router.delete("/:id", adminAuth, deleteEmprunt);

// @desc    Get all emprunts (for admin)
// @route   GET /api/emprunts
// @access  Admin
router.get("/", adminAuth, getAllEmprunts);

// @desc    Get all emprunts for a specific client
// @route   GET /api/emprunts/client/:clientId
// @access  Admin or Client (if accessing their own emprunts)
router.get("/client/:clientId", clientAuth, getEmpruntsByClient);

// @desc    Return a book (mark emprunt as returned)
// @route   POST /api/emprunts/:id/return
// @access  Client or Admin
router.post("/:id/return", clientAuth, returnEmprunt);

module.exports = router;
