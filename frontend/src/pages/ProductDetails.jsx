import { useEffect, useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Award,
  ArrowLeft,
} from "lucide-react";

const ProductDetails = () => {
  // Mock productId for demo purposes
  const productId = "123";
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Mock product data for demo
    const mockProduct = {
      id: "123",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      description:
        "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and premium leather cushioning for maximum comfort during extended listening sessions. Perfect for music lovers, professionals, and gamers alike.",
      price: 4999,
      originalPrice: 7999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop",
      ],
      seller: {
        shopName: "TechStore Pro",
      },
      rating: 4.5,
      reviewCount: 127,
    };

    // Simulate API call delay
    setTimeout(() => setProduct(mockProduct), 1000);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Mock additional product images if not available
  const productImages = product.images || [
    product.image,
    product.image,
    product.image,
  ];
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 127;

  return (
    <div className="min-h-screen bg-gray-50">
          {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Products</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <img
                src={productImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? "text-amber-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({reviewCount} reviews)
                </span>
              </div>

              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                {product.category}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                ₹{product.price?.toLocaleString()}
              </div>
              {product.originalPrice && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md font-medium">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % off
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Seller Information
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.seller?.shopName || "Premium Store"}
                  </p>
                  <p className="text-sm text-gray-500">Verified Seller</p>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem] border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`px-4 py-3 rounded-xl border transition-all ${
                      isFavorite
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>

                  <button className="px-4 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-500">On orders above ₹500</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-500">100% secure checkout</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Quality Assured</p>
                  <p className="text-sm text-gray-500">Verified products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
