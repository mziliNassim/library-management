const Livre = require("../models/Livre");

const getAllLivers = async (req, res) => {
  try {
    const livres = await Livre.find({});
    if (livres.length === 0)
      return res.status(404).json({
        success: false,
        message: "No books found!",
        data: { livres: [] },
      });

    return res.status(200).json({
      success: true,
      message: "Books found successfully!",
      data: { livres },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getLiverById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre)
      return res
        .status(404)
        .json({ success: false, message: "Book not found!", data: null });

    return res.status(200).json({
      success: true,
      message: "Book found successfully!",
      data: { livre },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

const addLivre = async (req, res) => {
  try {
    const livre = new Livre(req.body);
    await livre.save();

    return res.status(201).json({
      success: true,
      message: "Book created successfully!",
      data: { livre },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!livre)
      return res
        .status(404)
        .json({ success: false, message: "Book not found!", data: null });

    return res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      data: { livre },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

const deleteLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre)
      return res
        .status(404)
        .json({ success: false, message: "Book not found!", data: null });

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully!",
      data: { livre },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

module.exports = {
  addLivre,
  getAllLivers,
  getLiverById,
  updateLivre,
  deleteLivre,
};
