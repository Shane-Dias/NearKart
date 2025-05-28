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
    // await transporter.sendMail({
    //   from: `"NearKart" <${process.env.MAIL_USER}>`,
    //   to: email,
    //   subject: "Welcome Back! Your OTP for NearKart Login",
    //   html: `<h3>OTP: ${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
    // });
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });
    console.log("Stored data:", otpStore);

    res.status(200).json({ msg: "OTP sent to email" });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyLoginOtpAndLogin = async (req, res) => {
  const { email, otp } = req.body;

  const storedData = otpStore.get(email);

  if (storedData.otp !== otp || Date.now() > storedData.expires) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  otpStore.delete(email);

  // Check user type (Buyer or Seller)
  let user = await Buyer.findOne({ email });
  let role = "buyer";

  if (!user) {
    user = await Seller.findOne({ email });
    role = "seller";
  }

  // Generate JWT
  const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod (HTTPS)
    sameSite: "Lax", // or "None" if frontend & backend are on different domains with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message: "Login successful",
    role,
    user: {
      id: user._id,
      name:
        role === "buyer"
          ? `${user.firstname} ${user.lastname}`
          : user.ownerName,
      email: user.email,
    },
  });
};
