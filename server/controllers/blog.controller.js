const Blog = require("../models/Blog");

const getArticles = async (req, res) => {
  try {
    const articles = await Blog.find();
    return res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      data: articles,
    });
  } catch (error) {
    console.log(" getArticles ~ error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const getArticleByID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Article ID is required",
        data: null,
      });
    }

    const article = await Blog.findById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    console.log(" getArticleByID ~ error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, excerpt, author, category, image } = req.body;
    console.log(" createArticle ~ req.body:", req.body);

    if (!title || !excerpt || !author || !category || !image)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: null,
      });

    const article = await Blog.create(req.body);

    if (!article)
      return res.status(400).json({
        success: false,
        message: "Article creation failed",
        data: null,
      });

    return res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: article,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Article ID is required",
        data: null,
      });
    }

    // Find article first to check if it exists
    const articleExists = await Blog.findById(id);
    if (!articleExists) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
        data: null,
      });
    }

    // Update with validation for required fields if they are being updated
    const updatedArticle = await Blog.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: updatedArticle,
    });
  } catch (error) {
    console.log(" updateArticle ~ error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Article ID is required",
        data: null,
      });
    }

    const deletedArticle = await Blog.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      data: deletedArticle,
    });
  } catch (error) {
    console.log(" deleteArticle ~ error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  getArticles,
  getArticleByID,
  createArticle,
  updateArticle,
  deleteArticle,
};
