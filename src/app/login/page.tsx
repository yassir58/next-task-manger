'use client'
import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="relative mx-auto flex w-full max-w-[400px] gap-4 flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#1A1B1F] p-3 md:h-36 ">
          <div className="w-32 text-white md:w-36">
            <p className='text-xl'>TaskManager</p>
          </div>
        </div>
        <LoginForm />
        <Link href={'/signup'}><p className='text-white'>sign up page</p></Link>
      </div>
    </main>
  );
}