const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth");

const {
  getAllLivers,
  getLiverById,
  getLivresSouhaits,
  addLivreSouhaits,
  addLivre,
  updateLivre,
  deleteLivre,
  removeLivreSouhaits,
} = require("../controllers/livres.controller");

// @desc    Get all books
// @route   GET /api/livres/
// @access  Public
router.get("/", getAllLivers);

// @desc    Get a books wishlist
// @route   GET /api/livres/wishlist
// @access  Client
router.get("/wishlist", authenticate, getLivresSouhaits);

// @desc    Add a book to client's wishlist
// @route   POST /api/livres/wishlist/:id
// @access  Client
router.post("/wishlist/:id", authenticate, addLivreSouhaits);

// @desc    Remove a book from client's wishlist
// @route   DELETE /api/livres/wishlist/:id
// @access  Client
router.delete("/wishlist/:id", authenticate, removeLivreSouhaits);

// @desc    Get a book by ID
// @route   GET /api/livres/:id
// @access  Public
router.get("/:id", getLiverById);

// @desc    Add a new book
// @route   POST /api/livres/
// @access  Admin
router.post("/", authenticate, authorize(["admin"]), addLivre);

// @desc    Update a book
// @route   PUT /api/livres/:id
// @access  Admin
router.put("/:id", authenticate, authorize(["admin"]), updateLivre);

// @desc    Delete a book
// @route   DELETE /api/livres/:id
// @access  Admin
router.delete("/:id", authenticate, authorize(["admin"]), deleteLivre);

module.exports = router;
