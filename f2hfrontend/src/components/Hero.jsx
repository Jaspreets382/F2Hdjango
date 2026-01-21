import React from 'react'
import { Star, Carrot, Truck, Tractor, CircleCheck,Salad } from 'lucide-react';
function Hero({scrollToSection}) {
    const handleRef=()=>{
    scrollToSection.current.scrollIntoView({
        behavior:'smooth',
    })
}
    return (

        <>
            <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
                <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 z-0 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left reveal">
                            <div className='inline-flex gap-2 items-center px-4 py-1 rounded-full bg-green-50 text-green-600 font-semibold text-sm mb-6 border border-green-100'>
                                <CircleCheck fill='green' stroke='white' size={18}/><span> Direct Farm-to-Table Connection</span>
                            </div>
                            <h1 className=' text-5xl lg:text-7xl font-bold leading-tight mb-6'>Freshness
                                <br />
                                <span className="bg-linear-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">Delivered Daily</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Farm2Home connects farmers directly to buyers. No middlemen, just fresh, organic produce and robust role-based management powered by Django.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                                <button onClick={handleRef} className=" flex gap-2 justify-center px-8 py-4 bg-green-600 text-white rounded-full font-bold shadow-lg shadow-green-500/30 hover:bg-green-700 hover:scale-110 transition ease-in-out duration-450  ">
                                <Salad stroke='white'></Salad>  Find Produce
                                </button>
                                <button onClick={handleRef} className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-bold hover:bg-orange-400 hover:text-white hover:shadow-orange-500 shadow-lg hover:border-orange-5  00 transition ease-in duration-300 flex items-center justify-center gap-2 z-10">
                                    <Tractor size={28}/> Sell Your Crops
                                </button>
                            </div>
                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                                        <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="User" />
                                    </div>
                                    <span className='animate-testMove cursor-pointer'>2k+ Happy Farmers</span>
                                </div>
                                <div className="h-8 w-px bg-gray-300"></div>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star color='#ff9500' fill='#ff9500' ></Star>
                                    <Star color='#ff9500' fill='#ff9500' ></Star>
                                    <Star color='#ff9500' fill='#ff9500' ></Star>
                                    <Star color='#ff9500' fill='#ff9500' ></Star>
                                    <Star color='#ff9500' fill='#ff9500' ></Star>
                                    <span className="text-gray-600 ml-1">4.9/5</span>
                                </div>
                            </div>
                        </div>
                        {/* floating card */}
                        <div className="relative lg:h-150 flex items-center justify-center reveal animation-delay-200">
                            <div className="absolute top-10 left-0 z-20 bg-white p-4 rounded-2xl shadow-xl animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-primary-600 text-xl">
                                        <Carrot fill='#17b401' stroke='white' strokeWidth={0.5} size={28}/>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Fresh Order</p>
                                        <p className="font-bold text-gray-800">Organic Carrots</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-20 right-0 z-20 bg-white p-4 rounded-2xl shadow-xl animate-float animation-delay-2000">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xl">
                                        <Truck fill='orange'/>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <p className="font-bold text-green-600">On the way</p>
                                    </div>
                                </div>
                            </div>

                            {/* hero image */}
                            <div className="relative w-full h-100 lg:h-125 rounded-[3rem] overflow-hidden shadow-2xl  shadow-sky-500/50 border-4 border-white transform -rotate-3 hover:rotate-3 transition duration-600 ">
                                <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Fresh vegetables farming" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                            </div>
                        </div>

                    </div>
                </div>


            </section>
        </>
    )
}

export default Hero