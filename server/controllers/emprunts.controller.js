const Emprunt = require("../models/Emprunt");
const Livre = require("../models/Livre");
const Client = require("../models/Client");

const createEmprunt = async (req, res) => {
  try {
    const livre = await Livre.findById(req.body.livreId);
    if (!livre || !livre.checkDisponibilite()) {
      return res.status(400).send({ error: "Book not available" });
    }

    const emprunt = new Emprunt({
      ...req.body,
      clientId: req.client._id,
      dateRetourPrevu: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    });

    await emprunt.save();
    livre.quantite--;
    await livre.save();

    res.status(201).send(emprunt);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getEmpruntById = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id)
      .populate("clientId")
      .populate("livreId");

    if (!emprunt) return res.status(404).send({ message: "Emprunt not found" });

    // Ensure the client is accessing their own emprunt or is an admin
    if (
      req.client._id.toString() !== emprunt.clientId._id.toString() &&
      !req.admin
    ) {
      return res.status(403).send({ error: "Unauthorized access" });
    }

    res.status(200).send(emprunt);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!emprunt) return res.status(404).send({ message: "Emprunt not found" });

    res.status(200).send({ emprunt, message: "Emprunt updated successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndDelete(req.params.id);

    if (!emprunt) return res.status(404).send({ message: "Emprunt not found" });

    // Increase book quantity when emprunt is deleted
    const livre = await Livre.findById(emprunt.livreId);
    if (livre) {
      livre.quantite++;
      await livre.save();
    }

    res.status(200).send({ message: "Emprunt deleted successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find({})
      .populate("clientId")
      .populate("livreId");

    if (emprunts.length === 0)
      return res.status(404).send({ message: "No emprunts found" });

    res.status(200).send(emprunts);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getEmpruntsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Ensure the client is accessing their own emprunts or is an admin
    if (req.client._id.toString() !== clientId && !req.admin) {
      return res.status(403).send({ error: "Unauthorized access" });
    }

    const emprunts = await Emprunt.find({ clientId })
      .populate("clientId")
      .populate("livreId");

    if (emprunts.length === 0) {
      return res
        .status(404)
        .send({ message: "No emprunts found for this client" });
    }

    res.status(200).send(emprunts);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const returnEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);

    if (!emprunt) {
      return res.status(404).send({ message: "Emprunt not found" });
    }

    // Ensure the client is returning their own emprunt or is an admin
    if (
      req.client._id.toString() !== emprunt.clientId.toString() &&
      !req.admin
    ) {
      return res.status(403).send({ error: "Unauthorized access" });
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

    res.status(200).send({ emprunt, message: "Book returned successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
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
