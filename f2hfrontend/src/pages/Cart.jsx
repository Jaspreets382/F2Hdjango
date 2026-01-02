import { useContext } from "react"
import { CartContext } from "../auth/CartContext"
import { useNavigate } from "react-router-dom"

function Cart() {
    const { cart, removeFromCart } = useContext(CartContext)
    const navigate = useNavigate()
    console.log(cart)
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <>
            <h1 className="text-xl font-bold">Cart</h1>

            {cart.map(item => (
                <div key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.quantity} kg</span>
                    <span>₹{item.price * item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}

            <h3>Total: ₹{total}</h3>

            <button
                className="bg-blue-500 text-white p-2"
                onClick={() => navigate("/checkout")}
            >
                Checkout
            </button>
        </>
    )
}

export default Cart
