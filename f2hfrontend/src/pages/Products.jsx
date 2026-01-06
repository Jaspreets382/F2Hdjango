import React, { useState, useEffect, useContext } from 'react'
import { deleteProduct, getProducts } from '../services/productService'
import ProductForm from '../components/ProductForm'
import { createProduct, updateProduct } from '../services/productService'
import { AuthContext } from '../auth/AuthContext'
import { CartContext } from '../auth/CartContext'
import { useNavigate } from 'react-router-dom'


function Products() {
  const [products, setProducts] = useState([])
  const [addedProducts, setAddedProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const { user } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    const func = async () => {
      const list = await getProducts()
      console.log(list)
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


  return (
    <>
      <h1 className='text-center font-bold text-2xl'> Products </h1>
      {user.is_farmer ? (<button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditingProduct(null)
          setShowForm(true)
        }}
      >  Add Product </button>) : (<></>)}
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

      <div className='grid grid-cols-4 place-items-center'>
        {products.map(product => (<>
          <div className='w-fit border-2 rounded-4xl bg-amber-300 m-4 p-4'>
            <div> Listed By : {product.farmer_name}</div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.harvest_date}</p>
            {product.photo ? (
              <img
                src={`http://127.0.0.1:8000${product.photo}`}
                alt={product.name}
                className="w-full h-32 object-cover rounded-xl"
              />
            ) : (
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            {user.is_farmer ? (<div className='flex gap-4'>
              <button
                className='rounded-2xl bg-red-400 p-2'
                onClick={() => handleDelete(product.id)}>Delete
              </button>
              <button className="rounded-2xl bg-blue-400 p-2 mr-2"
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
                  className="p-2 bg-green-500 rounded-2xl"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                </button>
              ) : (
                <button
                  className="p-2 bg-green-500 rounded-2xl"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>)}


          </div>
        </>))}
        <button onClick={handleCart}>Cart</button>
      </div>
    </>
  )
}

export default Products