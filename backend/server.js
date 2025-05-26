import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
