'use client'
import { Badge, Icon } from "@chakra-ui/react";
import { taskStatus } from "../../../../constants";
import { MdModeEditOutline } from "react-icons/md";
import { ModalWrapper } from "./Modal";
import { EditTask } from "../EditTask";
import { Cover } from "./Cover";

interface props {
  task: Task;
}




export const Card: React.FC<props> = ({ task }) => {

  return (
    <div className="flex px-2 flex-col items-start justify-center gap-4 rounded-[12px] bg-[#1A1B1F] drop-shadow-md pt-1 pb-2">
      {task?.coverImage.length ? <Cover image={task?.coverImage} /> : ''}
      <p className="text-l text-left text-[#C4C1BB]">{task.content}</p>
      {/* <div className="flex w-[98%] justify-end">
       <ModalWrapper
          title="Edit task"
          value={
            <Icon as={MdModeEditOutline}fontSize='18px' color='#C4C1BB'_hover={{
                transorm:'scale(1.1)'
            }}/>
          }
          variant="ghost"
        >
          <EditTask task={task} />
        </ModalWrapper>
        
      </div> */}
    </div>
  );
};
