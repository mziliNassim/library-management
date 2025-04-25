const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth");

const {
  getArticles,
  getArticleByID,
  createArticle,
  updateArticle,
} = require("../controllers/blog.controller.js");

// @desc    Get all articles
// @route   POST /api/blog
// @access  Client
router.get("/", authenticate, getArticles);

// @desc    Get article by ID
// @route   POST /api/blog
// @access  Client
router.get("/:id", authenticate, getArticleByID);

// @desc    Get article by ID
// @route   POST /api/blog
// @access  Client
router.post("/", authenticate, createArticle);

// @desc    update article by ID
// @route   POST /api/blog
// @access  Client
router.put("/:id", authenticate, updateArticle);

module.exports = router;
