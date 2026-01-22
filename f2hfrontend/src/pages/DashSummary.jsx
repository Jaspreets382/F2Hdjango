import React, { useEffect, useState } from 'react'
import { dashSummary } from '../services/farmerServices'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function DashSummary() {
    const [summary,setSummary]=useState({})
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const navigate =useNavigate()

    useEffect(()=>{
        const getSummary=async()=>{
           try{ const summary=await dashSummary()
            setSummary(summary)}
            catch(error){
                setError(error)
            }
            finally{
                setLoading(false)
            }
        }
        getSummary()
    },[])

    if (loading) return <h1 className='border-2 border-white bg-linear-to-r from-yellow-200 via-lime-300 to-green-400 shadow-2xl mb-10 shadow-gray-500 rounded-2xl text-center text-4xl font-extrabold'>Loading Summary ...</h1>
    if(error)return <h1>{error}</h1>

    return (
    <>

    <div className='border-2 border-white bg-green-500  shadow-2xl mb-10 shadow-gray-500 rounded-2xl'>
    <h1 className='text-4xl  text-center text-white font-extrabold pt-2 ' >Summary </h1>
    <div className='h-auto p-4 mt-10    font-black flex gap-15' >
        <div>
    <span> Total items : {summary.total_items}</span> <br />
    <span> Pending items : {summary.pending_items}</span>   <br /> 
    <span> Confirmed items : {summary.confirmed_items}</span> <br />
    </div>
    <div>
    <span> Delivered items : {summary.delivered_items}</span> <br />
    <span> Cancelled items : {summary.cancelled_items}</span> <br />
    </div>
    </div>
    </div>
    </>
    )   
}                                           

export default DashSummary