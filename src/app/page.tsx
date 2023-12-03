import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Header, { WorkspaceHeader } from "./_components/Header";
import Workspaces from "./_components/Workspaces";

export default async function Home() {

  const session = await getServerSession (authOptions)
  
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#1A1B1F] to-[#2A2D32] text-white">
      <Header user={session?.user} />
      <WorkspaceHeader />
      <Workspaces />
     {/* <HomePage user={{
      name:session?.user.name,
      email:session?.user.email!,
      id:session?.user.id
     } }/> */}
    </main>
     
  );
}


