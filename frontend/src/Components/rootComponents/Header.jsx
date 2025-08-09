
import React from 'react'
import Input from '../Input'
function Header() {
  return (
    <div className='w-full h-16  border-b-1 shadow-md shadow-neutral-500 flex items-center justify-around px-4'>
      <div>
        <h1 className='text-white text-2xl font-bold'>Property Search</h1>
        
      </div>
      <div className="input">
        <Input/>
      </div>

    
    </div>
  )
}

export default Header
