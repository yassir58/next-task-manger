"use client";
import { useState } from "react";
import axios from "axios";
interface props {}
import z from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { requestSchema } from "../../../constants";

const signUp: React.FC<props> = ({}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  

  const signUp = async () => {
    try {
      const req = requestSchema.parse({
        name: username,
        email: email,
        password: password,
      });
      const res = await axios.post("/api/user", JSON.stringify(req));
      if (res.status === 201) {
        toast.success(`User signup successfully`);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error (`Error : signup faild`)
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

      <div className='flex px-8 flex-col items-start justify-center gap-4 rounded-[12px] bg-[#1A1B1F] drop-shadow-md py-6'>
      <p className="text-2xl text-left text-[#C4C1BB]">Sign up</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}
      >
        <div className="grid max-w-xl grid-rows-4 gap-3">
          <div className="flex flex-col gap-3">
            <label className="font-bold text-gray-100" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-[12px] border-[1px] border-gray-400 hover:opacity-70 text-[#D6E4FC] bg-transparent px-3 py-1 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400  focus:outline-none"
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
        </div>
        <button
          type="submit"
          className="rounded-[12px]  bg-blue-500 px-4 py-2 text-gray-50"
        >
          signup
        </button>
      </form>
        <Link href={'/login'}><p className='text-white py-3'>already have an account ? log in</p></Link>
          </div>
    </main>
  );
};

export default signUp;
