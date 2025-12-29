import React from 'react'
import { Search, Vegan } from 'lucide-react'

function Navbar() {
    return (
<> 
        <nav className='fixed top-0 w-full z-50 glass shadow-sm transition-all duration-300 backdrop-blur-2xl'>
            <div className=' flex items-center align-middle mx-16 '>

            <div className="logo gap-2 flex h-18 items-center mx-4 ">
             <div class="w-10 h-10 bg-green-600 rounded-tr-lg rounded-bl-lg flex items-center justify-center text-white">
                                        <Vegan size={28}></Vegan>
                                    </div>
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
                <input className=' rounded-2xl m-1  focus:outline-none  caret-green-300 text-sm '  type="text" placeholder='Search' />
            </div>

            <div className=" login m-4 font-bold hover:shadow-[0_0_20px_rgba(107,205,230,0.7)] hover:bg-sky-300 hover:text-white duration-500 rounded-4xl p-2 ">
                <a href="">Login</a>
            </div>
            <div className="register  rounded-full m-4 p-2  font-bold hover:border-none hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] hover:bg-green-300 hover:text-white duration-500  " >
                <a className="p-2" href="" >Get Started</a>
            </div>
        </div>
        </nav>
        </>
    )
}

export default Navbar