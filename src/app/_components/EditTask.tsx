import {useState, useContext} from 'react';
import { modalContext } from './ui/Modal';
import { trpc } from '../_trpc/client';
import toast from 'react-hot-toast';
import { SelectInput } from './ui/Input';
interface props {
    task:Task
}

export const EditTask:React.FC<props> =({task}) =>{

    const [input, setInput] = useState (task.content)
    const {onClose} = useContext (modalContext)
    const [status, setStatus] = useState<TaskType> (task.status)
    const utils = trpc.useUtils ()
    const deleteTaskMutation = trpc.taskRouter.deleteTask.useMutation ({
        onSuccess: (data:any) => {
            toast.success ("Task deleted successfully");
            utils.taskRouter.invalidate ();
        },
        onError: (err:any) => toast.error ('Error : failed to delete task')
    })
    const editTaskMutation = trpc.taskRouter.editeTask.useMutation ({
        onSuccess : (data:any) =>{
            toast.success ("Task edited successfully");
            utils.taskRouter.invalidate ();

        },
        onError: (err:any) => toast.error ("Error: failed to edite task")
    })

    const editTask = ()=>{
        editTaskMutation.mutateAsync ({
            id: task.id!,
            content:input,
            status:status
        })
    }

    const deleteTask = () =>{
        deleteTaskMutation.mutateAsync ({
            id: task.id
        })
    }
  return (
    <div className="flex flex-col gap-6">
      <input
        value={input}
        onChange={(e)=> setInput (e.target.value)}
        className="rounded-[12px] border-[1px] border-gray-400 hover:opacity-70 text-[#D6E4FC] bg-transparent px-3 py-1 outline-none placeholder:text-sm placeholder:italic placeholder:text-gray-400 hover:opacity-70 focus:outline-none"
      />
      <SelectInput setStatus={setStatus} />
      <button className='text-[#D6E4FC] bg-blue-700 rounded-full px-4 py-2' onClick={()=>{
        editTask ()
        onClose! ()
      }}>save</button>

     <button className='border-0 bg-transparent text-red-600 text-md hover:text-red-800 py-4' onClick={()=>{
        deleteTask ()
        onClose!()
     }}>delete task</button> 
    </div>
  )
}