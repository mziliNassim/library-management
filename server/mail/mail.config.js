// mail.config.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter using Mailtrap SMTP credentials
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mzilinassim@gmail.com", // Your email
    pass: "lqck bjlp onng tjmt", // Your email password (or app-specific password)
  },
});

// Default sender configuration
const sender = {
  email: "libriTech@gmail.com",
  name: "LibriTech",
};

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = {
  sender,
  transporter,
};
