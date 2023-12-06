"use client";
import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { FaEllipsis, FaPlus } from "react-icons/fa6";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { ModalWrapper } from "./ui/Modal";
import { AddTask } from "./AddTask";

interface props {}
const WorkspaceHeader: React.FC<props> = ({}) => {

    const pathname = usePathname ()
  const boardId = pathname.split("/")[4];

  return (
    <HStack w="100%" justifyContent={"space-between"} alignItems={"center"} px={4} py={2}>
      <HStack spacing={3}>
        <Button variant="lightGhost">
          <HStack spacing={4}>
            <Text>Private</Text>
            <Icon as={RiGitRepositoryPrivateFill} />
          </HStack>
        </Button>
        <Button variant="regular">
          <Icon as={FaPlus} />
        </Button>
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
