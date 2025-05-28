import {
  sendLoginOtp,
  verifyLoginOtpAndLogin,
} from "../controllers/loginController.js";
import express from "express";

const router = express.Router();

router.post("/login", sendLoginOtp);
router.post("/verify-otp", verifyLoginOtpAndLogin);

export default router;
