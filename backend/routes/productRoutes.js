import express from "express";
import { authenticateUser, authorizeSeller } from "../middlewares/auth.js";
import {
  addNewProduct,
  retriveSellerProducts,
} from "../controllers/productController.js";
import { uploadProductImages } from "../middlewares/uploadProduct.js";

const router = express.Router();

router.post(
  "/addNewProduct/:id",
  authenticateUser,
  authorizeSeller,
  uploadProductImages,
  addNewProduct
);

router.get("/inventory/:id", retriveSellerProducts);

export default router;
