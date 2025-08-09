import { useState } from "react";
import { Settings, X } from "lucide-react";

const Filter2 = ({ query, setQuery,handleApply,isExpanded,setIsExpanded }) => {
  

  // ✅ Add property types
  const propertyTypes = [
    { value: "Apartment", label: "Apartment" },
    { value: "Villa", label: "Villa" },
    { value: "Independent House", label: "Independent House" },
    { value: "Studio", label: "Studio" },
    { value: "Penthouse", label: "Penthouse" },
  ];


  

  const sortOptions = [
    { value: "price", label: "💰 Price" },
    { value: "listedDate", label: "📅 Date Listed" },
  ];

  const QueryHandleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };



  const handleReset = () => {
    setQuery({
      minPrice: 200000,
      maxPrice: "",
      propertyType: "",
      minBedrooms: "",
      sortBy: "",
      page: 1,
      limit: 20,
    });
  };

 

  return (
    <>
{   isExpanded&& <div className="fixed top-4 right-4 z-50 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700 w-80 max-w-[calc(100vw-2rem)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          
          <h3 className="font-semibold">Property Filters</h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Price Range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium text-slate-300">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={query.minPrice}
              onChange={QueryHandleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={query.maxPrice}
              onChange={QueryHandleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              placeholder="Any"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="text-sm font-medium text-slate-300">Property Type</label>
          <select
            name="propertyType"
            value={query.propertyType}
            onChange={QueryHandleChange}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">All Types</option>
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Min Bedrooms */}
        <div>
          <label className="text-sm font-medium text-slate-300">Min Bedrooms</label>
          <input
            type="number"
            name="minBedrooms"
            value={query.minBedrooms}
            onChange={QueryHandleChange}
            min={0}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="text-sm font-medium text-slate-300">Sort By</label>
          <select
            name="sortBy"
            value={query.sortBy}
            onChange={QueryHandleChange}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Default</option>
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Page & Limit */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium text-slate-300">Page</label>
            <input
              type="number"
              name="page" // ✅ Added name
              value={query.page}
              onChange={QueryHandleChange}
              min={1}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Limit</label>
            <input
              type="number"
              name="limit" // ✅ Added name
              value={query.limit}
              onChange={QueryHandleChange}
              min={5}
              max={50}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleReset}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 rounded-lg transition-all duration-200 text-sm font-medium shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>}

    </>  );
};

export default Filter2;
