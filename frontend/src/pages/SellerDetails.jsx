import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  User,
  Package,
  Star,
  Clock,
  Globe,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import StoreMap from "../components/StoreMap";

// Main Store Details Component
const StoreDetailsPage = () => {
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/seller/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch store data");
        }

        const data = await response.json();
        setStoreData(data);
      } catch (err) {
        setError(err.message);
        setStoreData({});
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-blue-50 opacity-20 animate-pulse"></div>
          </div>
          <p className="text-gray-700 font-medium text-lg">
            Loading store details...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (error && !storeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center border border-red-100">
          <div className="text-red-500 mb-6">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <Building size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Store Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Store Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
                {storeData.shopLogo ? (
                  <img
                    src={`http://localhost:5000/${storeData.shopLogo.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={storeData.shopName}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <Building className="text-white" size={40} />
                )}
              </div>
            </div>

            {/* Store Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 drop-shadow-sm">
                {storeData.shopName}
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-white/90">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Package className="mr-2" size={18} />
                  <span className="font-medium">{storeData.shopCategory}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <MapPin className="mr-2" size={18} />
                  <span className="font-medium">{storeData.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Phone className="text-blue-600" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Contact Information
              </h2>
            </div>

            <div className="space-y-6">
              {/* Owner Info */}
              <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <User className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Store Owner
                  </p>
                  <p className="text-lg font-semibold text-gray-800 capitalize">
                    {storeData.ownerName}
                  </p>
                </div>
              </div>

              {/* Phone Info */}
              <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </p>
                  <a
                    href={`tel:${storeData.phoneNo}`}
                    className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors"
                  >
                    {storeData.phoneNo}
                  </a>
                </div>
              </div>

              {/* Email Info */}
              <div className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${storeData.email}`}
                    className="text-lg font-semibold text-purple-600 hover:text-purple-700 transition-colors break-all"
                  >
                    {storeData.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mt-8">
              <a
                href={`tel:${storeData.phoneNo}`}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium text-center transition-colors flex items-center justify-center"
              >
                <Phone size={18} className="mr-2" />
                Call Now
              </a>
              <a
                href={`mailto:${storeData.email}`}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium text-center transition-colors flex items-center justify-center"
              >
                <Mail size={18} className="mr-2" />
                Email
              </a>
            </div>
          </div>

          {/* Enhanced Map Component */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <StoreMap
              city={storeData.city}
              businessAddress={storeData.businessAddress}
              pincode={storeData.pincode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsPage;
