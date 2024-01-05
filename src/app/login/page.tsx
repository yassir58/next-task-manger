'use client'
import Link from "next/link";
import LoginForm from "../_components/LoginForm";
import DarkModeSwitcher from "../_components/DarkModeSwitcher";
import Logo from "../_components/ui/icons/Logo";
export default function LoginPage() {
  return (
    <main className=" relative flex min-h-screen flex-col items-center justify-center  bg-lines dark:bg-darkGray ">
      <div className='absolute top-2 right-2'>
        <DarkModeSwitcher />
      </div>
      <div className="flex px-16 flex-col items-start justify-center gap-4 min-w-[40vw] rounded-[12px] bg-white dark:bg-veryDarkGray drop-shadow-md py-6">
      <div className='flex justify-center items-center w-full'>
      <Logo />
      </div>
      <p className="text-2xl text-left text-veryDarkGray dark:text-white">Login to your account</p>
        <LoginForm />
        <Link href={'/signup'}><p className=' text-mainPurple'>sign up page</p></Link>
      </div>
    </main>
  );
}