import React from "react";
import Hero from "../components/Hero";
import NearBySellers from "../components/NearBySellers";
import CategoryGrid from "../components/CategoryGrid";
import TrendingProducts from "../components/TrendingProducts";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrendingProducts />
      <CategoryGrid />
      <NearBySellers />
    </div>
  );
};

export default Home;
