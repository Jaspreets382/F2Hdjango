import API from "../api/axios.js";
const loginUser= async (credentials)=>{
    const res=await API.post('users/login/',credentials);
     localStorage.setItem("token",res.data.token)
    localStorage.setItem("user",JSON.stringify(res.data))
    return res.data;
}

const registerUser=async(credentials)=>{
    const res=await API.post('users/register/',credentials)
   
    return res.data;
}

const logoutUser=async()=>{
    const token=localStorage.getItem("token")
    if (!token) return;
    await API.post('users/logout/',{},{
        headers:{
            Authorization:`Token ${token}`
        }
    }
)
localStorage.clear()
}   

export {loginUser,registerUser,logoutUser}