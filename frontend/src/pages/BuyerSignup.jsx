import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Key,
  Send,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BuyerSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    role: "buyer",
  });

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const navigate = useNavigate();

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Clear OTP error when user starts typing
    if (errors.otp) {
      setErrors({
        ...errors,
        otp: "",
      });
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
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
          // Using a free geocoding service (OpenStreetMap Nominatim)
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
              address: `${address.house_number || ""} ${address.road || ""}, ${
                address.suburb || address.neighbourhood || ""
              }`.trim(),
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{5,6}$/.test(formData.pincode))
      newErrors.pincode = "Invalid pincode format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setErrors({ ...errors, otp: "Please enter complete 4-digit OTP" });
      return false;
    }
    return true;
  };

  const handleRequestOtp = async () => {
    if (!validateForm()) return;

    setOtpLoading(true);

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In real implementation, make API call here
      console.log("Sending OTP to:", formData.email);

      setOtpSent(true);
      setCanResend(false);
      setCountdown(60); // 60 seconds countdown
      alert(`OTP sent to ${formData.email}`);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setOtpLoading(true);
    setOtp(["", "", "", ""]);

    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Resending OTP to:", formData.email);

      setCanResend(false);
      setCountdown(60);
      alert("OTP resent successfully!");
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      // First step: Request OTP
      await handleRequestOtp();
    } else {
      // Second step: Verify OTP and create account
      if (!validateOtp()) return;

      const otpString = otp.join("");
      console.log("Verifying OTP:", otpString);
      console.log("Form data:", formData);

      try {
        // In real implementation, verify OTP with backend
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert("Account created successfully!");
        // navigate("/dashboard");
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setErrors({ ...errors, otp: "Invalid OTP. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            {otpSent
              ? "Enter the OTP sent to your email"
              : "Join us and start shopping today"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields - only show if OTP not sent */}
            {!otpSent && (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
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
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="gender"
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

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
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

                {/* Location with Auto-fill */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Location Details *
                    </label>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
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
                          placeholder="City"
                        />
                      </div>
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.pincode ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Pincode"
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Flat no., Building, Street, Landmark"
                    />
                  </div>
                </div>
              </>
            )}

            {/* OTP Section - only show if OTP sent */}
            {otpSent && (
              <div className="space-y-6">
                {/* Email Display */}
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                    <Mail className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    We've sent a 4-digit OTP to
                  </p>
                  <p className="font-semibold text-gray-900">
                    {formData.email}
                  </p>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                    Enter 4-Digit OTP
                  </label>
                  <div className="flex justify-center space-x-3 mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.otp ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0"
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="text-red-500 text-sm text-center mb-4">
                      {errors.otp}
                    </p>
                  )}

                  {/* Resend OTP */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Didn't receive the OTP?
                    </p>
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={otpLoading}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm disabled:opacity-50"
                      >
                        {otpLoading ? "Sending..." : "Resend OTP"}
                      </button>
                    ) : (
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Resend in {countdown}s</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={otpLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:transform-none"
            >
              {otpLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{otpSent ? "Verifying..." : "Sending OTP..."}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  {otpSent ? (
                    <>
                      <Key className="h-5 w-5" />
                      <span>Verify OTP & Create Account</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Request OTP</span>
                    </>
                  )}
                </div>
              )}
            </button>

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyerSignup;
