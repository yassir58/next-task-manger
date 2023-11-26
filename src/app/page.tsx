import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import HomePage from "./_components/HomePage";

export default async function Home() {

  const session = await getServerSession (authOptions)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
     <HomePage user={{
      name:session?.user.name,
      email:session?.user.email!,
      id:session?.user.id
     } }/>
    </main>
     
  );
}


