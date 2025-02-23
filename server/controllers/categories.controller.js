const Categorie = require("../models/Categorie");

const getAllCategories = async (req, res) => {
  try {
    SSS;
    const categories = await Categorie.find({});
    if (categories.length === 0)
      return res.status(404).json({
        success: false,
        message: "No categories found!",
        data: { categories: [] },
      });
    return res.status(200).json({
      success: false,
      message: "All categories fetched successfully!",
      data: { categories },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

const getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie)
      return res
        .status(404)
        .json({ success: false, message: "Category not found!", data: null });

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully!",
      data: { categorie },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message, data: null });
  }
};

const addCategorie = async (req, res) => {
  try {
    const categorie = new Categorie(req.body);
    await categorie.save();
    return res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: { categorie },
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: error.message, data: null });
  }
};

const updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!categorie)
      return res
        .status(404)
        .send({ success: false, message: "Category not found!", data: null });

    return res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      data: { categorie },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

const deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie)
      return res
        .status(404)
        .json({ success: false, message: "Category not found!", data: null });

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
      data: { categorie },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

module.exports = {
  addCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
  deleteCategorie,
};
