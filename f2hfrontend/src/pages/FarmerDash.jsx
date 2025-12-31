import React, { useEffect, useState } from 'react'
import { farmerDash } from '../services/farmerServices'

function FarmerDash() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    if (loading) return <h2>Loading DashBoard...</h2>
    if (error) return <h2>{error}</h2>

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                orders.map((orderData) => (
                    <div
                        key={orderData.id}
                        className="border p-4 mb-3 rounded-lg shadow flex flex-col w-3xs ml-4 ">
                        <span>Order id : {orderData.order_id}</span>
                        <span>Buyer Name : {orderData.buyer_name}</span>
                        <span>Product Name : {orderData.product_name}</span>
                        <span>Quantity : {orderData.quantity_kg} kg</span>
                        <span>Price : ₹{orderData.price_at_time}</span>
                        <span>Status : {orderData.status}</span>
                    </div>

                ))
            )}
        </>
    )
}

export default FarmerDash