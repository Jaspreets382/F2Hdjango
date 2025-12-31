import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from './AuthContext'
function ProtectedRoute({
    children,
    farmerOnly=false,
    publicOnly=false
}) {
    const navigate=useNavigate()
    const {user}=useContext(AuthContext)

    if(publicOnly && user){
        navigate('/')
    }
    if(!publicOnly && !user){
        navigate('/login')
    }
    if(farmerOnly && !user?.is_farmer){
        navigate('/')
    }
    if(farmerOnly && !user.is_farmer){
        navigate('/')
    }

  return children
}

export default ProtectedRoute