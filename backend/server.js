import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import buyerRoutes from "./routes/buyerRoutes.js ";
import sellerRoutes from "./routes/sellerRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/buyer", buyerRoutes);
app.use("/api/seller", sellerRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
