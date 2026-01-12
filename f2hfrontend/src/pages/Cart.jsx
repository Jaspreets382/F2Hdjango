import { useContext } from "react"
import { CartContext } from "../auth/CartContext"
import { useNavigate } from "react-router-dom"
import { Navbar, Footer } from "../components"
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

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
            <div className="px-20 ">
                <div>
                    <h1 className="text-6xl font-bold p-6">Basket</h1>
                    <hr />  <br />
                </div>
                {cart.length!=0?( <div className="grid grid-cols-2 min-h-screen ">
                    <div >
                        {cart.map(item => (
                            <div className="flex border-2 rounded-2xl shadow-xl shadow-sky-100 hover:scale-103 hover:shadow-2xl ease-in-out duration-500 min-w-1/2 px-2 bg-gray-200/50 my-10 ">
                                <div className=" bg-gray-300">
                                    <img className="h-30 w-30 rounded-4xl" src={`http://127.0.0.1:8000${item.photo}`} alt="img" />
                                </div   >
                                <div className=" w-full flex justify-between px-4">
                                    <div className="flex flex-col" key={item.id}>

                                        <span className="text-2xl font-bold" >{item.name}</span>
                                        <span>₹{item.price}/kg</span>
                                        <div className="items-center flex gap-2 mt-7">
                                            <button className=" font-bold text-xl bg-sky-200 rounded-4xl w-max" onClick={() => decreaseQuantity(item)}><FaMinusCircle /></button>
                                            <span>{item.quantity} kg</span>
                                            <button className=" text-xl font-bold bg-sky-200 rounded-4xl w-max" onClick={() => addToCart(item)}><FaPlusCircle /></button>

                                        </div>

                                    </div>
                                    <div className="flex gap-10 text-end flex-col">
                                        <span className="max-w-10 text-xl font-bold">₹{item.price * item.quantity}</span>
                                        <button className="bg-red-600 text-white inline-block w-max p-2 rounded-4xl" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className=" max-h-70 border-2 rounded-4xl w-fit p-5 ml-50">
                        <h1 className="text-2xl font-bold pb-8 "> Summary</h1>
                        <div className="flex w-2xs justify-between pb-10">
                            <div>
                                <h3>Total Items:</h3>
                                <h3>Total:</h3>
                            </div>
                            <div>
                                <h3>{cart.length}</h3>
                                <h3>₹{total}</h3></div></div>
                        <button
                            className="bg-blue-500 text-white p-2"
                            onClick={() =>{ if(cart.length!=0)
                                { navigate("/checkout")}
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>):(
                    <div className="min-h-screen">
                        <h1>YOUR CART IS EMPTY</h1>
                    </div>                )}
               
            </div>
        </>
    )
}

export default Cart
