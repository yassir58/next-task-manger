"use client";
import { useState } from "react";
import { trpc } from "../_trpc/client";
import axios from "axios";
interface props {}
import z from 'zod'
import { useRouter } from "next/navigation";

const signUp: React.FC<props> = ({}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter () 

  const createUserMutation = trpc.signUp.useMutation({
    onError: (err) => console.log("error : ", err),
  });

  const requestSchema = z.object({
    name: z.string(),
    email: z.string().email (),
    password:z.string().min(6)
})

  const signUp = async () => {

    
    try {
        
        const req = requestSchema.parse ({
                name:username,
                email:email,
                password:password
        })
        const res = await axios.post ("/api/user", JSON.stringify(req))
        if (res.status === 201)
          router.push('/login')
        console.table (res.data)
    }catch (error:any)
    {
        console.log ('error : ', error)
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
     <form onSubmit={(e) =>{
        e.preventDefault ()
        signUp ();
     }}>
     <div className="grid max-w-lg grid-rows-4 gap-6">
        <div className="flex flex-col gap-3">
          <label className="font-bold text-gray-100" htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-[8px] px-4 py-2 text-gray-900"
            id="username"
            value={username}
            type="text"
            placeholder="type your username"
          />
        </div>
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
      </div>
      <button
        type='submit'
        className="rounded-[8px]  bg-blue-500 px-4 py-2 text-gray-50"
      >
        signup
      </button>
     </form>
    </main>
  );
};

export default signUp;
