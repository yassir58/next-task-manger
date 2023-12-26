import { GoDotFill } from "react-icons/go";
import { trpc } from "../_trpc/client";
import { Card } from "./ui/Cards";


interface props {
   column:any
}

export const List:React.FC<props> = ({column}) =>{

    const {data:tasks} = trpc.taskRouter.getTasks.useQuery ({
        columnId:column.id!,
      })
    return (<div className='max-w-[300px] min-w-[250px] flex flex-col gap-6 h-[100%]'>
        <div className="flex gap-3 justify-start items-center">
            <GoDotFill fontSize='18px' color={column.color}/>
            <p className=' text-[#C4C1BB] text-l'>{tasks?.length ? `${column.name} (${tasks?.length})` : column.name}</p>
        </div>
        <div className='w-[98%] flex flex-col gap-4 overflow-auto  max-h-[100%]'>
            {tasks && tasks!.map ((item:any, index:number)=>{
                return <Card task={item} key={index} />
            })}
        </div>
    </div>)
}