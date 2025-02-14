const Categorie = require("../models/Categorie");

const addCategorie = async (req, res) => {
  try {
    const categorie = new Categorie(req.body);
    await categorie.save();
    res
      .status(201)
      .json({ categorie, message: "Category created successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find({});
    if (categories.length === 0)
      return res.status(404).send({ message: "No categories found!" });
    res.send(categories);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie)
      return res.status(404).send({ message: "Category not found" });
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!categorie)
      return res.status(404).send({ message: "Category not found" });
    res
      .status(200)
      .json({ categorie, message: "Category updated successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie)
      return res.status(404).send({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
  deleteCategorie,
};
