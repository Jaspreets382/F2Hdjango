import API from '../api/axios'

export const farmerDash=async()=>{
    const token=localStorage.getItem("token")
    if (!token){
    console.log("token is not available")
    return
    }
    const res=await API.get("orders/farmer-dash/",{
        headers:{
            Authorization:`Token ${token}`
        }
    })
    return res.data

}
export const dashSummary=async()=>{

}
