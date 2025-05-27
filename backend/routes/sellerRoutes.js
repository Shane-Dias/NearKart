import express from "express";
import upload from "../middlewares/upload.js";
import {
  signupSeller,
  verifySellerOtp,
} from "../controllers/sellerController.js";

const router = express.Router();

router.post(
  "/signup",
  upload.fields([
    { name: "shopLogo", maxCount: 1 },
    { name: "governmentId", maxCount: 1 },
  ]),
  signupSeller
);

router.post("/verify-otp", verifySellerOtp);

export default router;
