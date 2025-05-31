import { useState, useEffect } from "react";
import { Upload, X, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    originalPrice: 0,
    discount: 0,
    sellingPrice: 0,
    stock: 0,
    lowTresholdCount: 0,
    images: [],
    category: "",
    brand: "",
    deliveryCharges: 0,
    specifications: [],
    returnPolicy: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = [
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

  const returnPolicies = [
    "7-day returns",
    "14-day returns",
    "30-day returns",
    "No returns",
    "Exchange only",
    "Warranty replacement only",
  ];

  // Auto-calculate selling price
  useEffect(() => {
    const discountedPrice =
      formData.originalPrice * (1 - formData.discount / 100);
    setFormData((prev) => ({
      ...prev,
      sellingPrice: parseFloat(discountedPrice.toFixed(2)),
    }));
  }, [formData.originalPrice, formData.discount]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewImages([...previewImages, ...imagePreviews]);
  };

  const removeImage = (index) => {
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index].preview);
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  const addSpecification = () => {
    if (newSpec.key && newSpec.value) {
      setFormData({
        ...formData,
        specifications: [...formData.specifications, { ...newSpec }],
      });
      setNewSpec({ key: "", value: "" });
    }
  };

  const removeSpecification = (index) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs.splice(index, 1);
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append basic form fields (excluding images and specifications)
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "images" && key !== "specifications") {
          formDataToSend.append(key, value);
        }
      });

      // Append specifications as JSON string
      formDataToSend.append(
        "specifications",
        JSON.stringify(formData.specifications)
      );

      // Append actual image files (not the preview objects)
      previewImages.forEach((imageObj, index) => {
        formDataToSend.append("images", imageObj.file);
      });

      // Debug: Log what's being sent
      console.log("Form data contents:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const sellerId = id;
      const response = await axios.post(
        `http://localhost:5000/api/product/addNewProduct/${sellerId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Product added:", response.data);
      toast.success("Product added successfully!");

      // Reset form properly
      setFormData({
        name: "",
        description: "",
        originalPrice: 0,
        discount: 0,
        sellingPrice: 0,
        stock: 0,
        lowTresholdCount: 0,
        images: [],
        category: "",
        brand: "",
        deliveryCharges: 0,
        specifications: [],
        returnPolicy: "",
      });

      // Clear preview images and revoke object URLs to prevent memory leaks
      previewImages.forEach((img) => URL.revokeObjectURL(img.preview));
      setPreviewImages([]);
      navigate(`/seller/${sellerId}`);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add product");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Add New Product
            </h1>
            <p className="text-blue-100 mt-2">
              Fill in the details to add a new product to your inventory
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Basic Information
              </h2>

              {/* Product Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full outline-none p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Describe your product..."
                  required
                />
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter brand name"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Pricing & Stock
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Original Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Original Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-medium">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full outline-none pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      min="0"
                      step="1"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Discount */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Discount (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => {
                        const discount = Math.min(
                          100,
                          Math.max(0, parseFloat(e.target.value) || 0)
                        );
                        setFormData({ ...formData, discount });
                      }}
                      className="w-full outline-none pr-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      min="0"
                      max="100"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">
                      %
                    </span>
                  </div>
                </div>

                {/* Selling Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Selling Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-medium">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={formData.sellingPrice}
                      readOnly
                      className="w-full pl-8 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    min="0"
                    placeholder="0"
                    required
                  />
                </div>

                {/* Treshold */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Low Treshold Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.lowTresholdCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lowTresholdCount: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    min="0"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              {/* Delivery Charges */}
              <div className="max-w-xs space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Delivery Charges (₹)
                </label>
                <input
                  type="number"
                  value={formData.deliveryCharges}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryCharges: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Product Images
              </h2>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Images <span className="text-red-500">*</span> (Maximum 5)
                </label>
                <div className="flex flex-wrap gap-4">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Preview ${index}`}
                        className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-lg border-2 border-gray-200 transition-transform duration-200 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {previewImages.length < 5 && (
                    <label className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                      <Upload className="h-6 w-6 text-blue-400 mb-1" />
                      <span className="text-xs text-blue-500 font-medium">
                        Upload
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Specifications
              </h2>

              {/* Existing Specifications */}
              {formData.specifications.length > 0 && (
                <div className="space-y-3">
                  {formData.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <span className="font-medium text-gray-700">
                          {spec.key}:
                        </span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Specification */}
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                <h3 className="font-medium text-gray-700">Add Specification</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newSpec.key}
                    onChange={(e) =>
                      setNewSpec({ ...newSpec, key: e.target.value })
                    }
                    className="p-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Property (e.g., Weight, Color)"
                  />
                  <input
                    type="text"
                    value={newSpec.value}
                    onChange={(e) =>
                      setNewSpec({ ...newSpec, value: e.target.value })
                    }
                    className="p-3 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Value (e.g., 1kg, Red)"
                  />
                </div>
                <button
                  type="button"
                  onClick={addSpecification}
                  disabled={!newSpec.key || !newSpec.value}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Add Specification
                </button>
              </div>
            </div>

            {/* Return Policy Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Return Policy
              </h2>

              <div className="max-w-md space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Return Policy
                </label>
                <select
                  value={formData.returnPolicy}
                  onChange={(e) =>
                    setFormData({ ...formData, returnPolicy: e.target.value })
                  }
                  className="w-full outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select return policy</option>
                  {returnPolicies.map((policy) => (
                    <option key={policy} value={policy}>
                      {policy}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
