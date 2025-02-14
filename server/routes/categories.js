const { Router } = require("express");
const router = Router();

const { adminAuth } = require("../middlewares/auth");

const {
  addCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
  deleteCategorie,
} = require("../controllers/categories.controller");

// @desc    Add a new category
// @route   POST /api/categories/
// @access  Admin
router.post("/", adminAuth, addCategorie);

// @desc    Get all categories
// @route   GET /api/categories/
// @access  Public
router.get("/", getAllCategories);

// @desc    Get a category by ID
// @route   GET /api/categories/:id
// @access  Public
router.get("/:id", getCategorieById);

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Admin
router.put("/:id", adminAuth, updateCategorie);

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Admin
router.delete("/:id", adminAuth, deleteCategorie);

module.exports = router;
