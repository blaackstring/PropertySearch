import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='w-full bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
          {/* Company Info */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-xl font-bold mb-2'>PropertySearch</h3>
            <p className='text-gray-300 mb-3'>
              Find your perfect stay with the most comprehensive property search platform. 
            </p>
            <div className='flex space-x-4'>
              <a href="#" aria-label="Twitter" className='text-gray-400 hover:text-white transition-colors'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className='text-gray-400 hover:text-white transition-colors'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.622h-3.123V24h6.116C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z'/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className='text-gray-400 hover:text-white transition-colors'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.75 1.5a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z'/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link to="/about" className='text-gray-400 hover:text-white transition-colors'>About Us</Link>
              </li>
              <li>
                <Link to="/contact" className='text-gray-400 hover:text-white transition-colors'>Contact</Link>
              </li>
              <li>
                <Link to="/terms" className='text-gray-400 hover:text-white transition-colors'>Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className='text-gray-400 hover:text-white transition-colors'>Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-4'>Contact</h4>
            <p className='text-gray-400'>123 Main Street</p>
            <p className='text-gray-400'>City, State, ZIP</p>
            <p className='text-gray-400'>Email: support@hotelsearch.com</p>
            <p className='text-gray-400'>Phone: (123) 456-7890</p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
