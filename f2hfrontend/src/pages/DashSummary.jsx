import React, { useEffect, useState } from 'react'
import { dashSummary } from '../services/farmerServices'


function DashSummary() {
    const [summary,setSummary]=useState({})
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

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

    if (loading) return <h1 className='text-4xl'>Loading Summary ...</h1>
    if(error)return <h1>{error}</h1>

    return (
    <>
    <h1 className='text-4xl font-bold' >Summary </h1>
    <div className='h-auto w-max border-2 rounded-4xl p-4 mt-10'>
    <span> Total items : {summary.total_items}</span> <br />
    <span> Pending items : {summary.pending_items}</span>   <br /> 
    <span> Confirmed items : {summary.confirmed_items}</span> <br />
    <span> Delivered items : {summary.delivered_items}</span> <br />
    <span> Cancelled items : {summary.cancelled_items}</span> <br />
    </div>
    </>
    )   
}                                           

export default DashSummary