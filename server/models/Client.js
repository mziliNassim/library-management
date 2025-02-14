const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adresse: { type: String, required: true },
  active: { type: Boolean, default: true },
});

clientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

clientSchema.methods.login = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
