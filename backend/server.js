import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import buyerRoutes from "./routes/buyerRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();

app.use("/api/buyer", buyerRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/user", loginRoutes);
app.use("/api/product", productRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
