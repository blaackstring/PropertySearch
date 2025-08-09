import { useContext, useEffect, useState } from "react";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Heart, 
  Share2, 
  Phone, 
  Eye,
  Star,
  Navigation,
  
} from "lucide-react";
import { PropertyAPi } from "../contexApi/PropDetails";
import Loader from "./rootComponents/Loader";
import { useNavigate } from "react-router-dom";
export const PropsCards = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
const {property,setProperty, loading,setLoading,fetchProperty,SingleProperty,setSingleProperty,fetchAnemities}=useContext(PropertyAPi)
const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState(1);
const [limit, setLimit] = useState(10);
const Navigate=useNavigate()


const[singleLoad,setSingleLoad]=useState(false)


const handleSingleProperty=async(item)=>{
   try {
     setSingleLoad(true)
   await fetchAnemities(item?._id,item?.coordinates.latitude,item?.coordinates.longitude    )

setSingleProperty(item)
Navigate(`/property/${item._id}`)
   } catch (error) {
    setSingleLoad(false)
    console.log('error while Fetching Amenties',error);
    
   }
}
const handlepage=(idx)=>{
    window.scrollTo({top:50, behavior: 'smooth'});
    setPage(idx+1)
}
useEffect(()=>{
    setPageCount(Math.ceil(property?.length / 10));

    console.log(property.length);
    
},[property])

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(0)}K`;
    }
    return `₹${price}`;
  };

  const formatArea = (area) => {
    return area?.toLocaleString('en-IN');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: prop.title,
        text: prop.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleViewOnMap = () => {
    const { latitude, longitude } = prop.coordinates;
    window.open(`https://maps.google.com/?q=${latitude},${longitude}`, '_blank');
  };

  // Generate a placeholder image based on property type
  const getPlaceholderImage = (prop) => {
    const images = {
      'Independent House': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop&crop=house',
      'Apartment': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop',
      'Villa': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=250&fit=crop',
      'Penthouse': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop'
    };
    return images[prop] || images['Independent House'];
  };

  return (
<>
{!loading?

<div className="">
<div className="min-w-[96vw] grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 p-6">

    {property?.slice((page-1)*limit,page*limit).map((item,idx)=>(
    <div key={idx} className="bg-gradient-to-b  from-purple-900/60 via-blue-600/20 to-black rounded-2xl    shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-md mx-auto border border-white/50 hover:-translate-y-10 hover:scale-101">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
        <img 
          src={getPlaceholderImage(item?.propertyType)}
          alt={item?.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Maximize className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white transition-all duration-200"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {item?.propertyType}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold text-lg">
            {formatPrice(item?.price)}
            <span className="text-xs font-normal opacity-90 ml-1">/month</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {item?.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-2 text-red-500 flex-shrink-0" />
          <span className="text-sm">
            {item?.location?.city}, {item?.location?.state} - {item?.location?.pincode}
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center text-gray-700">
            <Bed size={16} className="mr-1.5 text-blue-500" />
            <span className="text-sm font-medium">{item?.bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Bath size={16} className="mr-1.5 text-green-500" />
            <span className="text-sm font-medium">{item?.bathrooms} Baths</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Maximize size={16} className="mr-1.5 text-purple-500" />
            <span className="text-sm font-medium">{formatArea(item?.area)} sqft</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {item?.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 cursor-pointer  hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={()=>handleSingleProperty(item)}
          >
            Details
          </button>
     
        </div>

        {/* Rating & Views (Optional) */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-medium text-gray-700 ml-1">4.8</span>
            <span className="text-xs text-gray-500 ml-1">(24 reviews)</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Eye size={14} />
            <span className="text-xs ml-1">156 views</span>
          </div>
        </div>
      </div>
    </div>
))
    }

  
</div>
   <div className="w-[90vw] h-16 flex items-center justify-center ">
      <div className="rounded-2xl cursor-pointer bg-white border-1">
          {...Array.from({length:pageCount}).map((_,idx)=>(
            <button className={`m-1 p-2 cursor-pointer rounded-xl border-3 bg-white ${page===idx+1?'text-sky-600':''}`} onClick={()=>handlepage(idx)} key={idx}>
              {idx+1}
            </button>
        ))}
      </div>
    </div></div>
    :<>
    
    </>}

</>
  );
};

// Example usage with multiple properties


