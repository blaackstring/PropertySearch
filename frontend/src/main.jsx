import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Property from './pages/Property.jsx'
import PropertyProvider from './contexApi/PropDetails.jsx'
import Details from './pages/Details.jsx'


const router=createBrowserRouter([
  {
  path: '/',
  element: <App />,
  children: [
   {
    path: '/',
    element: <Property/>
   }
   ,  {
    path: '/property/:id',
    element: <Details/>
   }
  ],
}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
<PropertyProvider >
    <RouterProvider router={router}/>
</PropertyProvider>
   
  </StrictMode>,
)
