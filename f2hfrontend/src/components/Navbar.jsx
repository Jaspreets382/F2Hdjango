import React from 'react'

function Navbar() {
    return (
<> 
        <nav className='drop-shadow-xl bg-white/70 backdrop-blur-lg  mx-auto w-7xl '>
            <div className=' flex items-center align-middle mx-auto '>

            <div className="logo flex h-18 items-center mx-4 ">
            <img src="random" alt="logo"/>
            <span class="font-display font-bold text-2xl tracking-tight text-gray-900">Farm2<span class="text-green-600">Home</span></span>
            </div>

            <div className="nav-buttons mx-auto">
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>Home</a>
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>Features</a>
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>How It Works</a>
                <a href="" className='rounded-md px-3 py-2 text-m font-medium text-gray-600'>Products</a>
            </div>

            <div className="search">
                <i>O</i>
                <input className='border-2 rounded-2xl m-2' type="text" placeholder='Search' />
            </div>

            <div className="login m-4 font-bold ">
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