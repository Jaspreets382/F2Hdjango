import React, { useState, useEffect, useContext } from 'react'
import { deleteProduct, getProducts } from '../services/productService'
import ProductForm from '../components/ProductForm'
import { createProduct, updateProduct } from '../services/productService'
import { AuthContext } from '../auth/AuthContext'
import { CartContext } from '../auth/CartContext'
import { useNavigate } from 'react-router-dom'
import { IoIosCart } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";


function Products() {
  const [products, setProducts] = useState([])
  const [addedProducts, setAddedProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { user } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    const func = async () => {
      const list = await getProducts()
      setProducts(list)
    }
    func()
  }, [])

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
    addToCart(product)
    setAddedProducts(prev => [...prev, product.id])
  }

  if (!user)
    return null


  return (
    <>

      <main className='overflow-hidden bg-linear-to-bl from-sky-300 to-green-300'>
        <div className='flex justify-between px-10 p-5'>
          <h1 className='text-center font-bold text-6xl bg-linear-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent '> Fresh Produce From Local Farmers </h1>
          {user.is_farmer ? (<button
            className="bg-green-500 text-white  rounded-xl border-2 border-gray-300 shadow h-fit p-2 py-2.5 cursor-pointer"
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
            
          >  Add Product </button>) : (<button className='flex gap-4 items-center text-xl cursor-pointer bg-white h-fit p-2 rounded-xl border-2 border-gray-300 shadow '
            onClick={handleCart}><IoIosCart strokeWidth={0} /> Cart</button>)}
          
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

        <div className=' grid grid-cols-4 min-h-screen  '>
          {products.map(product => (<>
          <div className=' overflow-hidden border-2 border-gray-300 hover:drop-shadow-2xl ease-in-out duration-500 shadow-white rounded-2xl bg-white max-h-fit w-2xs ml-10'>
            <div className=''>
              {product.photo ? (
                <img
                  src={`http://127.0.0.1:8000${product.photo}`}
                  alt={product.name}
                  className="w-full h-38  object-cover "
                />
              ) : (
                <div className="h-38  bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
              </div>
              <div className='flex flex-col gap-2 p-2'>
              <p className='text-xl '>{product.name}</p>
              <p className='flex gap-1 items-center text-sm text-gray-600'><FaRegUser/>{product.farmer_name}</p>
             <div className='flex justify-between gap'>
               <p>₹{product.price}/kg</p>
              <p className='mr-2'>Available :{product.quantity} kg</p> </div>
              <p>Harvested on : {product.harvest_date}</p>

              {user.is_farmer ? (<div className='mt-2 flex gap-4'>
                <button
                  className='rounded-md bg-red-300 hover:bg-red-500 text-white p-2'
                  onClick={() => handleDelete(product.id)}>Delete
                </button>
                <button className="rounded-md bg-gray-500  hover:bg-gray-800 text-white p-2 mr-2"
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
                  ><IoIosCart/>
                    View Cart
                  </button>
                ) : (
                  <button
                    className="p-2 flex gap-2 items-center bg-black text-white cursor-pointer rounded-md"
                    onClick={() => handleAddToCart(product)}
                  >
                    <IoIosCart/>
                    Add to Cart
                  </button>
                )}
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