const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth");

const {
  getArticles,
  getArticleByID,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/blog.controller.js");

// @desc    Get all articles
// @route   GET /api/blog
// @access  Public
router.get("/", getArticles);

// @desc    Get article by ID
// @route   GET /api/blog/:id
// @access  Public
router.get("/:id", getArticleByID);

// @desc    create article
// @route   POST /api/blog
// @access  Admin
router.post("/", authenticate, authorize(["admin"]), createArticle);

// @desc    update article by ID
// @route   PUT /api/blog/:id
// @access  Admin
router.put("/:id", authenticate, authorize(["admin"]), updateArticle);

// @desc    delete article by ID
// @route   POST /api/blog
// @access  Admin
router.delete("/:id", authenticate, authorize(["admin"]), deleteArticle);

module.exports = router;
