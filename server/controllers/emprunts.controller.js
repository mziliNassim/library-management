const Emprunt = require("../models/Emprunt");
const Livre = require("../models/Livre");

const createEmprunt = async (req, res) => {
  try {
    const livre = await Livre.findById(req.body.livreId); // req.body = { livreId }
    if (!livre || !livre.checkDisponibilite()) {
      return res.status(400).json({ error: "Book not available" });
    }

    const emprunt = new Emprunt({
      ...req.body,
      clientId: req.client._id,
      dateRetourPrevu: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    });

    await emprunt.save();
    livre.quantite--;
    await livre.save();

    res.status(201).json(emprunt);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const getEmpruntById = async (req, res) => {
  console.log("getEmpruntById ~ req:", req);
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    // .populate("clientId")
    // .populate("livreId");

    if (!emprunt) return res.status(404).json({ message: "Emprunt not found" });

    if (
      req.client._id.toString() !== emprunt.clientId._id.toString() &&
      req.client.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(emprunt);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const updateEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!emprunt) return res.status(404).json({ message: "Emprunt not found" });

    res.status(200).json({ emprunt, message: "Emprunt updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const deleteEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndDelete(req.params.id);

    if (!emprunt) return res.status(404).json({ message: "Emprunt not found" });

    // Increase book quantity when emprunt is deleted
    const livre = await Livre.findById(emprunt.livreId);
    if (livre) {
      livre.quantite++;
      await livre.save();
    }

    res.status(200).json({ message: "Emprunt deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const getAllEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find({});
    // .populate("clientId")
    // .populate("livreId");

    if (emprunts.length === 0)
      return res.status(404).json({ message: "No emprunts found" });

    res.status(200).json(emprunts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const getEmpruntsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Ensure the client is accessing their own emprunts or is an admin
    // if (req.client._id.toString() !== clientId && !req.admin) {
    //   return res.status(403).json({ message: "Unauthorized access" });
    // }

    if (req.client._id.toString() !== clientId && req.client.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const emprunts = await Emprunt.find({ clientId });
    // .populate("clientId")
    // .populate("livreId");

    if (emprunts.length === 0) {
      return res
        .status(404)
        .json({ message: "No emprunts found for this client" });
    }

    res.status(200).json(emprunts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};

const returnEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);

    if (!emprunt) return res.status(404).json({ message: "Emprunt not found" });

    if (
      req.client._id.toString() !== emprunt.clientId.toString() &&
      req.client.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    emprunt.dateRetourEffectif = new Date();
    emprunt.statut = "retourné";
    await emprunt.save();

    // Increase book quantity when returned
    const livre = await Livre.findById(emprunt.livreId);
    if (livre) {
      livre.quantite++;
      await livre.save();
    }

    res.status(200).json({ message: "Book returned successfully!", emprunt });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
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
