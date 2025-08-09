import React, { createContext, useContext, useEffect, useRef } from 'react';
import { MapPin, Home, Bed, Bath, Square, IndianRupee, Heart, Star, Clock, Navigation, Utensils, Building2, ShoppingCart, Car, GraduationCap, Plane, Train } from 'lucide-react';
import { PropertyAPi } from '../contexApi/PropDetails';

// Google Map Component
const GoogleMap = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: coordinates.latitude, lng: coordinates.longitude },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      new window.google.maps.Marker({
        position: { lat: coordinates.latitude, lng: coordinates.longitude },
        map: map,
        title: 'Property Location',
        animation: window.google.maps.Animation.DROP,
      });
    };

    loadGoogleMaps();
  }, [coordinates]);

  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full">
        {/* Fallback content while map loads */}
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-blue-500" />
            <p className="text-sm">Loading Map...</p>
            <p className="text-xs mt-1">
              Lat: {coordinates.latitude}, Lng: {coordinates.longitude}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Image Component
const PropertyImage = ({ image, title }) => {
  return (
    <div className="relative mb-8">
      <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Heart Icon */}
        <button className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full transition-all duration-200 shadow-md">
          <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md">
          For Sale
        </div>
      </div>
    </div>
  );
};

// Amenities Component
const AmenitiesSection = ({ amenities }) => {
  const getIconForType = (type) => {
    const iconMap = {
      'restaurant': Utensils,
      'hospital': Building2,
      'school': GraduationCap,
      'shopping_mall': ShoppingCart,
      'gas_station': Car,
      'airport': Plane,
      'train_station': Train,
      'bank': Building2,
      'pharmacy': Building2,
      'gym': Building2,
      'park': MapPin,
      'default': MapPin
    };
    
    const IconComponent = iconMap[type] || iconMap['default'];
    return <IconComponent className="w-5 h-5" />;
  };

  const getColorForType = (type) => {
    const colorMap = {
      'restaurant': 'text-orange-400',
      'hospital': 'text-red-400',
      'school': 'text-blue-400',
      'shopping_mall': 'text-purple-400',
      'gas_station': 'text-yellow-400',
      'airport': 'text-indigo-400',
      'train_station': 'text-green-400',
      'bank': 'text-emerald-400',
      'pharmacy': 'text-pink-400',
      'gym': 'text-cyan-400',
      'park': 'text-lime-400',
      'default': 'text-gray-400'
    };
    
    return colorMap[type] || colorMap['default'];
  };

  const formatType = (type) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!amenities || amenities.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
        <h2 className="text-xl font-semibold text-white mb-4">Nearby Amenities</h2>
        <p className="text-gray-400">No amenities information available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
      <h2 className="text-xl font-semibold text-white mb-6">Nearby Amenities</h2>
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {amenities.map((amenity, index) => (
          <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-4 hover:bg-gray-750 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`${getColorForType(amenity.type)} p-2 bg-gray-700 rounded-lg`}>
                  {getIconForType(amenity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm leading-tight mb-1">
                    {amenity.name}
                  </h3>
                  
                  <p className="text-xs text-gray-400 leading-tight mb-2">
                    {amenity.address}
                  </p>
                  
                  <div className="flex items-center space-x-4 flex-wrap">
                    <div className="flex items-center space-x-1">
                      <Navigation className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-300">{amenity.distanceText}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-300">{amenity.durationText}</span>
                    </div>
                    
                    {amenity.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-yellow-300">
                          {amenity.rating} ({amenity.userRatingsTotal})
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                      {formatType(amenity.type)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Property Details Component
const SpecificProperty = () => {
  const {SingleProperty, setSingleProperty, Anemities} = useContext(PropertyAPi);
  const property = SingleProperty || {};
  

  useEffect(()=>{console.log(Anemities)},[Anemities])
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} L`;
    }
    return price?.toLocaleString('en-IN');
  };

  return (
    <div className="w-full mx-auto p-6 mb-10 bg-gray-900 shadow-2xl">
      {/* Property Image */}
      <PropertyImage image={property?.image} title={property?.title} />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {property?.title}
        </h1>
        <div className="flex items-center text-gray-300 mb-4">
          <MapPin className="w-5 h-5 mr-2 text-blue-400" />
          <span className="text-lg">
            {property?.location?.city}, {property?.location?.state} - {property?.location?.pincode}
          </span>
        </div>
        <div className="flex items-center">
          <IndianRupee className="w-8 h-8 text-green-400 mr-1" />
          <span className="text-4xl font-bold text-green-400">
            {formatPrice(property?.price)}
          </span>
        </div>
      </div>

      {/* Property Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Property Details */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <h2 className="text-xl font-semibold text-white mb-4">Property Details</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
                <Home className="w-6 h-6 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-semibold text-white">{property?.propertyType}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
                <Square className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Area</p>
                  <p className="font-semibold text-white">{property?.area} sq ft</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
                <Bed className="w-6 h-6 text-purple-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Bedrooms</p>
                  <p className="font-semibold text-white">{property?.bedrooms}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-sm">
                <Bath className="w-6 h-6 text-orange-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Bathrooms</p>
                  <p className="font-semibold text-white">{property?.bathrooms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">{property?.description}</p>
          </div>
        </div>

        {/* Right Column - Map and Location */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
            <GoogleMap coordinates={property?.coordinates} />
          </div>
          
          {/* Location Info */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 border border-blue-700">
            <h3 className="text-lg font-semibold text-white mb-3">Address Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-200">City:</span>
                <span className="font-medium text-white">{property?.location?.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">State:</span>
                <span className="font-medium text-white">{property?.location?.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Pincode:</span>
                <span className="font-medium text-white">{property?.location?.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Coordinates:</span>
                <span className="font-medium text-white text-sm">
                  {property?.coordinates?.latitude?.toFixed(4)}, {property?.coordinates?.longitude?.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Section - Full Width */}
      <div className="mb-8">
        <AmenitiesSection amenities={Anemities} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Contact Agent
        </button>
        <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
          Schedule Visit
        </button>
        <button className="flex-1 border-2 border-gray-600 hover:border-gray-500 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
          Save Property
        </button>
      </div>
    </div>
  );
};

export default SpecificProperty;