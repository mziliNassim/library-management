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

// Hash the password before saving only if it's modified
clientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Validate password only when it's being modified
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      throw new Error(
        "Invalid password! Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
      );
    }
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare passwords
clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Match passwords
clientSchema.methods.matchPassword = async function (
  password,
  confirmPassword
) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match!");
  }
  // Validate password format
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Invalid password! Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
    );
  }
  return true;
};

// Email validation
clientSchema.path("email").validate(function (email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}, "Invalid email format!");

// Name validation
clientSchema.path("nom").validate(function (nom) {
  const nomRegex = /^[a-zA-Z]{4,}$/;
  return nomRegex.test(nom);
}, "Name must be at least 4 characters long and contain only letters!");

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
