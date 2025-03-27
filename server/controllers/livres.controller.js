const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Livre = require("../models/Livre");
const Client = require("../models/Client");

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

const getLivresSouhaits = async (req, res) => {
  try {
    const client = req.client;
    const wishlistIds = client.wishlist || [];

    // Convert string IDs to ObjectId
    const objectIdList = wishlistIds.map((id) => new ObjectId(id));

    const wishlist = await Livre.find({ _id: { $in: objectIdList } });

    if (wishlist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books in wishlist found!",
        data: { livres: [] },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist books found successfully!",
      data: { livres: wishlist },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const addLivreSouhaits = async (req, res) => {
  try {
    const clientID = req.client._id;
    const bookID = req.params.id;

    // Check if the book exists
    const livre = await Livre.findById(bookID);
    if (!livre) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
        data: null,
      });
    }

    // Find the client and update their wishlist
    const client = await Client.findById(clientID);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found!",
        data: null,
      });
    }

    // Check if the book is already in the wishlist
    if (client.wishlist.includes(bookID)) {
      return res.status(400).json({
        success: false,
        message: "Book already in wishlist!",
        data: null,
      });
    }

    // Add book to client's wishlist
    client.wishlist.push(bookID);
    await client.save();

    return res.status(200).json({
      success: true,
      message: "Book added to wishlist successfully!",
      data: { livre },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const removeLivreSouhaits = async (req, res) => {
  try {
    const clientID = req.client._id;
    const bookID = req.params.id;

    // Check if the book exists
    const livre = await Livre.findById(bookID);
    if (!livre) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
        data: null,
      });
    }

    // Find the client and update their wishlist
    const client = await Client.findById(clientID);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found!",
        data: null,
      });
    }

    // Check if the book is in the wishlist
    const bookIndex = client.wishlist.indexOf(bookID);
    if (bookIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Book not in wishlist!",
        data: null,
      });
    }

    // Remove book from client's wishlist
    client.wishlist.splice(bookIndex, 1);
    await client.save();

    return res.status(200).json({
      success: true,
      message: "Book removed from wishlist successfully!",
      data: { livre },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
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
  addLivreSouhaits,
  getLivresSouhaits,
  getLiverById,
  updateLivre,
  deleteLivre,
  removeLivreSouhaits,
};
