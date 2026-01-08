import { useContext } from "react"
import { CartContext } from "../auth/CartContext"
import { useNavigate } from "react-router-dom"
import { Navbar,Footer } from "../components"

function Cart() {
    const { cart, removeFromCart,addToCart,decreaseQuantity } = useContext(CartContext)
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
                <div className="flex flex-col" key={item.id}>
                    <span>{item.name}</span>
                    <div>
                        <button className="p-3 text-2xl font-bold bg-sky-200 rounded-4xl w-max" onClick={()=>addToCart(item)}>+</button>
                    <span>{item.quantity} kg</span>
                        <button className="p-3 font-bold text-2xl bg-sky-200 rounded-4xl w-max" onClick={()=>decreaseQuantity(item) }>-</button>
                        
</div>
                    <span>₹{item.price * item.quantity}</span>
                    <button className="bg-red-600 text-white inline-block w-max p-2" onClick={() => removeFromCart(item.id)}>Remove</button>

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
