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

interface props {}
const WorkspaceHeader: React.FC<props> = ({}) => {

  const pathname = usePathname ()
  const boardId = pathname.split("/")[4];
  const {data:board} = trpc.boardRouter.getBoardById.useQuery ({
    id: boardId!
  })

  console.table (board)
  return (
    <HStack w="100%" justifyContent={"space-between"} alignItems={"center"} px={4} py={2}>
      <HStack spacing={3}>
            <Link href="/">
              <Button variant="lightGhost">
                <HStack spacing={6}>
                  <Text>Workspaces</Text>
                  <Icon as={MdWorkspaces} />
                </HStack>
              </Button>
            </Link>
          <div className={`bg-gradient-to-r from-[#B06AB3] to-[#4568DC] rounded-md  text-[#DAD4CD]  px-[1px] py-[1px] font-bold`}>
            <div className='bg-[#2A2D32]  w-full h-full px-4 py-2 rounded-md'>
            {board ? board!.name : ''}
            </div>
          </div>
      </HStack>

      <HStack spacing={4} >
      <ModalWrapper
          title="Create task"
          value={
            <div className="flex gap-4">
              <p className="text-sm">add task</p>
              <FaPlus fontSize="16px" />
            </div>
          }
          variant='regular'
        >
          <AddTask boardId={boardId!} />
        </ModalWrapper>
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
