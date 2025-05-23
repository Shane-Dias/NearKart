import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore, FaUser, FaTimes } from "react-icons/fa";

const AccountTypeModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleOptionClick = (path) => {
    onClose(); // Close the modal first
    navigate(path); // Then navigate
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Join As</h2>

        {/* Buyer Card */}
        <div
          onClick={() => handleOptionClick("/signup/buyer")}
          className="flex items-center p-4 mb-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold">Buyer</h3>
            <p className="text-gray-600 text-sm">Shop from local sellers</p>
          </div>
        </div>

        {/* Seller Card */}
        <div
          onClick={() => handleOptionClick("/signup/seller")}
          className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <FaStore className="text-green-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold">Seller</h3>
            <p className="text-gray-600 text-sm">List your products</p>
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default AccountTypeModal;
