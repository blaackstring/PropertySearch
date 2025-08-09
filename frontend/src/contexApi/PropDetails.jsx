import { createContext, useState } from "react";

 const  PropertyAPi=createContext({


})



const PropertyProvider=({children})=>{

const [property,setProperty]=useState([])
const [loading,setLoading]=useState(true)
const [SingleProperty,setSingleProperty]=useState({})
const [Anemities,setAnemities]=useState([])
const fetchProperty=async(filter)=>{
    setLoading(true)
  
    try {
        const filters=new URLSearchParams(filter)
        const data=await fetch(`/api/property/search?${filters??''}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json' 
            },
        }) 
        const response=await data.json()
        console.log(response,"response from property search");
        setProperty(response?.data)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.error("Error fetching property:", error);
    }
}






const fetchAnemities=async(id,lat,lon,filter='')=>{
    setLoading(true)
    try {
        const filters={
           ...filter,
            'lat':lat,
            'lon':lon
        }
console.log(filters);

        const params= new URLSearchParams(filters)
        const data=await fetch(`/api/property/${id}/nearby-amenities/?${params??''}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json' 
            },
        }) 
        const response=await data.json()
        console.log(response.newdata,"response from property search");
        setAnemities(response?.newdata)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.error("Error fetching property:", error);
    }
}


    return  ( <PropertyAPi.Provider value={{property,setProperty, loading,setLoading,fetchProperty,SingleProperty,setSingleProperty,fetchAnemities,Anemities}}>
        {children}
    </PropertyAPi.Provider>)
}

export {PropertyAPi,PropertyProvider}

export default PropertyProvider

  