import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import BuyerSignup from "./pages/BuyerSignup";
import SellerSignup from "./pages/SellerSignup";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/buyer" element={<BuyerSignup />} />
        <Route path="/signup/seller" element={<SellerSignup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
