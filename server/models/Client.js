const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adresse: { type: String, required: false, default: "" },
  active: { type: Boolean, default: true },
  role: { type: String, default: "client", enum: ["client", "admin"] },
  wishlist: { type: Array, default: [] },
  socials: {
    linkedin: { type: String, required: false, default: "" },
    website: { type: String, required: false, default: "" },
    github: { type: String, required: false, default: "" },
    bio: { type: String, required: false, default: "" },
  },
  profilePic: { type: String, required: false, default: "" },
});

// Name validation
clientSchema.methods.validName = async function (name) {
  const nomRegex = /^[a-zA-Z\s]{4,}$/;
  if (nomRegex.test(name)) return true;
  else
    throw new Error(
      "Name must be at least 4 characters long and contain only letters and spaces!"
    );
};

// Email validation
clientSchema.methods.validEmail = async function (email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (emailRegex.test(email)) return true;
  else throw new Error("Invalid email format!");
};

// Email exist
clientSchema.statics.emailExists = async function (email) {
  return await this.findOne({ email });
};

// Match passwords
clientSchema.methods.matchPassword = async function (
  password,
  confirmPassword
) {
  if (password !== confirmPassword) throw new Error("Passwords do not match!");

  // Validate password format
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
    );
  }
  return true;
};

// Hash the password before saving only if it's modified
clientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
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

// Compare password to db password
clientSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
