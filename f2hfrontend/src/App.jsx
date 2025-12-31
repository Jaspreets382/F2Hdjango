import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import { AuthProvider } from './auth/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import FarmerDash from './pages/FarmerDash'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<ProtectedRoute farmerOnly={true}><FarmerDash /></ProtectedRoute>} ></Route>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
