import React from 'react'

function Hero() {
    return (

        <>
            <section>
                <div className="right-section ml-4">
                    <div className='inline-block px-4 py-1 rounded-full bg-green-50 text-green-600 font-semibold text-sm mb-6 border border-green-100'>
                        <span> Direct Farm-to-Table Connection</span>
                    </div>
                    <h1 className=' text-5xl lg:text-7xl font-bold leading-tight mb-6'>Freshness
                        <br />
                        <span className="bg-linear-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">Delivered Daily</span>
                    </h1>
                    <p class="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Farm2Home connects farmers directly to buyers. No middlemen, just fresh, organic produce and robust role-based management powered by Django.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="#" class="px-8 py-4 bg-green-600 text-white rounded-full font-bold shadow-lg shadow-green-500/30 hover:bg-green-700 hover:scale-110 transition ease-in">
                            Find Produce
                        </a>
                        <a href="#" class="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-bold hover:bg-orange-400 hover:text-white hover:shadow-orange-500 shadow-lg hover:border-orange-5  00 transition ease-in flex items-center justify-center gap-2">
                            <i class="fa-solid fa-tractor"></i> Sell Your Crops
                        </a>
                        </div>
                        <div class="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                        <div class="flex items-center gap-2">
                            <div class="flex -space-x-2">
                                <img class="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User"/>
                                <img class="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User"/>
                                <img class="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" alt="User"/>
                            </div>
                            <span>2k+ Happy Farmers</span>
                        </div>
                        <div class="h-8 w-px bg-gray-300"></div>
                        <div class="flex items-center gap-1 text-yellow-500">
                            <i class="hgi hgi-stroke hgi-star"></i>
                            <i class="hgi hgi-stroke hgi-star"></i>
                            <i class="hgi hgi-stroke hgi-star"></i>
                            <i class="hgi hgi-stroke hgi-star"></i>
                            <i class="hgi hgi-stroke hgi-star"></i>
                            <span class="text-gray-600 ml-1">4.9/5</span>
                        </div>
                        </div>
                </div>
            </section>
        </>
    )
}

export default Hero