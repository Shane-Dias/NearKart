import { useState, useEffect } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const StoreMap = ({ city, businessAddress, pincode }) => {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const query = `${businessAddress}, ${city}, ${pincode}`;
        console.log(query);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&limit=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }

        const data = await response.json();

        if (data && data.length > 0) {
          setMapData({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            displayName: data[0].display_name,
          });
        } else {
          throw new Error("Location not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city && businessAddress && pincode) {
      fetchLocationData();
    }
  }, [city, businessAddress, pincode]);

  if (loading) {
    return (
      <div className="h-full">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <MapPin className="text-blue-600" size={18} />
            </div>
            Store Location
          </h3>
        </div>
        <div className="flex items-center justify-center h-80 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="text-center">
            <div className="relative mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 rounded-full bg-blue-50 opacity-20 animate-pulse"></div>
            </div>
            <p className="text-gray-700 font-medium">Loading map...</p>
            <p className="text-gray-500 text-sm mt-1">Fetching location data</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <MapPin className="text-red-600" size={18} />
            </div>
            Store Location
          </h3>
        </div>
        <div className="flex items-center justify-center h-80 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-red-400" size={32} />
            </div>
            <h4 className="text-lg font-semibold text-red-600 mb-2">
              Unable to load map
            </h4>
            <p className="text-gray-600 text-sm">{error}</p>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    mapData.lon - 0.01
  },${mapData.lat - 0.01},${mapData.lon + 0.01},${
    mapData.lat + 0.01
  }&layer=mapnik&marker=${mapData.lat},${mapData.lon}`;

  const openInMaps = () => {
    const query = encodeURIComponent(`${businessAddress}, ${city}, ${pincode}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <MapPin className="text-blue-600" size={18} />
            </div>
            Store Location
          </h3>
          <button
            onClick={openInMaps}
            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <ExternalLink size={16} className="mr-1" />
            Open in Maps
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative">
        <iframe
          src={mapUrl}
          className="w-full h-80"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          title="Store Location Map"
        ></iframe>
      </div>

      {/* Address Info */}
      <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-purple-50">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <MapPin className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-2">
                Complete Address
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {businessAddress}, {city} - {pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
