import { trpc } from "../_trpc/client"
import { BsCardChecklist } from "react-icons/bs";
import Subtask from "./ui/SubTask";
import { LoaderIcon } from "react-hot-toast";

interface props {
    task:Task
}

const Subtasks:React.FC<props> = ({task}) =>{
    const {data:subtasks, isLoading} = trpc.subtaskRouter.getAll.useQuery ({
        taskId: task.id!
    })
    if (isLoading)
        return <LoaderIcon/>
    if (subtasks?.length === 0)
        return <></>
    return (<div className='flex flex-col gap-4'>
        <div className='flex gap-3'>
            <BsCardChecklist className='text-sm text-mediumGray' />
            <p className='text-sm text-mediumGray' >Subtasks</p>
        </div>
     <div className='flex flex-col gap-2' >
        {subtasks && subtasks.map ((subtask:SubTask, index:number)=>{
            return <Subtask subtask={subtask} />
        }) }
     </div>
    </div>)
}

export default Subtasks