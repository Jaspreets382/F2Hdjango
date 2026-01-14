import { useContext,useState } from "react"
import { MapPin, CreditCard, ChevronLeft,ChevronRight, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../Context/CartContext"
import { createOrder, addOrderItem } from "../services/buyerServices"

function Checkout() {
    const { cart, clearCart } = useContext(CartContext)
    const [paymentMethod, setPaymentMethod] = useState('card');
    const navigate = useNavigate()

    const placeOrder = async () => {
        if(cart.length!=0){
        const order = await createOrder()
        console.log(order)

        for (let item of cart) {
            const set= await addOrderItem(order.id, item)

        }
        console.log("Order Placed")
        clearCart()
        navigate('/history')
    }
    else{
        alert("your cart is empty")
    }
}
const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    
return(

    <div className="min-h-screen bg-[#fdfcf7] pt-24 pb-12 px-6">
        <button className='inline-block rounded-2xl fixed left-2 top-4 z-50 bg-green-500' onClick={() => navigate('/cart')}><ChevronLeft size={40} strokeWidth={3} stroke='white' /></button>

      {/* Background Artistic Blobs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
       
        <div className="lg:col-span-2 space-y-8">
          <header>
            <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-2">Checkout</h1>
            <p className="text-slate-500 font-bold flex items-center gap-2">
              <Leaf size={18} className="text-green-600" /> Secure farm-to-home transaction
            </p>
          </header>

        
          <section className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-green-900/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 text-green-700 rounded-2xl">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Shipping Address</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold" />
              <input type="text" placeholder="Phone Number" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold" />
              <input type="text" placeholder="Street Address" className="md:col-span-2 w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold" />
              <input type="text" placeholder="City" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold" />
              <input type="text" placeholder="Pincode" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold" />
            </div>
          </section>

          {/* 2. Payment Method Section */}
          <section className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-green-900/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                <CreditCard size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Payment Method</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`p-6 rounded-4xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'card' ? 'border-green-500 bg-green-50/50' : 'border-slate-100 bg-white'}`}
              >
                <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'card' ? 'border-green-600 bg-white' : 'border-slate-200'}`} />
                <span className="font-black text-slate-700 text-lg">Online Payment / UPI</span>
              </button>
              
              <button 
                onClick={() => setPaymentMethod('cod')}
                className={`p-6 rounded-4xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50/50' : 'border-slate-100 bg-white'}`}
              >
                <div className={`w-6 h-6 rounded-full border-4 ${paymentMethod === 'cod' ? 'border-green-600 bg-white' : 'border-slate-200'}`} />
                <span className="font-black text-slate-700 text-lg">Cash on Delivery</span>
              </button>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
              {/* Artistic leaf overlay */}
              <Leaf className="absolute -bottom-10 -right-10 text-white/15 w-40 h-40 rotate-12"  />
              
              <h3 className="text-2xl font-black mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400 font-bold">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-bold">
                  <span>Delivery Fee</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-green-400">₹{total}</span>
                </div>
              </div>

              <button 
                className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-4xl font-black text-xl transition-all shadow-xl shadow-green-900/20 active:scale-95 flex items-center justify-center gap-2 group"
                onClick={placeOrder}
              >
                Place Order <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>

              <div className="mt-8 flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck size={16} className="text-green-500" />
                100% Quality Guaranteed
              </div>
            </div>

            <div className="bg-white/50 border border-white p-6 rounded-4xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <Truck className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">Express Delivery</p>
                <p className="text-xs font-bold text-slate-500">Arrives within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Checkout
