import { createContext,useState } from "react";
import { logoutUser } from "../services/authService";
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))
)
const login=(userData)=>{
    setUser(userData)

    
}

    const logout = async () => {
    try {
      await logoutUser(); // backend
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      localStorage.clear(); // 🔥 THIS WAS NEVER RUNNING
    }
  };


return(
    <AuthContext.Provider value={{login,logout,user}}>
        {children}
        </AuthContext.Provider>
)
}