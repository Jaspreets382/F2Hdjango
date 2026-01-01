import API from "../api/axios";

export const orderHistory=async()=>{
    const res=await API.get('orders/history')
    return res.data
}

export const cancelOrder=async(orderId)=>{
    const res=await API.post(`orders/${orderId}/cancel`)
    return res.data
}