const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  excerpt: {
    type: String,
    required: [true, "Excerpt is required"],
    trim: true,
    minlength: [10, "Excerpt must be at least 10 characters long"],
    maxlength: [500, "Excerpt cannot exceed 500 characters"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  image: {
    // base64 encoded image data
    type: String,
    required: [true, "Image is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
