import React, { useState } from "react";
import {
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Upload,
  Tag,
  Camera,
  FileText,
  Shield,
  Clock,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    gender: "",
    email: "",
    phoneNo: "",
    businessAddress: "",
    city: "",
    pincode: "",
    shopCategory: "",
    role: "Seller",
  });

  const [errors, setErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [shopLogo, setShopLogo] = useState(null);
  const [governmentId, setGovernmentId] = useState(null);
  const navigate = useNavigate();

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
      } else if (file && file.type === "application/pdf") {
        if (name === "governmentId") {
          setIdPreview("pdf");
        }
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
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);

    if (!navigator.geolocation) {
      toast.warn("Geolocation is not supported by this browser.");
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
          toast.warn("Unable to fetch address. Please enter manually.");
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.warn(
              "Location access denied. Please enter address manually."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            toast.warn("Location information unavailable.");
            break;
          case error.TIMEOUT:
            toast.warn("Location request timed out.");
            break;
          default:
            toast.warn("An unknown error occurred.");
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

    if (!formData.phoneNo.trim())
      newErrors.phoneNo = "Phone number is required";
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Invalid phone number format";
    }

    if (!formData.businessAddress.trim())
      newErrors.businessAddress = "Business address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{5,6}$/.test(formData.pincode))
      newErrors.pincode = "Invalid pincode format";

    if (!formData.shopCategory)
      newErrors.shopCategory = "Shop category is required";

    if (!termsAccepted)
      newErrors.terms = "Please accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const requestOtp = async () => {
    if (!validate()) return;
    setOtpLoading(true);
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (shopLogo) form.append("shopLogo", shopLogo);
    if (governmentId) form.append("governmentId", governmentId);
    console.log("Form", form);

    try {
      const res = await fetch("http://localhost:5000/api/seller/signup", {
        method: "POST",
        body: form, //browser automatically sets headers=> Content-Type: multipart/form-data
      });

      setOtpTimer(60); // 60 seconds countdown

      // Start countdown timer
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const data = await res.json();
      if (res.ok) {
        toast.info("OTP sent to your email");
        setOtpSent(true);
      } else {
        toast.error(data.msg || "Failed to send OTP");
      }
    } catch (err) {
      toast.warn("Error sending OTP");
      console.error(err);
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtpAndSubmit = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 4) {
      setErrors({ ...errors, otp: "Please enter the complete 4-digit OTP" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/seller/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          otp: otp.join(""),
        }),
      });
      console.log("Otp:", otp.join(""));

      const data = await res.json();
      if (res.ok) {
        toast.success("Seller account created successfully!");
        navigate(`/seller/${data.user.id}`);
        window.scrollTo(0, 0);
      } else {
        toast.error(data.msg || "OTP verification failed");
      }
    } catch (err) {
      toast.error("Error verifying OTP");
      console.error(err);
    }
  };

  const resendOtp = () => {
    if (otpTimer > 0) return;
    requestOtp();
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
      <ToastContainer />
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

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Owner's Gender
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
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
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.phoneNo ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+91 1234567890"
                  />
                </div>
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
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
            <div className="border-b border-gray-200 pb-6">
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

            {/* Terms & OTP Verification */}
            <div className="pt-6">
              <div className="flex items-start space-x-3 mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
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
              {errors.terms && (
                <p className="text-red-500 text-sm mb-4">{errors.terms}</p>
              )}

              {!otpSent ? (
                <button
                  type="button"
                  onClick={requestOtp}
                  disabled={otpLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {otpLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    "Request OTP"
                  )}
                </button>
              ) : (
                <div className="space-y-4">
                  {/* OTP Verification Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h4 className="text-sm font-semibold text-blue-900">
                        Email Verification
                      </h4>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      Enter the 4-digit OTP sent to{" "}
                      <span className="font-medium">{formData.email}</span>
                    </p>
                    <div className="flex space-x-2 justify-center mb-2">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-10 h-10 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ))}
                    </div>
                    {errors.otp && (
                      <p className="text-red-500 text-sm mb-2">{errors.otp}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={verifyOtpAndSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        Verify & Submit
                      </button>
                      <button
                        type="button"
                        onClick={resendOtp}
                        disabled={otpTimer > 0}
                        className={`text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50`}
                      >
                        {otpTimer > 0 ? (
                          <span>
                            <Clock className="inline h-4 w-4 mr-1" />
                            Resend OTP in {otpTimer}s
                          </span>
                        ) : (
                          "Resend OTP"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign in
                  </button>
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
