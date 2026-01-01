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
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute farmerOnly={true}><FarmerDash /></ProtectedRoute>} ></Route>
        <Route path='/dashboard/summary' element={<ProtectedRoute farmerOnly={true}><DashSummary /></ProtectedRoute>} ></Route>
        <Route path='/history' element={<Orderhistory />}></Route>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
