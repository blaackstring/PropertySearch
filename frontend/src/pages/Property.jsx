
import { PropsCards } from '../Components/PropsCards'
import Filter2 from '../Components/Filter2'
import { useContext, useEffect, useState } from 'react';
import { PropertyAPi } from '../contexApi/PropDetails';
import { Expand, Settings, X } from "lucide-react";
import Loader from '../Components/rootComponents/Loader';

function Property() {
    const { property, setProperty, loading, setLoading, fetchProperty } = useContext(PropertyAPi)



    const [query, setQuery] = useState({
        minPrice: 200000,
        maxPrice: "",
        propertyType: "",
        minBedrooms: "",
        sortBy: "",
        page: 1,
        limit: 20,
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const handleApply = async () => {
        try {
            console.log('jhvjh');
            await fetchProperty(query);
            setIsExpanded(false);
        } catch (error) {
            console.log('error in fetching property:', error);
            setIsExpanded(false);
        }
    };


    return <>


        {!loading ? <div className="filter  w-full  ">

            {!isExpanded ? <>
                <div className="fixed top-4 right-4 z-50">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="bg-slate-900/90 backdrop-blur-sm cursor-pointer text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition-all duration-200 border border-slate-700"
                    >
                        <Settings size={20} />
                    </button>

                </div></> : <Filter2 query={query} setQuery={setQuery} handleApply={handleApply} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />}



            <div className="prop grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
             
                    <PropsCards  />
             
            </div>
        </div> : <div className='flex justify-center items-center h-screen w-full'>
            <Loader />
        </div>}
    </>

}

export default Property
