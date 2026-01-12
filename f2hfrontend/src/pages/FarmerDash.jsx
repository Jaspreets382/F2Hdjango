import React, { useContext, useEffect, useState } from 'react'
import { changeStatus, farmerDash } from '../services/farmerServices'
import { AuthContext } from '../auth/AuthContext'
import { Link } from 'react-router-dom'
import { FaFirstOrderAlt } from 'react-icons/fa'
import DashSummary from './DashSummary'
import {MdArrowForward}from 'react-icons/md'
import {GiCrossMark}from 'react-icons/gi'

function FarmerDash() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useContext(AuthContext)
    const [summary,setSummary]=useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await farmerDash()
                console.log(data)
                setOrders(data)
            }
            catch (error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleStatus = async (itemId, status) => {
        try {
            const updateStatus = await changeStatus(itemId, status)
            setOrders(prevOrders => prevOrders.map(order => order.id == itemId ?
                { ...order, status: updateStatus.status }
                : order))
            console.log(updateStatus.status)
        }
        catch (error) {
            console.log(error)
        }

    }
    const handleSummary=()=>{
        setSummary(!summary)
    }


    if (loading) return <h2>Loading DashBoard...</h2>
    if (error) return <h2>{error}</h2>

    return (
        <>
            <header className="relative py-10 px-6 text-center overflow-hidden rounded-3xl mb-8">
                {/* Background Blobs for the Header */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-40 -z-10"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-40 -z-10"></div>

                <h1 className="text-5xl font-black tracking-tight bg-linear-to-r from-green-700 via-green-600 to-teal-500 bg-clip-text text-transparent">
                    Farmer Dashboard
                </h1>
                <p className="mt-3 text-gray-500 font-medium max-w-2xl mx-auto">
                    Manage your daily harvests, track incoming orders, and connect with your local community.
                    <span className="text-green-600 font-bold block mt-1 italic">"Freshness delivered, trust grown."</span>
                </p>
            </header>

            <div className="flex gap-20 justify-evenly">
                {/* Left Section: Visual & Quick Stats */}
                <section className="lg:col-span-5 flex flex-col gap-6  ">
                    <div className="relative group overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl transition-all hover:shadow-green-100">
                        {/* Main Brand Image */}
                        <img
                            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
                            alt="Fresh Farm"
                            className="w-full h-80 object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Floating Overlay Badge matching your UI style */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500 rounded-xl text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Growth Tracker</p>
                                    <h4 className="text-lg font-black text-gray-800">12% Increase this week</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation / Summary Link styled as a Button */}
                    <button
                        onClick={handleSummary}
                        className="flex items-center justify-between p-6 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-green-200 group"
                    >
                        <span>View Sales Summary</span>
                        <span className="group-hover:translate-x-2 transition-transform">{summary?(<GiCrossMark/>):(<MdArrowForward/>)}</span>
                    </button>
                    {summary?(<DashSummary/>):(null)}
                </section>
                <section className='grid grid-cols-2 max-h-140 mb-10 overflow-y-auto overflow-x-hidden'>
                    {orders.length === 0 ? (
                        <p>No orders yet</p>
                    ) : (
                        orders.map((orderData) => (
                            <div
                                key={orderData.id}
                                className="relative  border border-gray-100 p-6 m-4 rounded-2xl shadow-xl shadow-gray-200/50 flex flex-col w-sm max-w-md bg-white transition-transform hover:scale-[1.02]"
                            >
                                {/* Decorative Background Blobs - Reflecting landing page style */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                                {/* Header Section */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Order Details</span>
                                        <span className="flex gap-2 items-center font-bold text-gray-800">
                                            <FaFirstOrderAlt className="text-green-600" /> #{orderData.order_id}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Customer</span>
                                        <span className="font-semibold text-gray-700">{orderData.buyer_name}</span>
                                    </div>
                                </div>

                                {/* Product Info Section */}
                                <div className="bg-gray-50/50 rounded-2xl p-4 mb-6 border border-gray-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xl font-black text-gray-800 capitalize leading-tight">
                                                {orderData.product_name}
                                            </span>
                                            <span className="text-sm font-medium text-gray-500 mt-1">
                                                Quantity: <span className="text-gray-800">{orderData.quantity_kg} kg</span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end justify-center">
                                            <span className="text-2xl font-black text-green-600">
                                                ₹{orderData.price_at_time}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Action Section */}
                                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200">
                                    <div className="flex flex-col">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${orderData.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                orderData.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {orderData.status}
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <select
                                            className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm font-bold text-gray-700 focus:border-green-500 focus:outline-none cursor-pointer transition-colors"
                                            value={orderData.status}
                                            onChange={e => handleStatus(orderData.id, e.target.value)}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="CONFIRMED">Confirm</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancel</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    )}</section>
            </div>


        </>
    )
}

export default FarmerDash