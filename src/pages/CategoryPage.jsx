import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Filter,
  Grid,
  List,
  ChevronDown,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  SlidersHorizontal,
  X,
  Search,
} from "lucide-react";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  // Mock Electronics products data
  const mockElectronicsProducts = [
    {
      _id: 1,
      name: "iPhone 15 Pro Max",
      description:
        "Latest flagship smartphone with titanium design and advanced camera system",
      price: 134900,
      originalPrice: 149900,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 2847,
      brand: "Apple",
      discount: 10,
      inStock: true,
      category: "Smartphones",
    },
    {
      _id: 2,
      name: "MacBook Air M3",
      description:
        "Ultra-thin laptop with M3 chip for incredible performance and battery life",
      price: 114900,
      originalPrice: 129900,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 1923,
      brand: "Apple",
      discount: 12,
      inStock: true,
      category: "Laptops",
    },
    {
      _id: 3,
      name: "Samsung Galaxy S24 Ultra",
      description:
        "Premium Android phone with S Pen and exceptional camera capabilities",
      price: 124999,
      originalPrice: 139999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 1654,
      brand: "Samsung",
      discount: 11,
      inStock: true,
      category: "Smartphones",
    },
    {
      _id: 4,
      name: "Sony WH-1000XM5 Headphones",
      description: "Industry-leading noise canceling wireless headphones",
      price: 29990,
      originalPrice: 34990,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 3421,
      brand: "Sony",
      discount: 14,
      inStock: true,
      category: "Audio",
    },
    {
      _id: 5,
      name: "Dell XPS 13",
      description: "Premium ultrabook with stunning InfinityEdge display",
      price: 89999,
      originalPrice: 99999,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 987,
      brand: "Dell",
      discount: 10,
      inStock: true,
      category: "Laptops",
    },
    {
      _id: 6,
      name: 'iPad Pro 12.9"',
      description:
        "Ultimate iPad experience with M2 chip and Liquid Retina XDR display",
      price: 112900,
      originalPrice: 125900,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 1456,
      brand: "Apple",
      discount: 10,
      inStock: false,
      category: "Tablets",
    },
    {
      _id: 7,
      name: "Gaming Mechanical Keyboard",
      description:
        "RGB backlit mechanical keyboard for ultimate gaming experience",
      price: 8999,
      originalPrice: 12999,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 2156,
      brand: "Corsair",
      discount: 31,
      inStock: true,
      category: "Gaming",
    },
    {
      _id: 8,
      name: "4K Webcam Ultra HD",
      description: "Professional 4K webcam with auto-focus and noise reduction",
      price: 15999,
      originalPrice: 19999,
      image:
        "https://images.unsplash.com/photo-1587826080692-e5c5b8c5e4b8?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 834,
      brand: "Logitech",
      discount: 20,
      inStock: true,
      category: "Accessories",
    },
    {
      _id: 9,
      name: "Wireless Gaming Mouse",
      description: "High-precision wireless gaming mouse with customizable RGB",
      price: 6999,
      originalPrice: 8999,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 1243,
      brand: "Razer",
      discount: 22,
      inStock: true,
      category: "Gaming",
    },
    {
      _id: 10,
      name: "Smart Watch Series 9",
      description:
        "Advanced health monitoring with GPS and cellular connectivity",
      price: 41900,
      originalPrice: 45900,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 1876,
      brand: "Apple",
      discount: 9,
      inStock: true,
      category: "Wearables",
    },
    {
      _id: 11,
      name: "Portable SSD 2TB",
      description: "Ultra-fast portable SSD with USB-C connectivity",
      price: 18999,
      originalPrice: 22999,
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 654,
      brand: "Samsung",
      discount: 17,
      inStock: true,
      category: "Storage",
    },
    {
      _id: 12,
      name: "Wireless Charging Pad",
      description: "Fast wireless charging for all Qi-enabled devices",
      price: 2999,
      originalPrice: 3999,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 987,
      brand: "Belkin",
      discount: 25,
      inStock: true,
      category: "Accessories",
    },
  ];

  const brands = [...new Set(mockElectronicsProducts.map((p) => p.brand))];
  const categories = [
    ...new Set(mockElectronicsProducts.map((p) => p.category)),
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        // const response = await fetch(`/api/products/category/${categoryName}`);
        // const data = await response.json();

        setTimeout(() => {
          setProducts(mockElectronicsProducts);
          setFilteredProducts(mockElectronicsProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(mockElectronicsProducts);
        setFilteredProducts(mockElectronicsProducts);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter((product) => product.rating >= selectedRating);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b._id - a._id);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredProducts(filtered);
  }, [
    products,
    searchTerm,
    priceRange,
    selectedBrands,
    selectedRating,
    sortBy,
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : index < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 100000]);
    setSelectedBrands([]);
    setSelectedRating(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>

          {/* Products Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 capitalize">
            {categoryName || "Electronics"} Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover {filteredProducts.length} amazing products in this category
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border outline-none border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedBrands.length > 0 || selectedRating > 0) && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                  {selectedBrands.length + (selectedRating > 0 ? 1 : 0)}
                </span>
              )}
            </button>

            {(selectedBrands.length > 0 ||
              selectedRating > 0 ||
              searchTerm) && (
              <button
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 bg-white p-6 rounded-xl shadow-sm h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-2 flex items-center gap-1">
                        {renderStars(rating)}
                        <span className="text-sm text-gray-700 ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 ${
                      viewMode === "list" ? "flex gap-6" : ""
                    }`}
                  >
                    {/* Image Container */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "w-48 flex-shrink-0" : ""
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "h-48" : "h-48 sm:h-52 lg:h-56"
                        }`}
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.discount && (
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {product.discount}% OFF
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            OUT OF STOCK
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div
                      className={`p-4 lg:p-5 ${
                        viewMode === "list" ? "flex-1" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <span className="text-xs text-gray-500 ml-2">
                          {product.brand}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg lg:text-xl font-bold text-blue-600">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        className={`w-full py-2.5 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
                          product.inStock
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>

                      <div className="h-3"></div>

                      {/* View Details Button */}
                      <button className="w-full py-2.5 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:shadow-lg">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
