

    import { useContext, useState } from "react";
    import { MapPin, Settings, X } from "lucide-react";
import { PropertyAPi } from "../contexApi/PropDetails";

    const Filter = () => {
 const { property, setProperty, loading,SingleProperty, setLoading, fetchAnemities,Anemities } = useContext(PropertyAPi)
    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState({
        radius: 5000,
        type: "",
       limit: 20,
    });

      const QueryHandleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };


    const amenityTypes = [
        { value: "restaurant", label: "🍽️ Restaurant" },
        { value: "school", label: "🏫 School" },
        { value: "hospital", label: "🏥 Hospital" },
        { value: "gym", label: "💪 Gym" },
        { value: "bank", label: "🏦 Bank" },
        { value: "shopping_mall", label: "🛒 Mall" },
        { value: "bus_station", label: "🚌 Bus Stop" },
    ];

    const handleApply = async() => {
       console.log(SingleProperty);
       
        await fetchAnemities(SingleProperty?._id,SingleProperty.coordinates?.latitude,SingleProperty?.coordinates?.longitude,query)
        setIsExpanded(false);
    };

    const handleReset = () => {
       setQuery({
        radius: 5000,
        type: "",
       limit: 20,
    })
      
    };

    const formatRadius = (value) => {
        return value >= 1000 ? `${(value / 1000).toFixed(1)}km` : `${value}m`;
    };

    if (!isExpanded) {
        return (
        <div className="fixed top-4 right-4 z-50">
            <button
            onClick={() => setIsExpanded(true)}
            className="bg-slate-900/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-all duration-200 border border-slate-700"
            >
            <Settings size={20} />
            </button>
        </div>
        );
    }

    return (
        <div className="fixed top-4 right-4 z-50 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700 w-80 max-w-[calc(100vw-2rem)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
            <Settings size={18} className="text-blue-400" />
            <h3 className="font-semibold">Filters</h3>
            </div>
            <button
            onClick={() => setIsExpanded(false)}
            className="text-slate-400 hover:text-white transition-colors"
            >
            <X size={18} />
            </button>
        </div>

        <div className="p-4 space-y-4">
            {/* Radius Slider */}
            <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Search Radius</label>
                <span className="text-sm text-blue-400 font-mono">{formatRadius(query.radius)}</span>
            </div>
            <input
                type="range"
                name='radius'
                value={query.radius}
                onChange={(e) => QueryHandleChange(e)}
                min={1000}
                max={10000}
                step={200}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-500">
                <span>500m</span>
                <span>10km</span>
            </div>
            </div>

            {/* Type Selection */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Place Type</label>
           <div className="relative">
  <select
    name="type"
    value={query.type}
    onChange={(e) =>
      QueryHandleChange(e)
    }
    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2.5 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none appearance-none cursor-pointer"
  >
    {amenityTypes.map((t) => (
      <option
        key={t.value}
        value={t.value}
        className="bg-slate-800"
      >
        {t.label}
      </option>
    ))}
  </select>
</div>

            </div>

            {/* Limit */}
            <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Results Limit</label>
                <span className="text-sm text-blue-400 font-mono">{query.limit}</span>
            </div>
            <input
                type="range"
                name="limit"
                value={query.limit}
                  onChange={(e) => QueryHandleChange(e)}
                min={4}
                max={25}
                step={5}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-500">
                <span>5</span>
                <span>50</span>
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

        <style jsx>{`
            .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid #1e293b;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            
            .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid #1e293b;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
        `}</style>
        </div>
    );
    };

    export default Filter;

