import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    shopCategory: {
      type: String,
      enum: [
        "Grocery & Food",
        "Electronics & Gadgets",
        "Clothing & Fashion",
        "Home & Kitchen",
        "Health & Beauty",
        "Books & Stationery",
        "Sports & Fitness",
        "Toys & Games",
        "Jewelry & Accessories",
        "Automotive",
        "Hardware & Tools",
        "Pet Supplies",
        "Art & Crafts",
        "Others",
      ],
      required: true,
    },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    businessAddress: { type: String, required: true },
    shopLogo: { type: String, default: "" },
    governmentId: { type: String, default: "" },
    role: { type: String, default: "Seller" },
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model("Seller", SellerSchema);
export default Seller;
