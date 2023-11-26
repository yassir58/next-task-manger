import { useState } from "react"
import { authContext } from "../context/contexts"

interface AuthProviderProps {
    children:React.ReactNode
    user?:User
}
export const AuthProvider:React.FC<AuthProviderProps> = ({children, user})=>{

    const [loggedInUser, setLoggedInUser] = useState (user)
    return <authContext.Provider value={{loggedInUser, setLoggedInUser}}>
        {children}
    </authContext.Provider>
}