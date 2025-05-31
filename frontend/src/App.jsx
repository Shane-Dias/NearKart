import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import InventoryManagement from "./pages/InventoryManagement";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Buyer Specific Routes */}
        {!user && (
          <>
            <Route path="/signup/buyer" element={<BuyerSignup />} />
            <Route path="/signup/seller" element={<SellerSignup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}

        {/* Public Routes */}
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:product" element={<ProductDetails />} />
        {user && user.role !== "Seller" && (
          <>
            <Route path="/profile/:id" element={<BuyerProfile />} />
            <Route path="/cart/:id" element={<Cart />} />
          </>
        )}

        {/* Seller Specific Routes */}
        {user && user.role === "Seller" && (
          <>
            <Route path="/seller/:id" element={<SellerDashboard />} />
            <Route path="/seller/:id/newProduct" element={<AddProductForm />} />
            <Route
              path="/seller/:id/inventory"
              element={<InventoryManagement />}
            />
          </>
        )}

        {/* Redirect all unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
