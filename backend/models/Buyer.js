import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: ture },
    lastname: { type: String },
    email: { type: String, required: ture, unique: ture },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    phoneNo: { type: String, required: ture },
    city: { type: String, required: ture },
    pincode: { type: String, required: ture },
    address: { type: String },
    role: { type: String, default: "Buyer" },
  },
  {
    timestamps: ture,
  }
);

const Buyer = mongoose.model("Buyer", BuyerSchema);
export default Buyer;
