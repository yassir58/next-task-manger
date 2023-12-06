"use client";
import { useContext, useState } from "react";
import { trpc } from "../_trpc/client";
import { authContext } from "../context/contexts";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { NavBarLinks } from "./NavBarLinks";
import { useSession } from "next-auth/react";
import Input from "./ui/Input";
import PrimaryButton, { DangerButton } from "./ui/Buttons";
import { signOut } from "next-auth/react";
import { Skeleton, Avatar, HStack, Button, Text, Stack , Icon} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { FaPen } from "react-icons/fa6";

import { z } from "zod";

interface props {}
export const SideNav: React.FC<props> = ({}) => {
  const [name, setName] = useState("");
  const utils = trpc.useUtils();
  const { data: session } = useSession();
  const schema = z.string().min(5);
  const pathname = usePathname ();
  const workspaceId = pathname.split ('/')[2]
  const {isLoading, data:workspace} = trpc.workspaceRouter.getWorkspaceById.useQuery ({
    id : workspaceId!
  })

  console.table (workspace)
  const boardsMutation = trpc.boardRouter.createBoard.useMutation({
    onError: (err: any) => toast.error("failed to create board"),
    onSuccess: (data: any) => {
      utils.boardRouter.invalidate();
      toast.success("success: board created succesfully");
    },
  });
  const newBoard = () => {
    try {
      schema.parse(name);
      boardsMutation.mutateAsync({
        workspaceId: workspaceId!,
        boardName: name,
      });
      setName("");
    } catch (erro: any) {
      toast.error("Invalid input");
    }
  };

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: `http://localhost:3000/login`,
    });
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") newBoard();
  };

  return (
    <Stack spacing={3} minW='20%' minH='100%'   px='2px' py='4px'  justifyContent={'space-between'}>
     
        <div className="mb-2 flex h-20 items-center justify-start rounded-md bg-[#2A2D32] p-4 md:h-20">
             <HStack spacing={4} w='100%'>
             <Avatar name={workspace?.name} size='lg' src={workspace?.image} borderRadius='12px'/>
              <HStack w='100%' justifyContent='space-between' alignItems='center'>
               <Stack spacing={1}>
                <Text color='veryLightGray.100' fontSize='18px'>{workspace?.name}</Text>
                <Text color='gray.500' fontSize='sm'>{workspace?.visibility}</Text>
              </Stack>
              </HStack>

             </HStack>
        </div>
      <div className="flex  grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex  flex-col gap-5">
          <Input
            input={name}
            setInput={setName}
            placeHolder="Your board name"
            handleEnter={handleEnter}
          />
          <Button variant="regular">
            <HStack justifyContent="space-between" alignItems="center" w='100%'>
              <Text fontSize="15px">Create Board</Text>
              <FaPlus fontSize="18px" />
            </HStack>
          </Button>
          <NavBarLinks />
        </div>
      </div>
      <DangerButton handleClick={handleLogout} value="Logout" />
    </Stack>
  );
};
