import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    phoneNo: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String },
    role: { type: String, default: "Buyer" },
  },
  {
    timestamps: true,
  }
);

const Buyer = mongoose.model("Buyer", BuyerSchema);
export default Buyer;
