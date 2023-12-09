'use client'
import { useContext, useState } from "react";
import { SelectInput } from "./ui/Input";
import { trpc } from "../_trpc/client";
import { modalContext } from "./ui/Modal";
import toast from "react-hot-toast";
import {z} from 'zod'
import { SetCover } from "./SetCover";
import { HStack , Text} from "@chakra-ui/react";
import { ModalWrapper } from "./ui/Modal";
import { FaImage } from "react-icons/fa6";
import { Cover } from "./ui/Cover";
import ui from '../../styles/ui-module.module.css'

interface props {
    boardId:string
}
export const AddTask: React.FC<props> = ({boardId}) => {
    const [input, setInput] = useState ('')
    const schema = z.string ().min (5)
    const {onClose} = useContext (modalContext)
    const [status, setStatus] = useState<TaskType> ('backlog')
    const [cover, setCover] = useState ('')
    const utils = trpc.useUtils ()
    const createTaskMutation = trpc.taskRouter.createTask.useMutation ({
        onSuccess : (data:any) =>{
            toast.success ("Task created successfully");
            utils.taskRouter.invalidate ();

        },
        onError: (err:any) => toast.error ("Error: failed to create task")
    })

    const addTask = ()=>{
        try {
            schema.parse (input)
            createTaskMutation.mutateAsync ({
                boardId: boardId,
                content:input,
                status:status,
                coverImage:cover!
            })
        }
        catch (err:any){
            toast.error ('Error: Invalid input')
        }
    }
  return (
    <div className="flex flex-col gap-6">
      {cover.length ? <Cover image={cover} /> : ''}
      <input
        value={input}
        onChange={(e)=> setInput (e.target.value)}
        placeholder="task exmp:finish x project"
        className="rounded-[12px] border-[1px] border-gray-400  text-[#D6E4FC] bg-transparent px-3 py-1 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400 hover:opacity-70 focus:outline-none"
      />
      <HStack>
      <SelectInput setStatus={setStatus} />
      <ModalWrapper title='Workspace cover' size='xs' buttonWidth='100%' variant='lightGhost' value={
            <>
            <Text>Cover</Text>
            <FaImage />
            </>
        }>
            <SetCover coverSetter={setCover}/>
        </ModalWrapper>
      </HStack>
      <button className={`${ui.Grad} text-[#D6E4FC] rounded-full px-4 py-2 hover:opacity-80`} onClick={()=>{
        addTask ()
        onClose! ()
      }}>add</button>
    </div>
  );
};
