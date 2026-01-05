import React, { useContext, useEffect, useState } from 'react'
import { cancelOrder, orderHistory } from '../services/buyerServices'
import { AuthContext } from '../auth/AuthContext'

function Orderhistory() {
    const [history, setHistory] = useState([])
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    const { user } = useContext(AuthContext)


    useEffect(() => {
        const gethistory = async () => {
            try {
                const orders = await orderHistory()
                setHistory(orders)
            }
            catch (error) {
                setError(error)
            }
        }
        gethistory()
    }, [])

    const handleCancelOrder = async (orderId) => {
        try {
            const cancel = await cancelOrder(orderId)
            console.log(cancel.message)
            setHistory(prev=>prev.map(order=>order.id==orderId?
              {...order, items: order.items.map(item=>item.status=="PENDING"||item.status=="CONFIRMED"?{...item,status:"CANCELLED"}:item)
        }:order))
        }
        catch (err) {
            setError(err)
        }
    }

    return (

        <>
            <h1 className='text-4xl font-bold text-center mb-10'>Orders</h1>
            {history.map((order) => (
                order.items.length!=0?(
                <div className='w-5xl border-2 mb-10 m-10 p-4 rounded-4xl'>
                    <div key={order.id} className="border p-4 mb-4 rounded-4xl flex justify-between">
                        <h3>Order #{order.id}</h3>
                        <div >
                            <p className='font-bold text-lg'>Total: ₹{order.total_price}</p>
                        <button className='p-2 bg-red-500 text-white rounded-3xl' onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                        </div>

                    </div>
                    <div className="grid grid-cols-3 gap-2  ml-4">
                        {order.items.map((item) => (
                            <div className='border-2 rounded-4xl w-fit p-4 m-5' key={item.id}>
                                <p> Item : {item.product_name}</p>
                                <p>Quantity: {item.quantity_kg}</p>
                                <p>Price : ₹{item.price_at_time}</p>
                                <p>Status : {item.status}</p>

                            </div>
                        ))}
                    </div>
                    


                </div>):(<></>)
            ))}
        </>)
}

export default Orderhistory