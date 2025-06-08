import express from "express";
import {
  verifyBuyerOtp,
  signupBuyer,
  buyerProfile,
  updateBuyerProfile,
} from "../controllers/buyerController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signupBuyer);
router.post("/verify-otp", verifyBuyerOtp);
router.get("/:id", authenticateUser, buyerProfile);
router.put("/:id", authenticateUser, updateBuyerProfile);

export default router;
