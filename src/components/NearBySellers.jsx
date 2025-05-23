import React, { useState } from "react";
import {
  FaStore,
  FaStar,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";

const SellersNearYou = () => {
  const [favorites, setFavorites] = useState(new Set());

  // Enhanced dummy data with more realistic information
  const nearbySellers = [
    {
      id: 1,
      name: "FreshMart Groceries",
      rating: 4.5,
      totalRatings: 245,
      deliveryRadius: "2 km",
      deliveryTime: "15-30 min",
      logo: "🥬", // Using emoji as placeholder
      category: "Groceries & Fresh Produce",
      specialties: ["Organic Vegetables", "Fresh Fruits", "Dairy"],
      isOpen: true,
      backgroundColor: "bg-green-50",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      name: "TechGadgets Pro",
      rating: 4.2,
      totalRatings: 189,
      deliveryRadius: "5 km",
      deliveryTime: "1-2 hours",
      logo: "📱",
      category: "Electronics & Accessories",
      specialties: ["Mobile Phones", "Laptops", "Accessories"],
      isOpen: true,
      backgroundColor: "bg-blue-50",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      name: "FashionHub Boutique",
      rating: 4.7,
      totalRatings: 312,
      deliveryRadius: "3 km",
      deliveryTime: "2-4 hours",
      logo: "👗",
      category: "Fashion & Lifestyle",
      specialties: ["Women's Wear", "Accessories", "Jewelry"],
      isOpen: false,
      backgroundColor: "bg-purple-50",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    {
      id: 4,
      name: "BookWorm Corner",
      rating: 4.6,
      totalRatings: 156,
      deliveryRadius: "4 km",
      deliveryTime: "3-5 hours",
      logo: "📚",
      category: "Books & Stationery",
      specialties: ["Fiction", "Educational", "Art Supplies"],
      isOpen: true,
      backgroundColor: "bg-amber-50",
      badgeColor: "bg-amber-100 text-amber-700",
    },
    {
      id: 5,
      name: "Home & Garden Plus",
      rating: 4.3,
      totalRatings: 203,
      deliveryRadius: "6 km",
      deliveryTime: "4-6 hours",
      logo: "🏡",
      category: "Home & Garden",
      specialties: ["Furniture", "Plants", "Decor"],
      isOpen: true,
      backgroundColor: "bg-emerald-50",
      badgeColor: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 6,
      name: "Sweet Treats Bakery",
      rating: 4.8,
      totalRatings: 421,
      deliveryRadius: "1.5 km",
      deliveryTime: "20-40 min",
      logo: "🧁",
      category: "Bakery & Desserts",
      specialties: ["Custom Cakes", "Pastries", "Cookies"],
      isOpen: true,
      backgroundColor: "bg-pink-50",
      badgeColor: "bg-pink-100 text-pink-700",
    },
  ];

  const toggleFavorite = (sellerId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(sellerId)) {
      newFavorites.delete(sellerId);
    } else {
      newFavorites.add(sellerId);
    }
    setFavorites(newFavorites);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-200" />);
    }
    return stars;
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaMapMarkerAlt />
            <span>Local Businesses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Discover Sellers Near You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Support your local community by shopping from trusted businesses in
            your neighborhood
          </p>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {nearbySellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Card Header */}
              <div className={`${seller.backgroundColor} p-6 relative`}>
                <button
                  onClick={() => toggleFavorite(seller.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <FaHeart
                    className={`${
                      favorites.has(seller.id)
                        ? "text-red-500"
                        : "text-gray-400"
                    } transition-colors duration-200`}
                  />
                </button>

                <div className="flex items-center space-x-4">
                  <div className="text-4xl bg-white rounded-xl p-3 shadow-sm">
                    {seller.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                      {seller.name}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${seller.badgeColor}`}
                    >
                      {seller.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderStars(seller.rating)}
                    </div>
                    <span className="font-semibold text-gray-800">
                      {seller.rating}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({seller.totalRatings} reviews)
                    </span>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      seller.isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {seller.isOpen ? "Open" : "Closed"}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <FaMotorcycle className="text-blue-500" />
                    <span>{seller.deliveryRadius} radius</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🕐</span>
                    <span>{seller.deliveryTime}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {seller.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                  <FaStore />
                  <span>Visit Store</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700 py-4 px-8 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 mx-auto shadow-sm hover:shadow-md">
            <span>Explore All Local Businesses</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellersNearYou;
