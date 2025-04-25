const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates.js");

const { transporter, sender } = require("./mail.config.js");

const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending Reset Success Email: ${error.message}`);
  }
};

module.exports = {
  sendResetPasswordEmail,
  sendResetSuccessEmail,
};
