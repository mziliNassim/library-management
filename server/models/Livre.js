const mongoose = require("mongoose");

const livreSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  anneePublication: { type: Number, required: true },
  editeur: { type: String, required: true },
  langue: { type: String, required: true },
  description: { type: String },
  quantite: { type: Number, required: true, default: 0 },
  categorieId: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
});

livreSchema.methods.checkDisponibilite = function () {
  return this.quantite > 0;
};

const Livre = mongoose.model("Livre", livreSchema);
module.exports = Livre;
