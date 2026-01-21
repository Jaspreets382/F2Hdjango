import React, { useState, useEffect, useContext } from 'react'
import { deleteProduct, getProducts } from '../services/productService'
import ProductForm from '../components/ProductForm'
import { createProduct, updateProduct } from '../services/productService'
import { AuthContext } from '../Context/AuthContext'
import { CartContext } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import { IoIosCart } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { ChevronLeft, ShoppingBag, Leaf } from 'lucide-react'
import { useLoading } from '../Context/Loading'
import { motion } from 'framer-motion'


function Products() {
  const [products, setProducts] = useState([])
  const { startLoading, stopLoading } = useLoading()
  const [addedProducts, setAddedProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(null)
  const { user } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()



  useEffect(() => {
    
    const func = async () => {
      startLoading()
      if (!user) {
      navigate('/login')
      setTimeout(() => {
        stopLoading()
      }, 700);
    }
      const list = await getProducts()
      setTimeout(() => {
        stopLoading()
      }, 1500);
      setProducts(list)
    }
    func()
  }, [user])

  useEffect(() => {
    if (!showForm) return

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowForm(false)
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [showForm])

  const handleDelete = async (productId) => {
    await deleteProduct(productId)
    setProducts(prev => prev.filter(product => product.id != productId))
    setTimeout(() => {
      alert("Product Deleted")
    }, 100);
  }

  const handleCart = () => {
    navigate('/cart')
  }
  const handleAddToCart = (product) => {
    setIsAdding(product.id)
    setTimeout(() => {
      addToCart(product)
      setAddedProducts(prev => [...prev, product.id])
      setIsAdding(false)
    }, 750);
  }

  if (!user)
    return null


  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-70">
        {/* Leaf 1 */}
        <motion.div
          initial={{ x: -100, y: '20vh', rotate: 0 }}
          animate={{
            x: ['0vw', '110vw'],
            y: ['20vh', '40vh', '15vh', '60vh'],
            rotate: [0, 45, -45, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-green-200/40"
        >
          <Leaf size={48} fill="currentColor" />
        </motion.div>

        {/* Leaf 2 - Different timing and path */}
        <motion.div
          initial={{ x: '110vw', y: '70vh', rotate: 0 }}
          animate={{
            x: ['110vw', '-10vw'],
            y: ['70vh', '50vh', '85vh', '40vh'],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-amber-400/30"
        >
          <Leaf size={32} fill="currentColor" />
        </motion.div>
        <motion.div
          initial={{ x: '110vw', y: '80vh', rotate: 0 }}
          animate={{
            x: ['110vw', '-10vw'],
            y: ['70vh', '50vh', '85vh', '40vh'],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-green-400/30"
        >
          <Leaf size={32} fill="currentColor" />
        </motion.div>
      </div>

      <main className='overflow-hidden bg-[#FDFCF7] '>
        <div className="fixed -top-20 -left-20 w-160 h-160 bg-green-200/30 rounded-full blur-[100px] -z-10" />
        <div className="fixed top-1/2 -right-20 w-120 h-120 bg-amber-200/50 rounded-full blur-[100px] -z-10" />
        <button className='inline-block rounded-2xl fixed left-2 top-4 z-50 bg-green-500' onClick={() => navigate('/')}><ChevronLeft size={40} strokeWidth={3} stroke='white' /></button>


        <div className='hidden  md:flex justify-between px-10 p-5'>
          <header className="py-5 text-center">
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter mb-4">
              Freshness <span className="text-green-600 italic font-serif">Direct</span> From The Soil
            </h1>
            <p className="text-slate-500 font-bold max-w-xl mx-auto uppercase tracking-widest text-sm">
              Supporting local farmers with every purchase
            </p>
          </header>
          {user.is_farmer ? (<button
            className="bg-green-500 text-white  rounded-xl border-2 border-gray-300 shadow h-fit p-2 py-2.5  px-6 cursor-pointer"
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}

          >  Add Product </button>) : (null)}

        </div>

        {/* Mobile section */}
<div className='py-4 md:hiddden'>
  {user.is_farmer ? (<button
            className="  fixed z-50  bg-green-500 text-white  rounded-xl border-2 border-gray-300 shadow h-fit p-2 py-3 font-black px-6 cursor-pointer"
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            
            >  Add Product </button>) : (null)}
            <br />
            
            
 <h1 className="text-6xl font-black text-slate-800 tracking-tighter mt-6">
              Freshness <span className="text-green-600 italic font-serif">Direct</span> From The Soil
            </h1>
            
</div>


        <hr /><br />
        {showForm && (
          <ProductForm
            initialData={editingProduct}
            onCancel={() => {
              setShowForm(false)
              setEditingProduct(null)
            }}
            onSubmit={async (data) => {
              if (editingProduct) {
                // UPDATE
                const updated = await updateProduct(editingProduct.id, data)
                setProducts(prev =>
                  prev.map(p => p.id === updated.id ? updated : p)
                )
              } else {
                // CREATE
                const created = await createProduct(data)
                setProducts(prev => [...prev, created])
                const refreshed = await getProducts()
                setProducts(refreshed)
              }

              setShowForm(false)
              setEditingProduct(null)
            }}
          />
        )}

        <div className=' grid grid-cols-1 md:grid-cols-4 min-h-screen  '>
          {products.map(product => (<>
            <div className=' overflow-hidden border-2 border-gray-300 hover:drop-shadow-2xl ease-in-out duration-500 shadow-white rounded-2xl bg-white/60 backdrop-blur-lg max-h-fit w-2xs ml-10 '>
              <div className=''>
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                  <Leaf size={14} /> Fresh
                </div>
                {product.photo ? (
                  <img
                    src={`http://127.0.0.1:8000${product.photo}`}
                    alt={product.name}
                    className="w-full h-38  object-cover "
                  />
                ) : (
                  <div className="h-38  bg-gray-200 flex items-center justify-center">
                    <ShoppingBag /> No Image
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-2 p-2'>
                <p className='text-2xl capitalize font-black '>{product.name}</p>
                <div className='flex justify-between'>
                  <p className='flex gap-1 items-center text-sm text-gray-600 font-semibold'><FaRegUser />{product.farmer_name}</p>
                  <p >Available</p>
                </div>
                <div className='flex justify-between gap'>
                  <p className='text-xl font-black text-green-600'>₹{product.price}/kg</p>
                  <p className='mr-2 font-black'>{product.quantity} kg</p> </div>
                <p className='font-black text-sm text-slate-700'>• Harvested on: {product.harvest_date}</p>

                {user.is_farmer ? (<div className='mt-2 flex gap-4 '>
                  <button
                    className='rounded-4xl bg-red-300 hover:bg-red-500 hover:rounded-md duration-275 ease-in text-white p-1 hover:p-2 font-black'
                    onClick={() => handleDelete(product.id)}>Delete
                  </button>
                  <button className="rounded-4xl bg-gray-500  hover:bg-gray-800 hover:rounded-md duration-275 ease-in text-white p-1 hover:p-2 font-black px-4 mr-2"
                    onClick={() => {
                      setEditingProduct(product)
                      setShowForm(true)
                    }}
                  >
                    Edit
                  </button>
                </div>) : (<div>
                  {addedProducts.includes(product.id) ? (
                    <button
                      className="p-2 flex gap-2  items-center bg-black text-white cursor-pointer rounded-md"
                      onClick={() => navigate("/cart")}
                    ><IoIosCart />
                      View Cart
                    </button>
                  ) : (
                    isAdding == product.id ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-75" cx="12" cy="12" r="10" stroke="blue" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <button
                        className="p-2 flex gap-2 items-center bg-black text-white cursor-pointer rounded-md"
                        onClick={() => handleAddToCart(product)}
                      >
                        <IoIosCart />
                        Add to Cart
                      </button>
                    ))}
                </div>)}



              </div>
            </div>
          </>))}

        </div>
      </main>

    </>
  )

}

export default Products