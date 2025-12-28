import React from 'react'
import { Search, Vegan } from 'lucide-react'

function Navbar() {
    return (
<> 
        <nav className='fixed top-0 w-full z-50 glass shadow-sm transition-all duration-300 backdrop-blur-2xl'>
            <div className=' flex items-center align-middle mx-16 '>

            <div className="logo gap-2 flex h-18 items-center mx-4 ">
            <Vegan/>
            <span class="font-display font-bold text-4xl tracking-tight text-gray-900">Farm2<span class="text-green-600">Home</span></span>
            </div>

            <div className="nav-buttons mx-auto">
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>Home</a>
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>Features</a>
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>How It Works</a>
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>Products</a>
            </div>

            <div className="flex items-center border-2 rounded-4xl  search">
                <Search className='ml-2'/>
                <input className=' rounded-2xl m-1 ' type="text" placeholder='Search' />
            </div>

            <div className=" login m-4 font-bold ">
                <a href="">Login</a>
            </div>
            <div className="register border-2 rounded-full m-4 p-2 bg-green-600 text-white font-bold " >
                <a className="p-2" href="" >Get Started</a>
            </div>
        </div>
        </nav>
        </>
    )
}

export default Navbar