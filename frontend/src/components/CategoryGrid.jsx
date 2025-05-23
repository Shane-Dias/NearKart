import React from "react";
import {
  ShoppingCart,
  Shirt,
  Pill,
  Laptop,
  BookOpen,
  Home,
  Car,
  Gamepad2,
} from "lucide-react";

const categories = [
  {
    name: "Groceries",
    icon: <ShoppingCart className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "15,234 products",
  },
  {
    name: "Fashion",
    icon: <Shirt className="w-8 h-8" />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "8,567 products",
  },
  {
    name: "Health",
    icon: <Pill className="w-8 h-8" />,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "3,421 products",
  },
  {
    name: "Electronics",
    icon: <Laptop className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "12,890 products",
  },
  {
    name: "Books",
    icon: <BookOpen className="w-8 h-8" />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "5,678 products",
  },
  {
    name: "Home & Garden",
    icon: <Home className="w-8 h-8" />,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "9,234 products",
  },
  {
    name: "Automotive",
    icon: <Car className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "2,156 products",
  },
  {
    name: "Gaming",
    icon: <Gamepad2 className="w-8 h-8" />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    products: "4,567 products",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover everything you need across our most popular categories
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 ${category.hoverBg} hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
            >
              {/* Icon Container */}
              <div
                className={`${category.bgColor} rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={category.color}>{category.icon}</div>
              </div>

              {/* Category Name */}
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 text-center mb-2">
                {category.name}
              </h3>

              {/* Product Count */}
              <p className="text-xs lg:text-sm text-gray-500 text-center">
                {category.products}
              </p>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 lg:mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            View All Categories
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
