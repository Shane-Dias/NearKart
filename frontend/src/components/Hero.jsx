import { FaArrowRight, FaShoppingBag } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue to-blue-50 min-h-[500px] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              Shop Local,
              <span className="block text-blue-600">
                Support Your Community
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover amazing products from local businesses in your area.
              Fresh groceries, electronics, and more delivered to your doorstep.
            </p>
          </div>

          <div>
            <button className="group relative bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white font-semibold py-4 px-8 border-2 border-blue-600 outline-none rounded-xl transition-all duration-300 overflow-hidden flex items-center space-x-3 mx-auto">
              <div className="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
              <FaShoppingBag className="text-lg relative z-10" />
              <span className="text-lg relative z-10">Explore Products</span>
              <FaArrowRight className="text-sm relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Feature Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Fresh & Local
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Same Day Delivery
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Support Local Business
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
