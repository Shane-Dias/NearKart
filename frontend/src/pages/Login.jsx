import React, { useState, useEffect, useRef } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AccountTypeModal from "../components/AccountTypeModal";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", ""],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const RESEND_OTP_SECONDS = 30;
  // Start timer when OTP is sent
  useEffect(() => {
    if (otpSent) {
      setResendTimer(RESEND_OTP_SECONDS);
    }
  }, [otpSent]);

  // Timer countdown effect
  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [resendTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;

    const newOtp = [...formData.otp];
    newOtp[index] = value;

    setFormData((prev) => ({
      ...prev,
      otp: newOtp,
    }));

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Clear OTP error when user starts typing
    if (errors.otp) {
      setErrors((prev) => ({
        ...prev,
        otp: "",
      }));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const validateEmail = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};

    // OTP validation
    const otpString = formData.otp.join("");
    if (otpString.length !== 4) {
      newErrors.otp = "Please enter complete 4-digit OTP";
    } else if (!/^\d{4}$/.test(otpString)) {
      newErrors.otp = "OTP must contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsRequestingOtp(true);

    // Simulate API call to send OTP
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("OTP sent to:", formData.email);
      setOtpSent(true);
      alert(`OTP sent to ${formData.email}!`); // Replace with actual notification
    } catch (error) {
      console.error("OTP request error:", error);
      setErrors({ email: "Failed to send OTP. Please try again." });
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateOtp()) {
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const otpString = formData.otp.join("");
      console.log("Sign in attempt:", {
        email: formData.email,
        otp: otpString,
      });
      alert("Sign in successful!"); // Replace with actual navigation
    } catch (error) {
      console.error("Sign in error:", error);
      setErrors({ otp: "Invalid OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsRequestingOtp(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP resent to:", formData.email);
      alert("OTP resent successfully!");
      setFormData((prev) => ({
        ...prev,
        otp: ["", "", "", ""],
      }));
      setResendTimer(RESEND_OTP_SECONDS); // Restart timer
    } catch (error) {
      console.error("Resend OTP error:", error);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  return (
    <div className="h-5/6 bg-gradient-to-br pt-8 pb-8 from-blue-50 to-indigo-100 flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            {otpSent
              ? "Enter the OTP sent to your email"
              : "Sign in to your NearKart account"}
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={otpSent}
                  className={`outline-none block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  } ${otpSent ? "bg-gray-50 text-gray-600" : ""}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* OTP Field - Only show after email is validated and OTP is sent */}
            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter 4-Digit OTP
                </label>
                <div className="flex space-x-3 justify-center">
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                        errors.otp
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="0"
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600 text-center">
                    {errors.otp}
                  </p>
                )}

                {/* Resend OTP */}

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isRequestingOtp || resendTimer > 0}
                      className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 disabled:opacity-50"
                    >
                      {isRequestingOtp
                        ? "Sending..."
                        : resendTimer > 0
                        ? `Resend OTP (${resendTimer}s)`
                        : "Resend OTP"}
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Request OTP / Sign In Button */}
            {!otpSent ? (
              <button
                onClick={handleRequestOtp}
                disabled={isRequestingOtp}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                  isRequestingOtp
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isRequestingOtp ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  "Request OTP"
                )}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            )}

            {/* Back to Email Button */}
            {otpSent && (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setFormData((prev) => ({
                    ...prev,
                    otp: ["", "", "", ""],
                  }));
                  setErrors({});
                }}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Change Email
              </button>
            )}
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => setShowAccountTypeModal(true)}
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
      {/* Floating Account Type Selector */}
      {showAccountTypeModal && (
        <AccountTypeModal onClose={() => setShowAccountTypeModal(false)} />
      )}
    </div>
  );
};

export default Login;
