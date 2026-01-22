import { useContext, useState, useRef, useEffect } from "react"
import { Search, Vegan, UserRound, ShoppingBasket, Menu, ChevronLeft } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import { useLoading } from "../Context/Loading"
function Navbar({ scrollToSection }) {
    const { user, logout } = useContext(AuthContext)
    const { startLoading, stopLoading } = useLoading()
    const [userInfo, setUserInfo] = useState(false)
    const [open, setOpen] = useState(false)
    const location=useLocation()
    const navigate = useNavigate()
    const userMenuRef = useRef(null)
    const isHomePage = location.pathname === "/";

    const handleLogoClick = () => {
        if (!isHomePage) {
            startLoading()
            setTimeout(() => {
                navigate(-1);
                stopLoading()
            }, 700);
        }
    };
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                setUserInfo(false)
            }
        }
        if (userInfo) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        if (open)
            document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [userInfo])

    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && setUserInfo(false)
        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [])

    const handleLogout = async () => {
        startLoading()
        await logout()
        console.log("Logged out ")
        setTimeout(() => {
            stopLoading()
        }, 700);
        navigate('/')
    }

    const handleRef = () => {
        if (!scrollToSection?.current) {
            return;
        }
        scrollToSection.current.scrollIntoView({
            behavior: 'smooth',
        })
    }
    const handleCart = () => {
        if (user?.is_farmer == false) {
            navigate('/cart')
        }
        else { navigate('/') }

    }
    return (
        <>
            <nav className=' fixed top-0 w-full z-50 backdrop-blur-2xl bg-white/70 shadow-sm transition-all duration-300 '>
                <div className=' sm:flex justify-between px-2 flex items-center align-middle md:mx-16'>

                    <div className="logo gap-2 flex h-18 items-center mx-4 ">
                        <button
                        onClick={handleLogoClick}
                         className={`w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-tr-lg rounded-bl-lg flex items-center justify-center text-white ${!isHomePage ? 'hover:opacity-70' : ''}`}>
                           {isHomePage?( <Vegan className="text-2xl md:text-4xl"></Vegan>):(<ChevronLeft  className="text-2xl md:text-4xl" />)}
                        </button>
                        <span className="text-2xl font-display font-bold md:text-4xl tracking-tight text-gray-900">Farm2<span className="text-green-600">Home</span></span>
                    </div>

                    <div className="hidden md:flex items-center nav-buttons mx-auto">
                        <Link to={'/'} className='w-full px-3 py-2 text-m font-medium text-gray-600'>Home</Link>
                        <Link className='w-full px-3 py-2 text-m font-medium text-gray-600'>Features</Link>
                        <Link to={'/products'} className='w-full px-3 py-2 text-m font-medium text-gray-600'>Products</Link>
                        <a href="" className=' px-3 py-2 text-m font-medium text-gray-600 w-full'>How It Works</a>
                    </div>

                    <div className=" hidden md:flex items-center border-2 rounded-4xl  search">
                        <Search className='ml-2' />
                        <input className=' rounded-2xl m-1  focus:outline-none  caret-green-300 text-sm ' type="text" placeholder='Search' />
                    </div>


                    {/* mobile section */}


                    <div className="flex gap-4">
                        {!user ? (<div className=" md:hidden m-4 px-4 font-bold hover:shadow-[0_0_20px_rgba(107,205,230,0.7)] hover:bg-sky-300 hover:text-white duration-300 rounded-4xl p-2 ">
                            <Link to={'/login'}>Login</Link>
                        </div>) : (<button
                            onClick={handleLogout}
                            className="md:hidden px-4 py-2 bg-red-400 text-white rounded-2xl cursor-pointer"

                        >
                            Logout
                        </button>)}
                        <button className="w-full md:hidden" onClick={() => setOpen(!open)}><Menu /> </button>
                    </div>
                    <div
                        className={`
          fixed top-18 right-0 h-screen w-64 bg-white/90 shadow-xl flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
                    >
                        <Link to={'/'} className=' px-3 py-2 text-m  font-black  text-gray-600'>Home</Link>
                        <Link className=' px-3 py-2 text-m  font-black text-gray-600'>Features</Link>
                        <Link to={'/products'} className=' px-3 py-2 text-m font-black  text-gray-600'>Products</Link>
                         { user ? (<div className="md:hidden px-3 py-2 text-m font-black  text-gray-600 flex gap-3 flex-col">
                    <Link className="" > User Info</Link>
                    {user.is_farmer ? (

                        <Link to={'/dashboard'} >Dashboard</Link>
                    ) : (<>
                        <Link className="  rounded-2xl" to={'/history'} >Orders</Link>
                        <Link to={'/cart'} className=" py-2 text-m  font-black  text-gray-600">Cart </Link>
                        </>
                    )}</div>):(null)}

                    </div>


                    {!user ? (<div className="hidden md:flex items-center"><div className=" login m-4 px-4 font-bold hover:shadow-[0_0_20px_rgba(107,205,230,0.7)] hover:bg-sky-300 hover:text-white duration-300 rounded-4xl p-2 ">
                        <Link to={'/login'}>Login</Link>
                    </div>
                        <div className="register  rounded-full m-2 font-bold hover:border-none hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] hover:bg-green-300 hover:text-white duration-300 p-2 " >
                            <button onClick={handleRef}>Get Started</button>
                        </div>
                    </div>
                    ) : (
                        <div className="hidden md:flex items-center"
                        > <button onClick={() => setUserInfo(!userInfo)} className="flex items-center m-2 gap-1 border-2 border-white shadow-xl rounded-xl p-1 bg-green-500/50 text-white">
                                <UserRound />
                                <span>Hi {user.first_name}</span>
                            </button>
                            <button className="flex bg-black text-white font-bold p-1 rounded-2xl border-2 border-white shadow-xl" onClick={() => handleCart()}>
                                <ShoppingBasket /> Cart</button>
                        </div>
                    )}
                </div>
                {userInfo && user ? (<div ref={userMenuRef} className="hidden border-4 rounded-2xl  border-white shadow-2xl bg-white/60 absolute w-fit p-4 px-10 mt-2 right-30 z-20 md:flex flex-col gap-4 text-center">
                    <Link className="" > User Info</Link>
                    {user.is_farmer ? (

                        <Link to={'/dashboard'} >Dashboard</Link>
                    ) : (
                        <Link className="  rounded-2xl" to={'/history'} >Orders</Link>
                    )}

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-400 text-white rounded-2xl cursor-pointer"

                    >
                        Logout
                    </button>
                </div>) : (null)}


            </nav>
        </>
    )
}

export default Navbar