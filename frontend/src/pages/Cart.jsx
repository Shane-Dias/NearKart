import React, { useState } from "react";
import {
  Plus,
  Minus,
  Trash2,
  Eye,
  ShoppingBag,
  Truck,
  Shield,
  Tag,
  ChevronRight,
} from "lucide-react";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apple iPhone 15 (Blue, 128 GB)",
      brand: "Apple",
      price: 79900,
      originalPrice: 89900,
      discount: 11,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592910961711-9bc36e9641f7?w=300&h=300&fit=crop",
      seller: "Flipkart",
      delivery: "FREE Delivery by Tomorrow",
      inStock: true,
      offers: ["Bank Offer", "No Cost EMI"],
    },
    {
      id: 2,
      name: "Samsung Galaxy Buds2 Pro (White)",
      brand: "Samsung",
      price: 11999,
      originalPrice: 17999,
      discount: 33,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      seller: "Samsung Brand Store",
      delivery: "FREE Delivery in 3 days",
      inStock: true,
      offers: ["No Cost EMI"],
    },
    {
      id: 3,
      name: "Boat Airdopes 141 Bluetooth Truly Wireless",
      brand: "boAt",
      price: 1299,
      originalPrice: 2990,
      discount: 57,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
      seller: "RetailNet",
      delivery: "FREE Delivery by Monday",
      inStock: false,
      offers: [],
    },
  ]);

  const [savedItems] = useState([
    {
      id: 4,
      name: "Nike Air Max 270 Running Shoes",
      brand: "Nike",
      price: 8995,
      originalPrice: 12995,
      discount: 31,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState("Home");

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const moveToWishlist = (id) => {
    console.log(`Moving item ${id} to wishlist`);
    removeItem(id);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateSavings = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.originalPrice - item.price) * item.quantity,
      0
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">Add items to it now</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            My Cart ({cartItems.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Deliver to:{" "}
                      <span className="font-semibold">{selectedAddress}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Mitchowki, Orlem Malad West, Mumbai - 400064
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 font-medium text-sm hover:underline">
                  CHANGE
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 ${
                    index !== cartItems.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-medium text-gray-800 text-lg leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">by {item.brand}</p>
                        <p className="text-sm text-gray-600">
                          Seller: {item.seller}
                        </p>
                      </div>

                      {/* Offers */}
                      {item.offers.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.offers.map((offer, idx) => (
                            <span
                              key={idx}
                              className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {offer}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-semibold text-gray-900">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            {item.discount}% off
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="flex items-center space-x-2 text-sm">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{item.delivery}</span>
                        {!item.inStock && (
                          <span className="text-red-600 font-medium ml-4">
                            Currently out of stock
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-6 text-sm">
                        <button
                          onClick={() => moveToWishlist(item.id)}
                          className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Add to wishlist</span>
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>REMOVE</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                PRICE DETAILS
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>
                    Price (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>{formatPrice(subtotal + savings)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(savings)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                    {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="text-green-600 font-medium">
                  You will save {formatPrice(savings)} on this order
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition-colors">
                  PLACE ORDER
                </button>

                {/* Safe and Secure */}
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>
                    Safe and Secure Payments. Easy returns. 100% Authentic
                    products.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
