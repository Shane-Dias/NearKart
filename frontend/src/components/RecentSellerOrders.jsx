import React from "react";
import { ShoppingBag, ShoppingCart } from "lucide-react";

const RecentSellerOrders = () => {
  return (
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
                    <p className="text-sm text-gray-600">{order.customer}</p>
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
  );
};

export default RecentSellerOrders;
