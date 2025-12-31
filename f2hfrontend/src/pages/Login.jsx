import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { loginUser,logoutUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { NavigationOff } from 'lucide-react'
function Login() {
  const navigate=useNavigate()
  const {login,logout}=useContext(AuthContext)
    const [form,setForm]=useState({"username":'',"password":''})
    const handleSubmit=async(e)=>{
        try{e.preventDefault()
        const data=await loginUser(form)
        console.log(data) 
        login(data)
        navigate('/')
        console.log(localStorage.getItem("token"))
          
        // login(data.user,data.token)
        console.log("Logged in")
      console.log("Login Successfull")}
        catch(err){x
          console.log(err.response?.data||err.message)
        } 
    }
   

    
  return (
    <>
    <div>
        <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
        <input type="text" className='border-2 bg-amber-200 w-min' placeholder='Username' onChange={e=> setForm({...form,username:e.target.value})}/>   
        <input type="password" className=' border-2 bg-amber-200 w-min' placeholder='Password' onChange={e=> setForm({...form,password:e.target.value})} />
        <button className='b-2 bg-sky-200 w-20 h-10 rounded-2xl '>Login</button>
        </form> 
    </div>
        </>
  )
}   

export default Login