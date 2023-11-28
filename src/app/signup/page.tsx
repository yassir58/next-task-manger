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
              className="rounded-[12px] px-4 py-2 text-gray-900"
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
              className="rounded-[12px] px-4 py-2 text-gray-900"
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
              className="rounded-[12px] px-4 py-2 text-gray-900"
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
        <Link href={'/login'}><p className='text-white py-3'>already have an account ? log in</p></Link>
      </form>
    </main>
  );
};

export default signUp;
