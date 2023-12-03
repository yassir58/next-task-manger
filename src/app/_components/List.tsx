import { GoDotFill } from "react-icons/go";
import { trpc } from "../_trpc/client";
import { Card } from "./ui/Cards";
interface props {
    taskType:string, 
    color:string,
    taskStatus: TaskType,
    boardId:string
}

export const List:React.FC<props> = ({taskType, taskStatus, color,  boardId}) =>{

    const {data:tasks} = trpc.taskRouter.filterTasksByStatus.useQuery ({
        boardId:boardId!,
        status:taskStatus
      })
    return (<div className='max-w-[300px] min-w-[250px] flex flex-col gap-6'>
        <div className="flex gap-3 justify-start items-center">
            <GoDotFill fontSize='18px' color={color}/>
            <p className='font-semi-bold text-[#C4C1BB] text-l'>{tasks?.length ? `${taskType} (${tasks?.length})` : taskType}</p>
        </div>
        <div className='w-[98%] flex flex-col gap-4 overflow-auto max-h-[55vh]'>
            {tasks && tasks!.map ((item:any, index:number)=>{
                return <Card key={index} task={item} />
            })}
        </div>
    </div>)
}