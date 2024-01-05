'use client'
import { useContext, useState } from "react"
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { authContext } from "../context/contexts"
interface props {}
const LoginForm:React.FC<props> = ({})=>{



    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const {setIsAuth} = useContext (authContext)
    const router = useRouter ()
    const handleSignIn = async ()=>{
    
        const signInData = await signIn ('credentials', {
            email:email,
            password:password,
            redirect:false
        })
        if (signInData!.error)
          toast.error (`Error: ${signInData!.error}`)
        else {
                setIsAuth! (true)
                toast.success (`Welcome back`)
                router.refresh ()
                router.push ('/')
        }
    }
    return (
        <form className="flex flex-col gap-6 w-full"  onSubmit={(e)=>{
            e.preventDefault ()
            handleSignIn ()
        }}>
            <div className="flex flex-col gap-3 w-full">
          <label className='text-mediumGray'  htmlFor="email">
            Email
          </label>
          <input
            className='input-regular'
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            value={email}
            type="email"
            placeholder="type your email"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label className='text-mediumGray' htmlFor="password">
            Password
          </label>
          <input
            className='input-regular'
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            value={password}
            type="password"
            placeholder="type your password"
          />
        </div>
        <button type='submit' className='btn-primary w-full'>sign in</button>
        </form>
    )
}

export default LoginForm