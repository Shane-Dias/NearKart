import React, { useState } from "react";
import {
  Store,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Home,
  Eye,
  EyeOff,
  Upload,
  Tag,
  Camera,
  FileText,
} from "lucide-react";

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    password: "",
    phone: "",
    businessAddress: "",
    city: "",
    pincode: "",
    shopCategory: "",
    shopLogo: null,
    governmentId: null,
    role: "seller",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [idPreview, setIdPreview] = useState(null);

  const shopCategories = [
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });

      // Create preview for images
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (name === "shopLogo") {
            setLogoPreview(e.target.result);
          } else if (name === "governmentId") {
            setIdPreview(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = "";
    if (password.length < 6) {
      strength = "weak";
    } else if (password.length < 8 || !/(?=.*[A-Z])(?=.*\d)/.test(password)) {
      strength = "medium";
    } else if (/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      strength = "strong";
    } else {
      strength = "medium";
    }
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            const address = data.address;
            setFormData((prev) => ({
              ...prev,
              city: address.city || address.town || address.village || "",
              pincode: address.postcode || "",
              businessAddress: `${address.house_number || ""} ${
                address.road || ""
              }, ${address.suburb || address.neighbourhood || ""}`.trim(),
            }));
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Unable to fetch address. Please enter manually.");
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location access denied. Please enter address manually.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out.");
            break;
          default:
            alert("An unknown error occurred.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.shopName.trim())
      newErrors.shopName = "Shop/Business name is required";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner's full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.businessAddress.trim())
      newErrors.businessAddress = "Business address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{5,6}$/.test(formData.pincode))
      newErrors.pincode = "Invalid pincode format";

    if (!formData.shopCategory)
      newErrors.shopCategory = "Shop category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Seller form submitted:", formData);
      alert(
        "Seller account created successfully! Please wait for verification."
      );
    }
  };

  const removeFile = (fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: null,
    });
    if (fieldName === "shopLogo") setLogoPreview(null);
    if (fieldName === "governmentId") setIdPreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join as a Seller
          </h1>
          <p className="text-gray-600">
            Start selling and grow your business with us
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="space-y-6">
            {/* Business Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Business Information
              </h3>

              {/* Shop Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shop/Business Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.shopName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="ABC Electronics Store"
                  />
                </div>
                {errors.shopName && (
                  <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
                )}
              </div>

              {/* Owner Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Owner's Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.ownerName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.ownerName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ownerName}
                  </p>
                )}
              </div>

              {/* Shop Category */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shop Category *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="shopCategory"
                    value={formData.shopCategory}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white ${
                      errors.shopCategory ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select your business category</option>
                    {shopCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.shopCategory && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shopCategory}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="shop@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{
                            width:
                              passwordStrength === "weak"
                                ? "33%"
                                : passwordStrength === "medium"
                                ? "66%"
                                : passwordStrength === "strong"
                                ? "100%"
                                : "0%",
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 capitalize">
                        {passwordStrength}
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+91 1234567890"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Location Information */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Business Location
                </h3>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  <MapPin className="h-4 w-4" />
                  <span>
                    {locationLoading
                      ? "Getting location..."
                      : "Use current location"}
                  </span>
                </button>
              </div>

              {/* Business Address */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Address *{" "}
                  <span className="text-xs text-gray-500">
                    (Where orders will be picked up)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                      errors.businessAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Shop no., Building, Street, Area, Landmark"
                  />
                </div>
                {errors.businessAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.businessAddress}
                  </p>
                )}
              </div>

              {/* City and Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Mumbai"
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="400001"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents & Branding */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Documents & Branding
              </h3>

              {/* Shop Logo */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shop Logo{" "}
                  <span className="text-xs text-gray-500">
                    (Optional - for branding)
                  </span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  {logoPreview ? (
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="mx-auto h-24 w-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile("shopLogo")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                      <p className="mt-2 text-sm text-gray-600">
                        {formData.shopLogo?.name}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload shop logo
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            PNG, JPG up to 2MB
                          </span>
                          <input
                            type="file"
                            name="shopLogo"
                            onChange={handleChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Government ID */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Government ID / Shop License{" "}
                  <span className="text-xs text-gray-500">
                    (Optional - for verification)
                  </span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  {formData.governmentId && idPreview !== "pdf" ? (
                    <div className="relative">
                      <img
                        src={idPreview}
                        alt="ID preview"
                        className="mx-auto h-24 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile("governmentId")}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                      <p className="mt-2 text-sm text-gray-600">
                        {formData.governmentId?.name}
                      </p>
                    </div>
                  ) : formData.governmentId && idPreview === "pdf" ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        PDF Uploaded: {formData.governmentId.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFile("governmentId")}
                        className="mt-2 bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
                      >
                        Remove PDF
                      </button>
                    </div>
                  ) : (
                    // Show upload icon if nothing is uploaded
                    <div>
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload ID document
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            Aadhar, PAN, Shop License, etc. (PNG, JPG, PDF up to
                            5MB)
                          </span>
                          <input
                            type="file"
                            name="governmentId"
                            onChange={handleChange}
                            accept="image/*,.pdf"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-3 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Seller Account
              </button>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;
