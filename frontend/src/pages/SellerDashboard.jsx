import React from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  Plus,
  Eye,
  User,
  TrendingUp,
  ShoppingBag,
  Warehouse,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

export default function SellerDashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Your Store Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your store and track your performance
              </p>
            </div>
            {/* <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Package className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-900">247</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12 this month
                </p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
                  <ShoppingCart className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">1,429</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +23 today
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Generated */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                  <DollarSign className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">$45,230</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.2% vs last month
                </p>
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Clock className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">18</p>
                <p className="text-sm text-orange-600 mt-1">
                  Requires attention
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleNavigation(`newProduct`)}
              className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
            <button
              onClick={() => handleNavigation("orders")}
              className="flex items-center justify-center px-6 py-4 bg-white text-green-600 border-2 border-green-600 rounded-xl hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Eye className="h-5 w-5 mr-2" />
              View Orders
            </button>
            <button
              onClick={() => {
                handleNavigation("inventory");
                window.scrollTo(0, 0);
              }}
              className="flex items-center justify-center px-6 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <Warehouse className="h-5 w-5 mr-2" />
              View Inventory
            </button>
            <button
              onClick={() => handleNavigation("profile")}
              className="flex items-center justify-center px-6 py-4 bg-white text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <User className="h-5 w-5 mr-2" />
              View Profile
            </button>
          </div>
        </div>

        {/* Recent Orders - Full Width */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-3 text-blue-600" />
              Recent Orders
            </h3>
            <button
              onClick={() => {
                handleNavigation("orders");
                window.scrollTo(0, 0);
              }}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-medium rounded-lg transition-colors"
            >
              View All Orders
            </button>
          </div>
          <div className="overflow-hidden">
            <div className="grid gap-4">
              {[
                {
                  id: "#12845",
                  customer: "Sarah Johnson",
                  amount: "$89.99",
                  status: "Processing",
                  time: "2 hours ago",
                  items: "2 items",
                },
                {
                  id: "#12844",
                  customer: "Mike Chen",
                  amount: "$156.50",
                  status: "Shipped",
                  time: "4 hours ago",
                  items: "1 item",
                },
                {
                  id: "#12843",
                  customer: "Emma Davis",
                  amount: "$234.00",
                  status: "Delivered",
                  time: "6 hours ago",
                  items: "3 items",
                },
                {
                  id: "#12842",
                  customer: "John Smith",
                  amount: "$67.25",
                  status: "Processing",
                  time: "8 hours ago",
                  items: "1 item",
                },
                {
                  id: "#12841",
                  customer: "Lisa Wilson",
                  amount: "$198.75",
                  status: "Shipped",
                  time: "1 day ago",
                  items: "4 items",
                },
              ].map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleNavigation(`/order/${order.id}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {order.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.customer}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {order.amount}
                      </p>
                      <p className="text-xs text-gray-500">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
