"use client";
import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { FaEllipsis, FaPlus } from "react-icons/fa6";
import { ModalWrapper } from "./ui/Modal";
import { AddTask } from "./AddTask";
import Link from "next/link";
import { MdWorkspaces } from "react-icons/md";
import { trpc } from "../_trpc/client";
import ui from '../../styles/ui-module.module.css'
import { InviteToWorkspace } from "./InviteUser";

interface props {}
const WorkspaceHeader: React.FC<props> = ({}) => {

  const pathname = usePathname ()
  const boardId = pathname.split("/")[4];
  const {data:board} = trpc.boardRouter.getBoardById.useQuery ({
    id: boardId!
  })
  const {data:workspace} = trpc.workspaceRouter.getWorkspaceById.useQuery ({
    id : board?.workspaceId!
  })

  return (
    <HStack w="100%" justifyContent={"space-between"} alignItems={"center"} px={4} py={4}>
      <HStack spacing={3}>
            <Link href="/">
              <Button variant="lightGhost">
                <HStack spacing={6}>
                  <Text>Workspaces</Text>
                  <Icon as={MdWorkspaces} />
                </HStack>
              </Button>
            </Link>
          
      </HStack>

      <HStack spacing={4} >
        <InviteToWorkspace workspace={workspace!} />
        <Button variant={"lightGhost"} >
          <HStack spacing={4}>
            <Text>Menu</Text>
            <Icon as={FaEllipsis} />
          </HStack>
        </Button>
      </HStack>
    </HStack>
  );
};

export default WorkspaceHeader;
