import Buyer from "../models/Buyer.js";
import { transporter } from "../config/mail.js";
import jwt from "jsonwebtoken";

const otpStore = new Map(); // email -> { otp, data, expires }

export const signupBuyer = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneNo,
    gender,
    city,
    pincode,
    deliveryAddress,
  } = req.body;

  const existing = await Buyer.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  console.log(`OTP for ${email} is ${otp}`);

  // Send OTP email
  try {
    // await transporter.sendMail({
    //   from: `"NearKart" <${process.env.MAIL_USER}>`,
    //   to: email,
    //   subject: "Your OTP for NearKart Signup",
    //   html: `<h3>Welcome to NearKart!</h3><p>Your OTP is: <strong>${otp}</strong></p>`,
    // });

    otpStore.set(email, {
      otp,
      data: {
        firstname,
        lastname,
        email,
        phoneNo,
        gender,
        city,
        pincode,
        deliveryAddress,
      },
      expires: Date.now() + 5 * 60 * 1000, // 5 min validity
    });
    console.log(`Buyer details before verification:${otpStore}`);
    res.status(200).json({ msg: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send OTP", error: err.message });
  }
};

export const verifyBuyerOtp = async (req, res) => {
  const { email, otp } = req.body;

  const entry = otpStore.get(email);
  if (!entry)
    return res.status(400).json({ msg: "No OTP found. Please signup again." });

  if (Date.now() > entry.expires) {
    otpStore.delete(email);
    return res.status(400).json({ msg: "OTP expired" });
  }

  if (entry.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

  try {
    const buyer = new Buyer(entry.data);
    await buyer.save();

    otpStore.delete(email);
    const user = await Buyer.findOne({ email });

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
      msg: "Signup successful and logged in",
      role: user.role,
      user: {
        id: user._id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Verification error:", err);

    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

export const buyerProfile = async (req, res) => {
  const _id = req.params.id;

  try {
    const requesterId = req.user.userId; // Set from auth middleware
    const role = req.user.role;

    if (requesterId !== _id ) {
      return res.status(403).json({ msg: "Access denied" });
    }

    // 2. Fetch the buyer
    const buyer = await Buyer.findById(_id).select(
      "firstname lastname gender email phoneNo city address pincode"
    );

    if (!buyer) {
      return res.status(404).json({ msg: "No buyer found" });
    }

    res.status(200).json({ buyer });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
