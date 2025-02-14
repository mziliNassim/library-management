const Livre = require("../models/Livre");

const addLivre = async (req, res) => {
  try {
    const livre = new Livre(req.body);
    await livre.save();
    return res
      .status(201)
      .json({ livre, message: "Book created successfully!" });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const getAllLivers = async (req, res) => {
  try {
    const livres = await Livre.find({});
    if (livres.length === 0)
      return res.status(404).send({ message: "No books found!" });
    return res.send(livres);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getLiverById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) return res.status(404).send({ message: "Book not found" });
    return res.status(200).json(livre);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!livre) return res.status(404).send({ message: "Book not found" });
    return res
      .status(200)
      .json({ livre, message: "Book updated successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) return res.status(404).send({ message: "Book not found" });
    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  addLivre,
  getAllLivers,
  getLiverById,
  updateLivre,
  deleteLivre,
};
