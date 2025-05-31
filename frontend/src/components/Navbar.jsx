import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import AccountTypeModal from "./AccountTypeModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // Sample categories with icons
  const categories = [
    "Grocery & Food",
    "Electronics & Gadgets",
    "Clothing & Fashion",
    "Home & Kitchen",
    "Health & Beauty",
    "Books & Stationery",
    "Sports & Fitness",
    "Toys & Games",
    "Jewelry & Accessories",
    "Automotive",
    "Hardware & Tools",
    "Pet Supplies",
    "Art & Crafts",
    "Others",
  ];

  // Responsive category display
  const getVisibleCategories = () => {
    // On mobile: show first 3 categories
    // On tablet: show first 4 categories
    // On desktop: show first 6 categories
    return {
      mobile: categories.slice(0, 3),
      tablet: categories.slice(0, 4),
      desktop: categories.slice(0, 6),
    };
  };

  const getDropdownCategories = () => {
    return {
      mobile: categories.slice(3),
      tablet: categories.slice(4),
      desktop: categories.slice(6),
    };
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/user/logout", {
        method: "POST",
        credentials: "include", // this is needed to send the cookie
      });

      setUser(null);
      navigate("/login");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg border-b border-blue-100">
      {/* Main Navbar */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={() => {
                  navigate("/");
                  window.scrollTo(0, 0);
                }}
                className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200"
              >
                <div className="flex items-center space-x-2">
                  {/* Dummy Logo */}
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">N</span>
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    NearKart
                  </h1>
                </div>
              </button>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  className="w-full pl-4 pr-12 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700 placeholder-gray-500 shadow-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-200">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-600"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    Account
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {user ? (
                      <>
                        <button
                          onClick={() => {
                            if (user?.role === "Seller") {
                              navigate(`/seller/${user.userId}`);
                              window.scrollTo(0, 0);
                            } else {
                              navigate(`/profile/${user?.userId}`);
                              window.scrollTo(0, 0);
                            }
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                        >
                          {user?.role === "Seller" ? "Dashboard" : "My Profile"}
                        </button>
                        <button
                          onClick={() => {
                            logout();
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <div>
                        <button
                          onClick={() => {
                            navigate("/login");
                            window.scrollTo(0, 0);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                        >
                          Sign In
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                          onClick={() => setShowAccountTypeModal(true)}
                        >
                          Create Account
                        </button>
                      </div>
                    )}
                    {user && user.role === "Buyer" && (
                      <div>
                        <hr className="my-2" />
                        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left">
                          Your Orders
                        </button>
                        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left">
                          Wishlist
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Shopping Cart */}
              {user && user.role === "Buyer" && (
                <button
                  onClick={() => {
                    navigate(`/cart/${user.userId}`);
                    window.scrollTo(0, 0);
                  }}
                  className="relative flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-600"
                >
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    Cart
                  </span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-blue-200 transition-colors duration-200 p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700 placeholder-gray-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar - Responsive */}
      <div className="bg-blue-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Categories Container with horizontal scroll on mobile */}
            <div className="flex items-center space-x-1 flex-1 overflow-x-auto scrollbar-hide">
              {/* Mobile: Show first 3 categories + More */}
              <div className="sm:hidden flex items-center space-x-1 min-w-max">
                {getVisibleCategories().mobile.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const encoded = encodeURIComponent(category);
                      navigate(`/category/${encoded}`);
                      window.scrollTo(0, 0);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="flex-shrink-0 px-3 py-2 text-xs font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    {category}
                  </button>
                ))}
                {getDropdownCategories().mobile.length > 0 && (
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() =>
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                      }
                      className="flex items-center space-x-1 px-3 py-2 text-xs font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200 whitespace-nowrap"
                    >
                      <span>More</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Tablet: Show first 4 categories + More */}
              <div className="hidden sm:flex lg:hidden items-center space-x-1 min-w-max">
                {getVisibleCategories().tablet.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const encoded = encodeURIComponent(category);
                      navigate(`/category/${encoded}`);
                      window.scrollTo(0, 0);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="flex-shrink-0 px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    {category}
                  </button>
                ))}
                {getDropdownCategories().tablet.length > 0 && (
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() =>
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                      }
                      className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200 whitespace-nowrap"
                    >
                      <span>More</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop: Show first 6 categories + More */}
              <div className="hidden lg:flex items-center space-x-1 min-w-max">
                {getVisibleCategories().desktop.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const encoded = encodeURIComponent(category);
                      navigate(`/category/${encoded}`);
                      window.scrollTo(0, 0);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="flex-shrink-0 px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    {category}
                  </button>
                ))}
                {getDropdownCategories().desktop.length > 0 && (
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() =>
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                      }
                      className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all duration-200 whitespace-nowrap"
                    >
                      <span>More</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Categories Dropdown Menu - Positioned absolutely */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-4 right-4 sm:left-auto sm:right-auto sm:w-48 mt-1 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200 max-h-64 overflow-y-auto">
                {/* Mobile dropdown categories */}
                <div className="sm:hidden">
                  {getDropdownCategories().mobile.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const encoded = encodeURIComponent(category);
                        navigate(`/category/${encoded}`);
                        window.scrollTo(0, 0);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {/* Tablet dropdown categories */}
                <div className="hidden sm:block lg:hidden">
                  {getDropdownCategories().tablet.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const encoded = encodeURIComponent(category);
                        navigate(`/category/${encoded}`);
                        window.scrollTo(0, 0);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {/* Desktop dropdown categories */}
                <div className="hidden lg:block">
                  {getDropdownCategories().desktop.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const encoded = encodeURIComponent(category);
                        navigate(`/category/${encoded}`);
                        window.scrollTo(0, 0);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Categories
              </h3>
              {categories.map((category, index) => (
                <button
                  onClick={() => {
                    const encoded = encodeURIComponent(category);
                    navigate(`/category/${encoded}`);
                    window.scrollTo(0, 0);
                    setIsCategoryDropdownOpen(false);
                  }}
                  key={index}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for dropdowns */}
      {(isUserMenuOpen || isMenuOpen || isCategoryDropdownOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMenuOpen(false);
            setIsCategoryDropdownOpen(false);
          }}
        />
      )}

      {/* Floating Account Type Selector */}
      {showAccountTypeModal && (
        <AccountTypeModal onClose={() => setShowAccountTypeModal(false)} />
      )}
    </div>
  );
};

export default Navbar;
