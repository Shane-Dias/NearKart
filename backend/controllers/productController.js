import Product from "../models/Product.js";

export const addNewProduct = async (req, res) => {
  try {
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
      specifications,
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
      specifications,
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

export const retriveSellerProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Product.find({ sellerId: id }).select(
      "name description originalPrice discount sellingPrice stock lowThresholdCount images specifications category brand deliveryCharges returnPolicy"
    );
    res.status(200).json({ msg: "Success", products });
  } catch (error) {
    console.log("Some error occured:", error);
    res.status(500).json({ msg: "Error" });
  }
};
