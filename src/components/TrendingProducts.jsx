import { useEffect, useState } from "react";
import { TrendingUp, Star, Heart, ShoppingCart, Eye } from "lucide-react";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockProducts = [
    {
      _id: 1,
      name: "Wireless Bluetooth Headphones",
      description: "Premium quality sound with noise cancellation",
      price: 2999,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 1247,
      discount: 40,
      isNew: false,
      isBestseller: true,
    },
    {
      _id: 2,
      name: "Smart Fitness Watch",
      description: "Track your health and fitness with advanced sensors",
      price: 5999,
      originalPrice: 8999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 892,
      discount: 33,
      isNew: true,
      isBestseller: false,
    },
    {
      _id: 3,
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and sustainable everyday wear",
      price: 799,
      originalPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 456,
      discount: 38,
      isNew: false,
      isBestseller: false,
    },
    {
      _id: 4,
      name: "Smartphone 128GB",
      description: "Latest flagship phone with amazing camera",
      price: 24999,
      originalPrice: 29999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 2341,
      discount: 17,
      isNew: true,
      isBestseller: true,
    },
    {
      _id: 5,
      name: "Coffee Maker Pro",
      description: "Brew perfect coffee every morning",
      price: 3499,
      originalPrice: 4999,
      image:
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 678,
      discount: 30,
      isNew: false,
      isBestseller: false,
    },
    {
      _id: 6,
      name: "Gaming Mechanical Keyboard",
      description: "RGB backlit keys for ultimate gaming experience",
      price: 4299,
      originalPrice: 5999,
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 934,
      discount: 28,
      isNew: false,
      isBestseller: true,
    },
    {
      _id: 7,
      name: "Yoga Mat Premium",
      description: "Non-slip eco-friendly yoga mat",
      price: 1299,
      originalPrice: 1999,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 324,
      discount: 35,
      isNew: true,
      isBestseller: false,
    },
    {
      _id: 8,
      name: "Portable Power Bank",
      description: "20000mAh fast charging power bank",
      price: 1499,
      originalPrice: 2299,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 567,
      discount: 35,
      isNew: false,
      isBestseller: false,
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        // const response = await fetch("/api/products/trending");
        // const data = await response.json();

        // Using mock data for now
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(mockProducts);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Trending Products
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover what everyone's buying right now
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 sm:h-52 lg:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      BESTSELLER
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
              <div className="p-4 lg:p-5">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

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
                <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {/* <div className="text-center mt-10 lg:mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
            View More Products
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
        </div> */}
      </div>
    </section>
  );
};

export default TrendingProducts;
