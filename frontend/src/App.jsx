
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/rootComponents/Header'
import Footer from './Components/rootComponents/Footer'
import Filter from './Components/Filter'
import { useContext, useEffect } from 'react'
import { PropertyAPi } from './contexApi/PropDetails'

function App() {
    const { property, setProperty, loading, setLoading, fetchProperty } = useContext(PropertyAPi)
    useEffect(() => {
        (async () => {
          setProperty([])
            try {
        const data=await fetch(`/api/property/search?limit=10`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json' 
            },
        }) 
        const response=await data.json()
        console.log(response,"response from property search");
        setProperty(response.data)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.error("Error fetching property:", error);
    }
        })();
    }, [])

  return (
  <div className='w-full min-h-screen bg-black'>
    <Header/>
    
        <main className="flex min-h-screen" >
        <Outlet />
      </main>
   <div className='w-full relative bottom-0 '>
     <Footer/>
   </div>
  </div>
  )
}

export default App
