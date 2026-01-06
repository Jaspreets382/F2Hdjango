import React, { forwardRef,useState} from 'react'
import { Sprout, ShoppingBasket, Handbag } from 'lucide-react'
import Register from '../pages/Register'
const CTA=forwardRef(({handleRegister=()=>{}},ref)=>{
    

    return (
        <>
        


            <section className="py-20 relative overflow-hidden">

                <div className="absolute inset-0 bg-green-900"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center reveal">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Ready to revolutionize agriculture?</h2>
                    <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">Join thousands of farmers and buyers experiencing the future of fresh food distribution today.</p>

                    <div ref={ref} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={()=>handleRegister(true)} className="flex gap-2 px-8 py-4 bg-white text-green-700 rounded-full font-bold hover:bg-orange-500 hover:text-white transition shadow-black shadow-2xl hover:shadow-none  hover:-translate-y-5 duration-500">
                            <Sprout />
                            Join as a Farmer
                        </button>
                        <button onClick={()=>handleRegister(false)} className="flex gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full shadow-2xl shadow-black/80 font-bold hover:bg-green-500 transition duration-500 hover:shadow-none hover:-translate-y-5">
                            <ShoppingBasket />
                            Join as a Buyer
                        </button>

                    </div>
                </div>
            </section>
        </>
    )
})

export default CTA