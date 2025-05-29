import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  Home,
  Edit3,
  Save,
  X,
  ShoppingCart,
  Package,
  Heart,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchProfileData = async () => {
        setLoading(true);

        // Uncomment for actual API call
        const response = await fetch(`http://localhost:5000/api/buyer/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/");
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data.buyer);
        setEditData(data.buyer);
        setLoading(false);
      };

      fetchProfileData();
    } catch (error) {
      console.log("Error fetching profile data:", error);
      setError(error.message);
      setLoading(false);
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Mock save - replace with actual API call
      setTimeout(() => {
        setProfileData({ ...editData });
        setIsEditing(false);
        setSaving(false);
      }, 1000);

      /*
      // Uncomment for actual API call
      const response = await fetch(`http://localhost:5000/api/buyer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setProfileData(data.buyer);
      setIsEditing(false);
      setSaving(false);
      */
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 text-center mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No profile data found
          </h2>
        </div>
      </div>
    );
  }

  const EditableField = ({
    icon: Icon,
    label,
    field,
    type = "text",
    isTextArea = false,
  }) => {
    const value = isEditing ? editData[field] : profileData[field];

    return (
      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
        <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-600">{label}</p>
          {isEditing ? (
            isTextArea ? (
              <textarea
                value={value || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="2"
              />
            ) : (
              <input
                type={type}
                value={value || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )
          ) : (
            <p className="font-medium text-gray-800 break-all">
              {value || "Not provided"}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-md">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <User className="h-16 w-16 text-blue-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {profileData.firstname} {profileData.lastname}
                  </h1>
                  <p className="text-blue-100 text-sm sm:text-base">
                    {profileData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-b-lg lg:rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        <span>{saving ? "Saving..." : "Save"}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Personal Details
                    </h3>

                    <EditableField
                      icon={User}
                      label="First Name"
                      field="firstname"
                    />

                    <EditableField
                      icon={User}
                      label="Last Name"
                      field="lastname"
                    />

                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600">Gender</p>
                        {isEditing ? (
                          <select
                            value={editData.gender || ""}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                            className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        ) : (
                          <p className="font-medium text-gray-800 capitalize">
                            {profileData.gender || "Not specified"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      Contact Details
                    </h3>

                    <EditableField
                      icon={Mail}
                      label="Email Address"
                      field="email"
                      type="email"
                    />

                    <EditableField
                      icon={Phone}
                      label="Phone Number"
                      field="phoneNo"
                      type="tel"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Address Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <EditableField
                        icon={Home}
                        label="Street Address"
                        field="address"
                        isTextArea={true}
                      />
                    </div>

                    <EditableField icon={MapPin} label="City" field="city" />

                    <EditableField
                      icon={Hash}
                      label="PIN Code"
                      field="pincode"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Actions & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                  <ShoppingCart className="h-5 w-5" />
                  <span>View Cart (3)</span>
                </button>

                <button className="w-full flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                  <Package className="h-5 w-5" />
                  <span>My Orders</span>
                </button>

                <button className="w-full flex items-center space-x-3 bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist (12)</span>
                </button>

                <button className="w-full flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold text-gray-800">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold text-green-600">
                    $1,248.50
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reward Points</span>
                  <span className="font-semibold text-purple-600">1,850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-800">Jan 2023</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Order #1234 delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Added 3 items to cart</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Updated wishlist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
