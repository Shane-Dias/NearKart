import Product from "../models/Product.js";

export const addNewProduct = async (req, res) => {
  try {
    // 1. Check if files were uploaded
    console.log(req.files);
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "At least 1 image is required" });
    }

    const {
      name,
      description,
      originalPrice,
      discount,
      sellingPrice,
      stock,
      lowThresholdCount,
      category,
      brand,
      deliveryCharges,
      returnPolicy,
    } = req.body;
    const sellerId = req.params.id;
    const images = req.files.map((file) => file.path);

    const newProduct = new Product({
      name,
      description,
      originalPrice,
      discount,
      sellingPrice,
      stock,
      lowThresholdCount,
      category,
      brand,
      deliveryCharges,
      returnPolicy,
      sellerId,
      images,
    });

    await newProduct.save();

    res.status(201).json({
      msg: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);

    res.status(500).json({
      msg: "Server error while adding product",
      error: error.message,
    });
  }
};
