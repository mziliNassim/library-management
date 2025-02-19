const Emprunt = require("../models/Emprunt");
const Livre = require("../models/Livre");
const Client = require("../models/Client");

const createEmprunt = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.livreId);
    if (!livre || !livre.checkDisponibilite()) {
      return res
        .status(400)
        .json({ success: false, message: "Book not available!", data: null });
    }

    const emprunt = new Emprunt({
      ...req.params,
      clientId: req.client._id,
      dateRetourPrevu: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    });

    await emprunt.save();
    livre.quantite--;
    await livre.save();

    res.status(201).json({
      success: true,
      message: "Emprunt created successfully!",
      data: { emprunt },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getEmpruntById = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    // .populate("clientId")
    // .populate("livreId");

    if (!emprunt)
      return res
        .status(404)
        .json({ success: false, message: "Emprunt not founds!", data: null });

    if (
      req.client._id.toString() !== emprunt.clientId._id.toString() &&
      req.client.role !== "admin"
    )
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
        data: null,
      });

    return res.status(200).json({
      success: true,
      message: "Emprunt fetched successfully!",
      data: { emprunt },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};

const updateEmprunt = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["statut", "dateRetourPrevu"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation)
      return res.status(400).json({
        success: false,
        message: "Invalid updates!",
        data: null,
      });

    // Check if the emprunt exists
    const emprunt = await Emprunt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!emprunt)
      return res
        .status(404)
        .json({ success: false, message: "Emprunt not found!", data: null });

    return res.status(200).json({
      success: true,
      message: "Emprunt updated successfully!",
      data: { emprunt },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndDelete(req.params.id);

    if (!emprunt)
      return res.status(404).json({
        success: false,
        message: "Emprunt not found!",
        data: null,
      });

    // Increase book quantity when emprunt is deleted
    const livre = await Livre.findById(emprunt.livreId);
    if (livre) {
      livre.quantite++;
      await livre.save();
    }

    return res.status(200).json({
      success: true,
      message: "Emprunt deleted successfully!",
      data: { emprunt },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find({});
    // .populate("clientId")
    // .populate("livreId");

    if (emprunts.length === 0)
      return res.status(404).json({
        success: true,
        message: "No emprunt found!",
        data: null,
      });

    return res.status(200).json({
      success: true,
      message: "All emprunts fetched successfuly!",
      data: { emprunts },
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

const getEmpruntsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // check client exist
    const client = await Client.findById(clientId);
    if (!client)
      return res.status(404).json({
        success: false,
        message: "Client not found!",
        data: null,
      });

    if (req.client._id.toString() !== clientId && req.client.role !== "admin")
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
        data: null,
      });

    const emprunts = await Emprunt.find({ clientId }); // .populate("clientId").populate("livreId");

    // check emprunts exist
    if (emprunts.length === 0)
      return res.status(404).json({
        success: false,
        message: "No emprunts found for this client!",
        data: null,
      });

    return res.status(200).json({
      success: true,
      message: `${client.nom}'s emprunts fetched successfully!`,
      data: { emprunts },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const returnEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);

    if (!emprunt)
      return res
        .status(404)
        .json({ success: false, message: "Emprunt not found!", data: null });

    if (
      req.client._id.toString() !== emprunt.clientId.toString() &&
      req.client.role !== "admin"
    )
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
        data: null,
      });

    emprunt.dateRetourEffectif = new Date();
    emprunt.statut = "retourné";
    await emprunt.save();

    // Increase book quantity when returned
    const livre = await Livre.findById(emprunt.livreId);
    if (livre) {
      livre.quantite++;
      await livre.save();
    }

    return res.status(200).json({
      success: true,
      message: "Book returned successfully!",
      data: { emprunt, livre },
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  createEmprunt,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt,
  getAllEmprunts,
  getEmpruntsByClient,
  returnEmprunt,
};
