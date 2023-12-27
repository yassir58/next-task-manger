'use client'
import { Avatar } from "@chakra-ui/react";
import { taskStatus } from "../../../../constants";
import { MdModeEditOutline } from "react-icons/md";
import { Cover } from "./Cover";
import ui from '../../../styles/ui-module.module.css'
import useAuth from "~/hooks/useAuth";


interface props {
  task: Task;
}




export const Card: React.FC<props> = ({ task }) => {

  return (
    <div className={`flex px-4 py-2 flex-col scale-85 md:scale-90 lg:scale-95 xl:scale-100 items-start justify-center gap-4  rounded-[8px] bg-white drop-shadow-sm pt-1 pb-6 w-full h-full z-20 relative`}>
      {/* {task?.coverImage.length ? <Cover image={task?.coverImage} /> : ''} */}
      <div className="flex flex-col gap-3">
      <p className="text-l font-semibold text-left text-darkGray">{task.content}</p>
      <p className='text-xs text-mediumGray font-semibold'>0 subtask</p>
      </div>     
    </div>
  );
};
