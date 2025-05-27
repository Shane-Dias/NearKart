import { transporter } from "../config/mail.js";
import Seller from "../models/Seller.js";

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
  console.log("1");

  if (entry.otp !== otp) return res.status(400).json({ msg: "Incorrect OTP" });
  console.log("2");

  try {
    const newSeller = new Seller({
      ...entry.data,
      shopLogo: entry.files.shopLogo,
      governmentId: entry.files.governmentId,
    });

    await newSeller.save();
    otpStore.delete(email);

    res.status(201).json({ msg: "Seller registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};
