const { Router } = require("express");
const router = Router();
// const { authenticate, authorize } = require("../middlewares/auth");

const {
  getArticles,
  getArticleByID,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/blog.controller.js");

// @desc    Get all articles
// @route   GET /api/blog
// @access  Client
router.get("/", getArticles);

// @desc    Get article by ID
// @route   GET /api/blog
// @access  Client
router.get("/:id", getArticleByID);

// @desc    create article
// @route   POST /api/blog
// @access  Client
router.post("/", createArticle);

// @desc    update article by ID
// @route   PUT /api/blog/:id
// @access  Client
router.put("/:id", updateArticle);

// @desc    delete article by ID
// @route   POST /api/blog
// @access  Client
router.delete("/:id", deleteArticle);

module.exports = router;
