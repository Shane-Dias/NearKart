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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
