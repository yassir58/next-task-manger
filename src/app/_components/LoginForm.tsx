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
        <form className="flex flex-col gap-6"  onSubmit={(e)=>{
            e.preventDefault ()
            handleSignIn ()
        }}>
            <div className="flex flex-col gap-3">
          <label className="font-bold text-gray-100" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[12px] border-[1px] border-gray-400 hover:opacity-70 text-[#D6E4FC] bg-transparent px-3 py-1 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400  focus:outline-none"
            id="email"
            value={email}
            type="email"
            placeholder="type your email"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-gray-100" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-[12px] border-[1px] border-gray-400 hover:opacity-70 text-[#D6E4FC] bg-transparent px-3 py-1 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400  focus:outline-none"
            id="password"
            value={password}
            type="password"
            placeholder="type your password"
          />
        </div>
        <button type='submit' className='bg-blue-600 rounded-[12px] px-6 py-2'>sign in</button>
        </form>
    )
}

export default LoginForm