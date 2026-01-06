import React, { useState,useEffect} from 'react'
import { registerUser } from '../services/authService'
import { useLocation, useNavigate } from 'react-router-dom'
function Register() {
    const navigate = useNavigate()
    const location=useLocation()
    const role = location.state?.role
    const isFarmer=role==="true"
    const [form, setForm] = useState({
        "username": '',
        "password": '',
        "first_name": '',
        "last_name": '',
        "email": '',
        "address": '',
        "phone_number": '',
        "is_farmer": isFarmer

    })
    useEffect(() => {
  if (location.state?.role === undefined) {
    navigate("/")
  }
}, []);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await registerUser(form)
            console.log("Registered", data)
            navigate('/login')
        }
        catch (error) {
            console.log(error.response?.data || error.message)
        }
    }
    return (
        <>
            <div>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <input className='border-2 bg-amber-200 w-sm' type="text" placeholder='Username'  value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} /> 
                    <input className='border-2 bg-amber-200 w-sm' type="password" placeholder='password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                    <input className='border-2 bg-amber-200 w-sm' type="text" placeholder='First Name' value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
                    <input className='border-2 bg-amber-200 w-sm' type="text" placeholder='Last Name' value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
                    <input className='border-2 bg-amber-200 w-sm' type="email" placeholder='Email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <input className='border-2 bg-amber-200 w-sm' type="text" placeholder='Address' value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                    <input className='border-2 bg-amber-200 w-sm' type="text" placeholder='Phone Number' value={form.phone_number} onChange={e => setForm({ ...form, phone_number: e.target.value })} />
                    
                    <button className='border-2 rounded-2xl bg-sky-200 p-2 m-2 h-15 w-30'>Register</button>
                </form>
            </div>

        </>)
}

export default Register