import { createContext, useState } from "react"
import { useEffect } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart")
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart))
}, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p =>
          p.id === product.id
        ? { ...p, quantity: p.quantity + 1 }
        : p
      )
    }
    console.log([...prev, { ...product, quantity: 1 }])
    return [...prev, { ...product, quantity: 1 }]
  })
}

const decreaseQuantity=(product)=>{
  setCart(prev=>{
    const existing=prev.find(p=> p.id===product.id)
    if (existing){
      
      return prev.map(p=>
        p.id=== product.id&& product.quantity!=1?
        {...p,quantity:p.quantity-1}
        :p
      )
    }
  })
}

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart ,decreaseQuantity}}
    >
      {children}
    </CartContext.Provider>
  )
}
