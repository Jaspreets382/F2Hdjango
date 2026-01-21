import { useContext } from "react"
import { CartContext } from "../Context/CartContext"
import { useNavigate } from "react-router-dom"
import { Navbar, Footer } from "../components"
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { ChevronLeft, Minus, Plus,Leaf,ChevronRight,ShieldCheck } from "lucide-react"

function Cart() {
    const { cart, removeFromCart, addToCart, decreaseQuantity } = useContext(CartContext)
    const navigate = useNavigate()

    console.log(cart)
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )


    return (
        <>
            <button className='inline-block rounded-2xl fixed left-2 top-4 z-50 bg-green-500' onClick={() => navigate('/products')}><ChevronLeft size={40} strokeWidth={3} stroke='white' /></button>

            <div className=" px-4 md:px-20 bg-amber-200/30 ">
                <div>
                    <h1 className="text-6xl font-bold p-6">Basket</h1>
                    <hr />  <br />
                </div>
                {cart.length != 0 ? (<div className="md:grid grid-cols-2 min-h-screen ">
                    <div >
                        {cart.map(item => (
                            <div className="relative flex items-center p-5 bg-amber-400/70 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-xl shadow-green-900/5 mb-6 group transition-all hover:-translate-y-1 ">
                                <div className="relative flex items-center w-auto">
                                    <img className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg" src={`http://127.0.0.1:8000${item.photo}`} alt="img" />
                            
                                </div   >
                                <div className=" w-full flex justify-between px-4">
                                    <div className="flex flex-col" key={item.id}>

                                        <span className="text-2xl font-bold capitalize tracking-tight" >{item.name}</span>
                                        <span className="text-slate-500 font-bold text-sm italic">₹{item.price}/kg</span>
                                        <div className="flex items-center gap-4 mt-4 bg-white/80 w-fit px-4 py-2 rounded-full border border-slate-100 shadow-inner">
                                            <button className=" text-slate-400 hover:text-green-600 transition-colors" onClick={() => decreaseQuantity(item)}><FaMinusCircle /></button>
                                            <span className="font-bold text-slate-800">{item.quantity} kg</span>
                                            <button className="text-slate-400 hover:text-green-600 transition-colors" onClick={() => addToCart(item)}><FaPlusCircle /></button>

                                        </div>

                                    </div>
                                    <div className="flex gap-10 text-end flex-col">
                                        <span className="text-2xl font-black text-green-700">₹{item.price * item.quantity}</span>
                                        <button className="bg-red-600 text-white inline-block w-max p-2 rounded-4xl font-bold border border-slate-100 shadow-inner" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="hidden md:block sticky top-32 lg:col-span-1 w-md mx-auto max-h-fit border-2 border-white shadow-2xl bg-slate-900 rounded-[3rem] p-8 text-white overflow-hidden group">
    {/* Artistic Background Accent */}
    <Leaf className="absolute -bottom-10 -right-10 text-white/5 w-40 h-40 rotate-12 transition-transform group-hover:rotate-45 duration-700 " />

    <h1 className="text-3xl font-black mb-8 tracking-tight">Order Summary</h1>

    <div className="space-y-6 mb-10">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Items</h3>
            <h3 className="text-xl font-black">{cart.length}</h3>
        </div>

        <div className="flex justify-between items-end">
            <div>
                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Grand Total</h3>
                <p className="text-xs text-green-400 font-bold tracking-tighter">Tax & Delivery included</p>
            </div>
            <h3 className="text-4xl font-black text-green-400 tracking-tighter">₹{total}</h3>
        </div>
    </div>

    <button
        className={`px-4 mx-auto py-2 rounded-4xl font-black text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group
            ${cart.length !== 0 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-900/20 cursor-pointer' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}
        `}
        onClick={() => {
            if (cart.length !== 0) { navigate("/checkout") }
        }}
        disabled={cart.length === 0}
    >
        Checkout 
        <ChevronRight className={`transition-transform duration-300 ${cart.length !== 0 ? 'group-hover:translate-x-2' : ''}`} />
    </button>

    <div className="mt-8 flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
        <ShieldCheck size={14} className="text-green-500" />
        Secure Transaction
    </div>
</div>

{/* Mobile version */}

            <div className="md:hidden lg:col-span-1 md:w-md mx-auto max-h-fit border-2 border-white shadow-2xl bg-slate-900 rounded-[3rem] p-8 text-white overflow-hidden group">
    {/* Artistic Background Accent */}
    <Leaf className="absolute -bottom-10 -right-10 text-white/5 w-40 h-40 rotate-12 transition-transform group-hover:rotate-45 duration-700 " />

    <h1 className="text-3xl font-black mb-8 tracking-tight">Order Summary</h1>

    <div className="space-y-6 mb-10">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Items</h3>
            <h3 className="text-xl font-black">{cart.length}</h3>
        </div>

        <div className="flex justify-between items-end">
            <div>
                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Grand Total</h3>
                <p className="text-xs text-green-400 font-bold tracking-tighter">Tax & Delivery included</p>
            </div>
            <h3 className="text-4xl font-black text-green-400 tracking-tighter">₹{total}</h3>
        </div>
    </div>

    <button
        className={`px-4 mx-auto py-2 rounded-4xl font-black text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group
            ${cart.length !== 0 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-900/20 cursor-pointer' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}
        `}
        onClick={() => {
            if (cart.length !== 0) { navigate("/checkout") }
        }}
        disabled={cart.length === 0}
    >
        Checkout 
        <ChevronRight className={`transition-transform duration-300 ${cart.length !== 0 ? 'group-hover:translate-x-2' : ''}`} />
    </button>

    <div className="mt-8 flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
        <ShieldCheck size={14} className="text-green-500" />
        Secure Transaction
    </div>
</div>
                </div> ) : (
                    <div className="min-h-screen">
                        <h1>YOUR CART IS EMPTY</h1>
                    </div>)}

            </div>




        </>
    )
}

export default Cart
