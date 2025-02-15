const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adresse: { type: String, required: true },
  active: { type: Boolean, default: true },
  role: { type: String, default: "client", enum: ["client", "admin"] },
});

// Hash the password before saving the client
clientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// compare passwords
clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
