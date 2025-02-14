const { Router } = require("express");
const router = Router();

const { adminAuth } = require("../middlewares/auth");

const {
  addLivre,
  getAllLivers,
  getLiverById,
  updateLivre,
  deleteLivre,
} = require("../controllers/livres.controller");

// @desc    Add a new book
// @route   POST /api/livres/
// @access  Admin
router.post("/", adminAuth, addLivre);

// @desc    Get all books
// @route   GET /api/livres/
// @access  Public
router.get("/", getAllLivers);

// @desc    Get a book by ID
// @route   GET /api/livres/:id
// @access  Public
router.get("/:id", getLiverById);

// @desc    Update a book
// @route   PUT /api/livres/:id
// @access  Admin
router.put("/:id", adminAuth, updateLivre);

// @desc    Delete a book
// @route   DELETE /api/livres/:id
// @access  Admin
router.delete("/:id", adminAuth, deleteLivre);

module.exports = router;
