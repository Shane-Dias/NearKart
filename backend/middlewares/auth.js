import jwt from "jsonwebtoken";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);  // { userId, role }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ msg: "Invalid token" });
  }
};

export const authorizeBuyer = async (req, res, next) => {
  if (!req.user || req.user.role !== "Buyer") {
    return res.status(403).json({ msg: "Access denied: Not a buyer" });
  }

  const buyer = await Buyer.findById(req.user.userId);
  if (!buyer) return res.status(404).json({ msg: "Buyer not found" });

  req.buyer = buyer;
  next();
};

export const authorizeSeller = async (req, res, next) => {
  if (!req.user || req.user.role !== "Seller") {
    return res.status(403).json({ msg: "Access denied: Not a seller" });
  }

  const seller = await Seller.findById(req.user.userId);
  if (!seller) return res.status(404).json({ msg: "Seller not found" });

  req.seller = seller;
  next();
};

export const authorizeAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ msg: "Access denied: Not an admin" });
  }

  const admin = await Buyer.findById(req.user.userId);
  if (!admin || admin.role !== "Admin") {
    return res.status(403).json({ msg: "Admin user not found or invalid" });
  }

  req.admin = admin;
  next();
};
