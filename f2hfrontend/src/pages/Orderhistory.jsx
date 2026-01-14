import React, { useContext, useEffect, useState } from 'react'
import { cancelOrder, orderHistory } from '../services/buyerServices'
import { AuthContext } from '../Context/AuthContext'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../Context/Loading'

function Orderhistory() {
    const [history, setHistory] = useState([])
    const [error, setError] = useState(null)
    const { user } = useContext(AuthContext)
    const {startLoading,stopLoading}=useLoading()
    const navigate =useNavigate()

    useEffect(() => {
        const gethistory = async () => {
            try {
                startLoading()
                const orders = await orderHistory()
                setHistory(orders)
            } catch (error) {
                setError(error)
            }
            finally{
                setTimeout(() => {
                    stopLoading()
                }, 1500);
            }
        }
        gethistory()
    }, [])

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId)
            setHistory(prev => prev.map(order => order.id == orderId ?
                {
                    ...order,
                    items: order.items.map(item =>
                        (item.status == "PENDING" || item.status == "CONFIRMED")
                            ? { ...item, status: "CANCELLED" }
                            : item
                    )
                } : order))
        } catch (err) {
            setError(err)
        }
    }

    return (
        
        <div className='bg-[#F8FAFC] min-h-screen p-8'>
                    <button className='inline-block rounded-2xl fixed left-2 top-4 z-50 bg-green-500' onClick={()=>navigate('/')}><ChevronLeft size={40} strokeWidth={3} stroke='white'/></button>

            {/* Page Header */}
            <div className="relative py-12 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-100 rounded-full blur-[100px] opacity-50 -z-10"></div>
                <h1 className="text-6xl font-black mb-4 bg-linear-to-r from-green-800 to-green-500 bg-clip-text text-transparent">
                    Your Orders
                </h1>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">Track and manage your fresh deliveries</p>
            </div>

            <div className="max-w-6xl mx-auto space-y-12 pb-20">
                {history.map(order => {
                    const isAllCancelled = order.items.every(item => item.status === "CANCELLED");

                    return order.items.length !== 0 && (
                        <div
                            key={order.id}
                            className={`relative bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-white p-8 transition-all duration-500 ${isAllCancelled ? 'grayscale-[0.4] opacity-90' : ''}`}
                        >
                            {/* Decorative Corner Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/50 rounded-bl-[100px] z-0"></div>

                            {/* ORDER HEADER */}
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-50 pb-8 mb-8">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                        Order <span className="text-green-600">#{order.id}</span>
                                    </h3>
                                    <p className="text-slate-400 text-sm font-bold mt-1">PLACED ON {order.created_at.split("T")[0]}</p>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-xs font-black text-slate-600 uppercase tracking-tighter">Total Amount</p>
                                        <p className="text-3xl font-black text-slate-800">₹{order.total_price}</p>
                                    </div>

                                    {order.items.some(item => item.status !== "CANCELLED"&& item.status!=='DELIVERED') ? (
                                        <button
                                            onClick={() => handleCancelOrder(order.id)}
                                            className="font-black bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-2xl transition-all shadow-lg shadow-red-100 active:scale-95 cursor-pointer text-sm"
                                        >
                                            Cancel Order
                                        </button>
                                    ) : (
                                        order.items.some(item => item.status !== "DELIVERED") ? (<span className="text-red-500 font-black text-sm uppercase tracking-widest bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
                                            Order Cancelled
                                        </span>) : (<span className="text-green-500 font-black text-sm uppercase tracking-widest bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
                                            Order Delivered
                                        </span>)
                                        

                                    )}
                                </div>
                            </div>
                            <hr />
                            <br />

                            {/* ORDER ITEMS GRID */}
                            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {order.items.map(item => (
                                    <div
                                        key={item.id}
                                        className="group border border-slate-50 rounded-4xl p-6 bg-sky-200/30 hover:bg-white hover:shadow-xl hover:border-white transition-all duration-300"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 font-black">
                                                {item.product_name[0].toUpperCase()}
                                            </div>
                                            <span
                                                className={`px-4 py-1.5 text-[10px] rounded-full font-black uppercase tracking-widest
                                                ${item.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                                                        item.status === "CANCELLED" ? "bg-slate-200 text-slate-500" :
                                                            "bg-amber-100 text-amber-700"}`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>

                                        <h4 className="font-black text-slate-800 text-lg capitalize">{item.product_name}</h4>

                                        <div className="mt-4 space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400 font-medium">Quantity</span>
                                                <span className="text-slate-800 font-bold">{item.quantity_kg} kg</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400 font-medium">Unit Price</span>
                                                <span className="text-slate-800 font-bold">₹{item.price_at_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orderhistory