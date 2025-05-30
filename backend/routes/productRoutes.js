import express from "express";
import { authenticateUser, authorizeSeller } from "../middlewares/auth.js";
import { addNewProduct } from "../controllers/productController.js";
import { uploadProductImages } from "../middlewares/uploadProduct.js";

const router = express.Router();

router
  .route("/addNewProduct/:id")
  .post(authenticateUser, authorizeSeller, uploadProductImages, addNewProduct);

export default router;
