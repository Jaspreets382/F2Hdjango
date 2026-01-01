import React, { useState,useEffect } from 'react'
import { getProducts } from '../services/productService'

function Products() {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const func =async()=>{
        const list=await getProducts()
        console.log(list)
        setProducts(list) 
        
        }
        func()
    },[])
  return (
<>
<h1 className='text-center font-bold text-2xl'> Products </h1>
<div className='grid grid-cols-4 place-items-center'>
    {products.map(product=> (<>
    <div className='w-fit border-2 rounded-4xl bg-amber-300 m-4 p-4'>
        <div> Listed By : {product.farmer_name}</div>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
        <p>{product.harvest_date}</p>
    </div>
    </>))}
</div>
</>
  )
}

export default Products