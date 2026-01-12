import { useContext, useState } from "react"
import { Search, Vegan, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"
function Navbar({scrollToSection}) {
    const { user, logout } = useContext(AuthContext)
    const[userInfo,setUserInfo]=useState(false)
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logout()
        console.log("Logged out ")
        navigate('/')
    }


const handleRef=()=>{
     if (!scrollToSection?.current) {
      return;
    }
    scrollToSection.current.scrollIntoView({
        behavior:'smooth',
    })
}
    return (
        <>
            <nav className='fixed top-0 w-full z-50 glass shadow-sm transition-all duration-300 backdrop-blur-2xl'>
                <div className=' flex items-center align-middle mx-16 '>

                    <div className="logo gap-2 flex h-18 items-center mx-4 ">
                        <div className="w-10 h-10 bg-green-600 rounded-tr-lg rounded-bl-lg flex items-center justify-center text-white">
                            <Vegan size={28}></Vegan>
                        </div>
                        <span className="font-display font-bold text-4xl tracking-tight text-gray-900">Farm2<span className="text-green-600">Home</span></span>
                    </div>

                    <div className="nav-buttons mx-auto">
                        <Link to={'/'} className=' px-3 py-2 text-m font-medium text-gray-600'>Home</Link>
                        <Link className=' px-3 py-2 text-m font-medium text-gray-600'>Features</Link>
                        <Link to={'/products'} className=' px-3 py-2 text-m font-medium text-gray-600'>Products</Link>
                        <a href="" className=' px-3 py-2 text-m font-medium text-gray-600'>How It Works</a>
                    </div>

                    <div className="flex items-center border-2 rounded-4xl  search">
                        <Search className='ml-2' />
                        <input className=' rounded-2xl m-1  focus:outline-none  caret-green-300 text-sm ' type="text" placeholder='Search' />
                    </div>

                    {!user ? (<><div className=" login m-4 px-4 font-bold hover:shadow-[0_0_20px_rgba(107,205,230,0.7)] hover:bg-sky-300 hover:text-white duration-500 rounded-4xl p-2 ">
                        <Link to={'/login'}>Login</Link>
                    </div>
                        <div className="register  rounded-full m-2 font-bold hover:border-none hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] hover:bg-green-300 hover:text-white duration-500 p-2 " >
                            <button onClick={handleRef}>Get Started</button>
                        </div>
                    </>
                    ) : (
                        <> <div className="flex items-center m-2 gap-1 border-2 border-white shadow-xl rounded-xl p-1 bg-green-500/50 text-white">
                            <UserRound />
                            <span>Hi {user.first_name}</span>


                        </div>
                            {user.is_farmer ? (
                                <Link to={'/dashboard'} >Dashboard</Link>
                            ) : (
                                <Link className="border-2 p-1 rounded-2xl" to={'/history'} >Orders</Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-400 text-white rounded-2xl cursor-pointer"

                            >
                                Logout
                            </button>
                            <button onClick={()=>navigate('/cart')}>Cart</button>
                        </>
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar