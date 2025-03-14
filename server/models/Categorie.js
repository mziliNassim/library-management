const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

// Check if the category name is already used
categorieSchema.statics.validName = async function (nom) {
  const existingCategory = await this.findOne({ nom });
  return existingCategory;
};

const Categorie = mongoose.model("Categorie", categorieSchema);
module.exports = Categorie;
