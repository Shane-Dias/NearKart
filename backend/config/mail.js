import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Loads environment variables

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


