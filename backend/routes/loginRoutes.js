import {
  sendLoginOtp,
  verifyLoginOtpAndLogin,
} from "../controllers/loginController.js";
import { authenticateUser } from "../middlewares/auth.js";
import express from "express";

const router = express.Router();

router.post("/login", sendLoginOtp);
router.post("/verify-otp", verifyLoginOtpAndLogin);

router.get("/me", authenticateUser, (req, res) => {
  const user = req.user; // added by auth middleware
  res.status(200).json({ user });
});

export default router;
