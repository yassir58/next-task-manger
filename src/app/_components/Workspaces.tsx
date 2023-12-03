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
      <Text color="veryLightGray.100" fontSize="18px">
        You have no workspaces
      </Text>
    );
  return (
    <HStack
      justify={"start"}
      alignItems="center"
      spacing={6}
      flexWrap="wrap"
      w='96%'
    >
        {data && data.map ((workspace:Workspace, index:number)=>{
            return <WorkspaceCard workspace={workspace} key={index} />
        })}
    </HStack>
  );
};

export default Workspaces