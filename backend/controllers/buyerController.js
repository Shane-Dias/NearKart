import Buyer from "../models/buyer.js";
import { transporter } from "../config/mail.js";

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
  console.log(otp);

  // Send OTP email
  try {
    await transporter.sendMail({
      from: `"NearKart" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your OTP for NearKart Signup",
      html: `<h3>Welcome to NearKart!</h3><p>Your OTP is: <strong>${otp}</strong></p>`,
    });

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
    console.log(otpStore);
    res.status(200).json({ msg: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send OTP", error: err.message });
  }
};

export const verifyBuyerOtp = async (req, res) => {
  const { email, otp } = req.body;

  const entry = otpStore.get(email);
  console.log(entry);
  if (!entry)
    return res.status(400).json({ msg: "No OTP found. Please signup again." });

  if (Date.now() > entry.expires) {
    otpStore.delete(email);
    return res.status(400).json({ msg: "OTP expired" });
  }

  if (entry.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

  const buyer = new Buyer(entry.data);
  await buyer.save();

  otpStore.delete(email);
  res.status(201).json({ msg: "Signup successful", buyer });
};
