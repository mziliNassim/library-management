const mongoose = require("mongoose");

const empruntSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  livreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livre",
    required: true,
  },
  dateEmprunt: { type: Date, default: Date.now },
  dateRetourPrevu: { type: Date, required: true },
  dateRetourEffectif: { type: Date },
  statut: {
    type: String,
    enum: ["en cours", "retourné", "en retard"],
    default: "en cours",
  },
});

const Emprunt = mongoose.model("Emprunt", empruntSchema);
module.exports = Emprunt;
