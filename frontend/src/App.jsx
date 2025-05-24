import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import BuyerSignup from "./pages/BuyerSignup";
import SellerSignup from "./pages/SellerSignup";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import BuyerProfile from "./pages/BuyerProfile";
import Cart from "./pages/Cart";
import SellerDashboard from "./pages/SellerDashboard";
import AddProductForm from "./pages/AddProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/buyer" element={<BuyerSignup />} />
        <Route path="/signup/seller" element={<SellerSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:product" element={<ProductDetails />} />
        <Route path="/profile/:id" element={<BuyerProfile />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/seller/:id" element={<SellerDashboard />} />
        <Route path="/seller/:id/newProduct" element={<AddProductForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
