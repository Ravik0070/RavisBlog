import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()
export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")||null))
    const [isUserPopup, setIsUserPopup] = useState(false);

    const login = async(inputs) =>{
        const resp = await axios.post("/auth/login", inputs)
        const {password,...other} =  resp.data._doc
        setCurrentUser(other)
        return resp
        
    }
    const logout = async(inputs) =>{
        await axios.post("/auth/logout")
        setCurrentUser(null)
    }
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

    return (
      <AuthContext.Provider
        value={{ currentUser, login, logout, isUserPopup, setIsUserPopup }}
      >
        {children}
      </AuthContext.Provider>
    );
}