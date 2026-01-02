import { useContext } from "react"
import { CartContext } from "../auth/CartContext"
import { createOrder, addOrderItem } from "../services/buyerServices"
import { useNavigate } from "react-router-dom"

function Checkout() {
    const { cart, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    const placeOrder = async () => {
        const order = await createOrder()
        console.log(order)

        for (let item of cart) {
            console.log(item)
            const set= await addOrderItem(order.id, item)
            console.log(set)
        }

        clearCart()
        // navigate('/history')
    }

    return (
        <button
            className="bg-green-500 text-white p-2"
            onClick={placeOrder}
        >
            Place Order
        </button>
    )
}

export default Checkout
