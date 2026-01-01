import API from '../api/axios'

export const farmerDash=async()=>{
    const res=await API.get("orders/farmer-dash/")
    return res.data
}

export const dashSummary=async()=>{
    const res=await API.get("orders/farmer-dash/summary")
    return res.data
}

export const changeStatus=async(item_id,status)=>{
    const res=await API.patch(`orders/${item_id}/status/`,{"status":status})
    return res.data

}