import React, { useState, useEffect } from 'react'
import { registerUser } from '../services/authService'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react';
import { useLoading } from '../Context/Loading';
function Register() {

    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoading()
    const location = useLocation()
    const Userrole = location.state?.role === true
    const [role, setRole] = useState(Userrole);
    const [form, setForm] = useState({
        "username": '',
        "password": '',
        "first_name": '',
        "last_name": '',
        "email": '',
        "address": '',
        "phone_number": '',
        "is_farmer": Userrole

    })
    const [confirmPassword, setConfirmPasword] = useState('')

    const [errors, setErrors] = useState({});
    useEffect(() => {
        console.log("The current form state is:", form);
    }, [form]); // This fires AFTER the state has actually updated

    const validate = () => {
        const newErrors = {};
        if (!form.username.trim()) newErrors.username = 'Username is required';
        if (!form.first_name.trim()) newErrors.first_name = 'First Name is required';
        if (!form.last_name.trim()) newErrors.last_name = 'Last Name is required';
        if (!form.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (form.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };


    const handleSubmit = async (e) => {
        startLoading()
        e.preventDefault()
        if (!validate()) {
            console.log('not verified')
            stopLoading()
            return;
        }
        try {
            const data = await registerUser(form)
            console.log("Registered", data)
            navigate('/login')
        } catch (error) {
            console.log(error.response?.data || error.message)
        } finally {
            setTimeout(() => {
                stopLoading()
            }, 1500);
        }
    }
    return (
        <>
            <button className='inline-block rounded-2xl fixed left-2 top-4 z-50 bg-green-500' onClick={() => navigate('/')}><ChevronLeft size={40} strokeWidth={3} stroke='white' /></button>

            <div className="relative min-h-screen overflow-hidden bg-neutral-200">
                <div>
                    <div className="absolute top-0 left-50 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-20 right-30 w-62 h-62 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-180 right-0 w-62 h-62 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-32 -left-28 w-72 h-72 z-0 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="absolute bottom-58 left-28 w-62 h-62 z-0 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <div className="absolute top-200 right-30 w-62 h-62 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                </div>
                <div className="relative z-10 flex mx-auto">



                    <main className="max-w-4xl w-full fade-in mx-auto py-20 ">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl bg-linear-to-r from-green-700 to-black bg-clip-text text-transparent md:text-5xl font-bold md:bg-linear-to-r md:from-green-900 md:to-green-300 from-30% mf:bg-clip-text md:text-transparent  mb-2">Register to join our fresh produce marketplace</h1>

                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="order-2 md:order-1 bg-white glass-card p-6 md:p-8 rounded-2xl hover:shadow-2xl hover:scale-103 ease-in duration-150">
                                <h2 className="text-2xl font-bold text-green-800 mb-6">Create Account</h2>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} input-field transition`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div className='flex gap-4'>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={form.first_name}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} input-field transition`}
                                                placeholder="John "
                                            />
                                            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={form.last_name}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} input-field transition`}
                                                placeholder="Doe"
                                            />
                                            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                                        </div>
                                    </div>
                                    <div className='flex gap-4'>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={form.username}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} input-field transition`}
                                                placeholder="John Doe"
                                            />
                                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone_number"
                                                value={form.phone_number}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-lg border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} input-field transition`}
                                                placeholder="9999999999"

                                            />
                                            {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} input-field transition`}
                                            placeholder="••••••••"
                                            autoComplete='new-password'
                                        />
                                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPasword(e.target.value)}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} input-field transition`}
                                            placeholder="••••••••"
                                            autoComplete='current-password'
                                        />
                                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 rounded-lg  font-bold text-lg bg-linear-to-r from-green-600 to-green-300 text-white"
                                    >
                                        Register Account
                                    </button>

                                    <div className="text-center mt-4">
                                        <p className="text-gray-600">Already have an account? <Link to={'/login'} className="text-green-700 font-semibold hover:underline">Sign In</Link></p>
                                    </div>
                                </form>
                            </div>

                            <div className="space-y-6 order-1">
                                <h3 className="text-xl font-bold text-green-800 ml-2">I am registering as a:</h3>

                                <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">

                                    {/* BUYER CARD */}
                                    <div
                                        onClick={() => {
                                            setRole(false)
                                            setForm(prev => ({ ...prev, is_farmer: false }));

                                        }}
                                        className={`p-6 rounded-[2.5rem] cursor-pointer border-2 transition-all duration-500 ease-out relative overflow-hidden group
                                                          ${role === false
                                                ? 'bg-green-50 border-green-500 shadow-2xl shadow-green-100 -translate-y-2'
                                                : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300'
                                            }`}
                                    >
                                        {/* Background Glow Blob (CSS Only) */}
                                        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full blur-3xl transition-opacity duration-700 
                                                    ${role === false ? 'opacity-40' : 'opacity-0'}`}>
                                        </div>

                                        <div className="flex items-start space-x-4 relative z-10">
                                            <div className={`p-3 rounded-2xl transition-all duration-500 
                                                 ${role === false ? 'bg-green-600 text-white rotate-6' : 'bg-green-100 text-green-700'}`}>
                                                <i className="fas fa-shopping-basket text-2xl"></i>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className={`text-xl font-black transition-colors duration-500 
                                                        ${role === false ? 'text-green-800' : 'text-gray-400'}`}>Buyer</h4>

                                                    {/* Checkmark indicator */}
                                                    <i className={`fas fa-check-circle text-green-600 text-xl transition-all duration-500 transform
                                                             ${role === false ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></i>
                                                </div>

                                                <p className="text-gray-600 font-semibold text-sm mt-1">Purchase fresh produce directly from local farmers</p>

                                                <ul className={`mt-3 space-y-1 transition-all duration-500 
                                                ${role === false ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-2'}`}>
                                                    <li className="flex items-center text-sm font-bold text-gray-600"><i className="fas fa-check text-green-500 mr-2"></i> Browse farm-fresh products</li>
                                                    <li className="flex items-center text-sm font-bold text-gray-600"><i className="fas fa-check text-green-500 mr-2"></i> Direct from farm to table</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* FARMER CARD */}
                                    <div
                                        onClick={() => {
                                            setRole(true)
                                            setForm(prev => ({ ...prev, is_farmer: true }));

                                        }}
                                        className={`p-6 rounded-[2.5rem] cursor-pointer border-2 transition-all duration-500 ease-out relative overflow-hidden group
                                                            ${role === true
                                                ? 'bg-green-50 border-green-500 shadow-2xl shadow-green-100 -translate-y-2'
                                                : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-green-200 rounded-full blur-3xl transition-opacity duration-700 
                                                      ${role === true ? 'opacity-40' : 'opacity-0'}`}>
                                        </div>

                                        <div className="flex items-start space-x-4 relative z-10">
                                            <div className={`p-3 rounded-2xl transition-all duration-500 
                                             ${role === true ? 'bg-green-600 text-white rotate-6' : 'bg-green-100 text-green-700'}`}>
                                                <i className="fas fa-tractor text-2xl"></i>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className={`text-xl font-black transition-colors duration-500 
                                                     ${role === true ? 'text-green-800' : 'text-gray-400'}`}>Farmer</h4>

                                                    <i className={`fas fa-check-circle text-green-600 text-xl transition-all duration-500 transform
                                                             ${role === true ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></i>
                                                </div>

                                                <p className="text-gray-600 font-semibold text-sm mt-1">Sell your harvest to customers nationwide</p>

                                                <ul className={`mt-3 space-y-1 transition-all duration-500 
                                                               ${role === true ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-2'}`}>
                                                    <li className="flex items-center text-sm font-bold text-gray-600"><i className="fas fa-check text-green-500 mr-2"></i> Zero listing fees</li>
                                                    <li className="flex items-center text-sm font-bold text-gray-600"><i className="fas fa-check text-green-500 mr-2"></i> Direct customer relationships</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex bg-green-100 border border-green-200 rounded-2xl p-5 mx-4">
                                    <div className="flex ">
                                        <i className="text-green-600 text-xl mt-1 mr-3"></i>
                                        <div>
                                            <h4 className="font-bold text-green-800">Why choose GreenGrocer?</h4>
                                            <p className="text-green-700 mt-1">We connect farmers directly with consumers, reducing food miles and ensuring fair prices for both parties.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        </>)
}

export default Register