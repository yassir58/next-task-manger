'use client'
import { HStack, Text } from "@chakra-ui/react";
import { trpc } from "../_trpc/client";
import { useSession } from "next-auth/react";
import { LoaderIcon } from "react-hot-toast";
import WorkspaceCard from "./WorkspaceCard";

interface props {}
const Workspaces: React.FC<props> = ({}) => {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.workspaceRouter.getAll.useQuery({
    userid: session?.user.id!,
  });

  if (isLoading) return <LoaderIcon />;
  if (data && !data.length)
    return (
      <p className="text-md font-semibold text-mediumGray">
        You have no workspaces
      </p>
    );
  return (
    <div
      className='w-full px-16 py-6 flex justify-start items-center gap-3 flex-wrap'
    >
        {data && data.map ((workspace:Workspace, index:number)=>{
            return <WorkspaceCard workspace={workspace} key={index} />
        })}
    </div>
  );
};

export default Workspaces