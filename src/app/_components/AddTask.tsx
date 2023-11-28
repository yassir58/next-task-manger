'use client'
import { useContext, useState } from "react";
import { SelectInput } from "./ui/Input";
import { trpc } from "../_trpc/client";
import { modalContext } from "./ui/Modal";
import toast from "react-hot-toast";
import {z} from 'zod'

interface props {
    boardId:string
}
export const AddTask: React.FC<props> = ({boardId}) => {
    const [input, setInput] = useState ('')
    const schema = z.string ().min (5)
    const {onClose} = useContext (modalContext)
    const [status, setStatus] = useState<TaskType> ('backlog')
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
                status:status
            })
        }
        catch (err:any){
            toast.error ('Error: Invalid input')
        }
    }
  return (
    <div className="flex flex-col gap-6">
      <input
        value={input}
        onChange={(e)=> setInput (e.target.value)}
        placeholder="task exmp:finish x project"
        className="rounded-[12px] border-[1px] border-gray-400  text-[#D6E4FC] bg-transparent px-3 py-1 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400 hover:opacity-70 focus:outline-none"
      />
      <SelectInput setStatus={setStatus} />
      <button className='text-[#D6E4FC] bg-blue-700 rounded-full px-4 py-2' onClick={()=>{
        addTask ()
        onClose! ()
      }}>add</button>
    </div>
  );
};
