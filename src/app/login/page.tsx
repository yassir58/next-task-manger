'use client'
import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex px-8 flex-col items-start justify-center gap-4 rounded-[12px] bg-[#1A1B1F] drop-shadow-md py-6">
      <p className="text-2xl text-left text-[#C4C1BB]">Login to your account</p>
        <LoginForm />
        <Link href={'/signup'}><p className='text-white'>sign up page</p></Link>
      </div>
    </main>
  );
}