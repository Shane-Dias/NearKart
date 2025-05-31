import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    lowThresholdCount: { type: Number, default: 5 },
    images: {
      type: [String],
      validate: [
        (val) => val.length >= 1 && val.length <= 5,
        "Product must have between 1 and 5 images",
      ],
      required: true,
    },
    specifications: {
      type: [String],
    },

    category: {
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

    brand: { type: String },
    deliveryCharges: { type: Number, required: true },
    returnPolicy: {
      type: String,
      enum: [
        "7-day returns",
        "14-day returns",
        "30-day returns",
        "No returns",
        "Exchange only",
        "Warranty replacement only",
      ],
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//No need for this frontend is managing the selling price
// ProductSchema.pre("save", function (next) {
//   this.sellingPrice =
//     this.originalPrice - (this.originalPrice * this.discount) / 100;
//   next();
// });

const Product = mongoose.model("Product", ProductSchema);
export default Product;
