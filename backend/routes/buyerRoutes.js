import express from "express";
import {
  verifyBuyerOtp,
  signupBuyer,
} from "../controllers/buyerController.js";

const router = express.Router();

router.post("/signup", signupBuyer);
router.post("/verify-otp", verifyBuyerOtp);

export default router;
