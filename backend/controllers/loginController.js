import { transporter } from "../config/mail.js";
import jwt from "jsonwebtoken";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";

const otpStore = new Map();

export const sendLoginOtp = async (req, res) => {
  const { email } = req.body;
  const BuyerUser = await Buyer.findOne({ email });
  const SellerUser = await Seller.findOne({ email });
  if (!BuyerUser && !SellerUser) {
    return res.status(400).json({ message: "Please Signup First" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  console.log("Otp for login:", otp);
  try {
    await transporter.sendMail({
      from: `"NearKart" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Welcome Back! Your OTP for NearKart Login",
      html: `<h3>OTP: ${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
    });
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });
    console.log("Stored data:", otpStore);

    res.status(200).json({ msg: "OTP sent to email" });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
