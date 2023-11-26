import { useState } from "react"
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation"
interface props {}
const LoginForm:React.FC<props> = ({})=>{



    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const router = useRouter ()
    const handleSignIn = async ()=>{
        console.log ('sign in')
    
        const signInData = await signIn ('credentials', {
            email:email,
            password:password,
            redirect:false
        })
        if (signInData!.error)
            console.log ('error:', signInData!.error)
        else {
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
            className="rounded-[8px] px-4 py-2 text-gray-900"
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
            className="rounded-[8px] px-4 py-2 text-gray-900"
            id="password"
            value={password}
            type="password"
            placeholder="type your password"
          />
        </div>
        <button type='submit' className='bg-blue-600 rounded-[8px] px-6 py-2'>sign in</button>
        </form>
    )
}

export default LoginForm