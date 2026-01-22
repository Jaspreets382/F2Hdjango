import { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { loginUser, } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useLoading } from '../Context/Loading'

function Login() {
    const {startLoading,stopLoading}=useLoading()
    const navigate = useNavigate()
    const { login, logout } = useContext(AuthContext)
    const [error, setError] = useState()
    const [form, setForm] = useState({ "username": '', "password": '' })
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            startLoading()
            const data = await loginUser(form)
            console.log(data)
            login(data)
            navigate('/')
            console.log(localStorage.getItem("token"))

            // login(data.user,data.token)
            console.log("Logged in")
            console.log("Login Successfull")
        }
        catch(err) {
            setError(err.response.data.error)
            console.log(error)
        }
        finally{
            setTimeout(() => {
                stopLoading()
            }, 1500);
        }
    }
    



    return (

        <>

         <div className=' relative overflow-hidden '> 
            <div className="absolute top-0 left-50 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-20 right-30 w-62 h-62 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-180 right-0 w-62 h-62 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-22 left-8 w-72 h-72 z-0 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="absolute -bottom-8 left-10 w-72 h-72 z-0 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="absolute top-200 right-30 w-62 h-62 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <main className=" my-18 mx-auto w-full max-w-5xl bg-white rounded-3xl shadow-soft overflow-hidden flex flex-col md:flex-row min-h-150 ">


                <section className="w-full md:w-1/2 bg-green-600 relative flex flex-col justify-between p-10 lg:p-14 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-green-300 opacity-20 blur-3xl"></div>

                

                    <div className="relative z-10 mt-10">
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                            Fresh Groceries <br /> Delivered to You.
                        </h2>
                        <p className="text-green-100 text-lg font-light max-w-xs">
                            Order organic vegetables and fresh fruits directly from local farmers.
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop"
                            alt="Fresh Vegetables"
                            className="w-full h-48 object-cover rounded-2xl shadow-lg mt-8 transform hover:scale-[1.02] transition duration-500" />
                    </div>
                </section>

                <section className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-green-100 relative">

                    

                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500">Please enter your details to sign in.</p>
                        </div>



                        <div className="relative flex py-2 items-center mb-6">
                            <div className="grow border-t border-gray-200"></div>
                            <span className="shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">Or continue with email</span>
                            <div className="grow border-t border-gray-200"></div>
                        </div>

                        <form id="loginForm" className="space-y-5" onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fa-regular fa-envelope text-gray-400 transition-colors duration-200"></i>
                                    </div>
                                    <input type="text" name="username" required
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition duration-200"
                                        placeholder="username" onChange={e => setForm({ ...form, username: e.target.value })} />
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-xs font-semibold text-green-600 hover:text-green-700 transition">Forgot Password?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-lock text-gray-400 transition-colors duration-200"></i>
                                    </div>
                                    <input type="password" id="password" name="password" required
                                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition duration-200"
                                        placeholder="••••••••" onChange={e => setForm({ ...form, password: e.target.value })} />
                                    <button type="button" 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer">
                                        <i id="eyeIcon" className="fa-regular fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer accent-green-600" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                                    Remember me for 30 days
                                </label>
                            </div>

                            <button type="submit" id="submitBtn"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 flex justify-center items-center">
                                <span id="btnText">Sign In</span>
                                <div id="btnLoader" className="loader hidden"></div>
                            </button>
                        </form>


                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?
                            <Link to={'/register'} className="font-bold text-green-600 hover:text-green-700 hover:underline transition">Create free account</Link>
                        </p>
                    </div>
                </section>
            </main>

            <div id="toast" className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl  items-center gap-3 z-50 hidden">
                <i className="fa-solid fa-circle-check text-green-400 text-xl"></i>
                <div>
                    <h4 className="font-bold text-sm">Login Successful</h4>
                    <p className="text-xs text-gray-300">Redirecting to dashboard...</p>
                </div>
            </div>
{error?( <div className='m-4 p-4 border-2 rounded-2xl bg-amber-600 text-white w-max absolute right-0 top-0'>{error}</div>):(null)}
           
            </div>

        </>
    )
}

export default Login