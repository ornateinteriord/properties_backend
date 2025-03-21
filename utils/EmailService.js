const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (email , subject , description) => {
  try {
    const mailOptions = {
      from: `"SK Properties" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: description,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendMail };
