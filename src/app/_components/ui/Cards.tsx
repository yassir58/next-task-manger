'use client'
import { Avatar, Badge, HStack, Icon } from "@chakra-ui/react";
import { taskStatus } from "../../../../constants";
import { MdModeEditOutline } from "react-icons/md";
import { ModalWrapper } from "./Modal";
import { EditTask } from "../EditTask";
import { Cover } from "./Cover";
import ui from '../../../styles/ui-module.module.css'
import useAuth from "~/hooks/useAuth";


interface props {
  task: Task;
}




export const Card: React.FC<props> = ({ task }) => {

  const {user} = useAuth ()
  return (
    <div className={`flex px-2 flex-col scale-85 md:scale-90 lg:scale-95 xl:scale-100 items-start justify-center gap-4 rounded-[8px] bg-[#1A1B1F] drop-shadow-md pt-1 pb-6 w-full h-full`}>
      {task?.coverImage.length ? <Cover image={task?.coverImage} /> : ''}
      <p className="text-l text-left text-[#C4C1BB]">{task.content}</p>

      <HStack justifyContent={'space-between'} w='100%'>
      <Avatar name="test" src={user?.profileImage!} size='xs'  borderRadius='8px'/>
      </HStack>
     
    </div>
  );
};
