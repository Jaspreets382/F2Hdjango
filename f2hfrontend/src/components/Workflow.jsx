import React from 'react'
import { Sprout,ShoppingBasket,Package } from 'lucide-react'
function Workflow() {
  return (
<>
    <section id="how-it-works" class="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 reveal">
                <h2 className="text-green-600 font-bold tracking-wide uppercase text-sm mb-2" >Workflow</h2>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Farm2Home Works</h3>
                <p className="text-gray-600 text-lg">We simplify the agricultural supply chain with a seamless digital experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition relative group ">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition transform shadow-lg">
                        <Sprout size={28}></Sprout>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">1. Farmer Lists Produce</h4>
                    <p className="text-gray-600 leading-relaxed">Farmers create their profile, upload inventory details, and set prices using the secure role-based dashboard.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition relative group reveal" >
                    <div className="w-16 h-16 bg-amber-400 text-white DEFAULT rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition transform shadow-lg">
                        <ShoppingBasket size={28}></ShoppingBasket>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">2. Buyer Places Order</h4>
                    <p className="text-gray-600 leading-relaxed">Buyers browse fresh listings, compare prices, and place orders through the integrated REST API interface.</p>
                </div>

                
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition relative group reveal">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition transform shadow-lg">
                    <Package size={28}/>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">3. Delivery & Tracking</h4>
                    <p className="text-gray-600 leading-relaxed">Real-time item-level status tracking updates both parties until the fresh produce arrives at the destination.</p>
                </div>
</div>
            </div>
</section>
</>
)
}

export default Workflow