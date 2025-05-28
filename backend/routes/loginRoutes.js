import { sendLoginOtp } from "../controllers/loginController.js";
import express from "express";

const router = express.Router();

router.post("/login", sendLoginOtp);

export default router;
