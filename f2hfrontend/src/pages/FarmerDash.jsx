import React, { useContext, useEffect, useState } from 'react'
import { changeStatus, farmerDash } from '../services/farmerServices'
import { AuthContext } from '../auth/AuthContext'
import { Link } from 'react-router-dom'

function FarmerDash() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useContext(AuthContext)

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
                        <label className="font-semibold mr-2">Status: {orderData.status}</label>
                        <select className='border-2'
                            value={orderData.status}
                            onChange={e => handleStatus(orderData.id, e.target.value)}>
                            
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirm</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="CANCELLED">Cancel </option>



                        </select>

                    </div>

                ))
            )}

            <Link to={'/dashboard/summary'}>Summary</Link>
        </>
    )
}

export default FarmerDash