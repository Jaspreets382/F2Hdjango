import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import { AuthProvider } from './auth/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import FarmerDash from './pages/FarmerDash'
import DashSummary from './pages/DashSummary'
import Orderhistory from './pages/Orderhistory'
import Products from './pages/Products'
import {CartProvider } from './auth/CartContext'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { Layout } from './components'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
    <CartProvider>
      <Routes >
        <Route path='/' element={<Home />}></Route>
        <Route element={<Layout/>}>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute farmerOnly={true}><FarmerDash /></ProtectedRoute>} ></Route>
        <Route path='/dashboard/summary' element={<ProtectedRoute farmerOnly={true}><DashSummary /></ProtectedRoute>} ></Route>
        <Route path='/history' element={<Orderhistory />}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        </Route>



      </Routes>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
