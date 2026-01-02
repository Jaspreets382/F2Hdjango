import { WandIcon } from "lucide-react";
import API from "../api/axios";

export const orderHistory=async()=>{
    const res=await API.get('orders/history')
    return res.data
}

export const cancelOrder=async(orderId)=>{
    const res=await API.post(`orders/${orderId}/cancel`)
    return res.data
}

export const createOrder=async()=>{
    const res = await API.post('orders/',{})
    return res.data
}
export const addOrderItem=async(orderId,item)=>{
        const res = await API.post(`orders/${orderId}/items/`,{
        "product_id":item.id,
        "quantity_kg":item.quantity
    })
    return res.data
    
}