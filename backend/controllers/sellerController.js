import { transporter } from "../config/mail.js";
import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";

const otpStore = new Map();

export const signupSeller = async (req, res) => {
  const {
    shopName,
    ownerName,
    email,
    phoneNo,
    gender,
    city,
    pincode,
    businessAddress,
    shopCategory,
  } = req.body;

  const existing = await Seller.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  console.log("Otp for seller:", otp);

  try {
    // await transporter.sendMail({
    //   from: `"NearKart" <${process.env.MAIL_USER}>`,
    //   to: email,
    //   subject: "Your OTP for NearKart Signup",
    //   html: `<h3>OTP: ${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
    // });

    otpStore.set(email, {
      otp,
      data: {
        shopName,
        ownerName,
        email,
        phoneNo,
        gender,
        city,
        pincode,
        businessAddress,
        shopCategory,
      },
      files: {
        shopLogo: req.files?.shopLogo?.[0]?.path || "",
        governmentId: req.files?.governmentId?.[0]?.path || "",
      },
      expires: Date.now() + 5 * 60 * 1000,
    });

    console.log("Stored data:", otpStore);

    res.status(200).json({ msg: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send OTP", error: err.message });
  }
};

export const verifySellerOtp = async (req, res) => {
  const { email, otp } = req.body;
  const entry = otpStore.get(email);

  if (!entry || Date.now() > entry.expires)
    return res.status(400).json({ msg: "OTP expired or not found" });

  if (entry.otp !== otp) return res.status(400).json({ msg: "Incorrect OTP" });

  try {
    const newSeller = new Seller({
      ...entry.data,
      shopLogo: entry.files.shopLogo,
      governmentId: entry.files.governmentId,
    });

    await newSeller.save();
    otpStore.delete(email);

    const user = await Seller.findOne({ email });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod (HTTPS)
      sameSite: "Lax", // or "None" if frontend & backend are on different domains with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      msg: "Seller registered successfully and LoggedIn",
      role: user.role,
      user: {
        id: user._id,
        name: user.ownerName,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};
