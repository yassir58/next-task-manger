import Header, { WorkspaceHeader } from "./_components/Header";
import Workspaces from "./_components/Workspaces";
export default async function Home() {

  
  return (
    <main className="flex min-h-screen flex-col items-center bg-lines dark:bg-red-500 w-full">
      <Header />
      <WorkspaceHeader />
      <Workspaces />
    </main>
     
  );
}


