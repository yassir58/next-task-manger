"use client";
import { useState } from "react";
import axios from "axios";
interface props {}
import z from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { requestSchema } from "../../../constants";
import Logo from "../_components/ui/icons/Logo";
import DarkModeSwitcher from "../_components/DarkModeSwitcher";

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
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-lines dark:bg-darkGray">
      <div className='absolute top-2 right-2'>
        <DarkModeSwitcher />
      </div>
      <div className='flex px-16 flex-col items-start justify-center gap-4 rounded-[12px] min-w-[40vw] bg-white dark:bg-veryDarkGray drop-shadow-md py-6'>
      <div className='flex justify-center items-center w-full'>
      <Logo />
      </div>
      <p className="text-2xl text-left text-veryDarkGray dark:text-white">Sign up</p>
      <form
      className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}
      >
        <div className="grid max-w-xl grid-rows-4 gap-3 w-full">
          <div className="flex flex-col gap-3 w-full">
            <label className="font-bold text-mediumGray " htmlFor="username">
              Username
            </label>
            <input
              className="input-regular"
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              value={username}
              type="text"
              placeholder="type your username"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="font-bold text-mediumGray" htmlFor="email">
              Email
            </label>
            <input
              className="input-regular"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              value={email}
              type="email"
              placeholder="type your email"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="font-bold text-mediumGray" htmlFor="password">
              Password
            </label>
            <input
              className="input-regular"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              value={password}
              type="password"
              placeholder="type your password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-primary w-full"
        >
          signup
        </button>
      </form>
        <Link href={'/login'}><p className='text-mainPurple  py-3'>already have an account ? log in</p></Link>
          </div>
    </main>
  );
};

export default signUp;
