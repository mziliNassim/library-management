const Blog = require("../models/Blog");

const getArticles = async (req, res) => {
  try {
    const articles = await Blog.find({});
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

module.exports = {
  getArticles,
  createArticle,
};
