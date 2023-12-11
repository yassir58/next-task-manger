'use client'
import { Stack , Input} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { modalContext } from "./ui/Modal"
import { trpc } from "../_trpc/client"
import toast from "react-hot-toast"
import ui from '../../styles/ui-module.module.css'

interface props {
    task:Task
}
const AddSubtask:React.FC<props> = ({task}) =>{

    const [content, setContent] = useState ('')
    const utils = trpc.useUtils ()
    const addSubTaskMutation = trpc.subtaskRouter.createSubtask.useMutation ({
        onSuccess: () => {
            utils.subtaskRouter.invalidate ();
            toast.success ('Subtask created successfully')},
        onError: (error:any) => toast.error (`Error: ${error}`)
    })

    const addSubTask = () =>{
        try {
            addSubTaskMutation.mutateAsync ({
                taskId: task.id,
                content:content,
                done:false,
            })
        }
        catch (err:any){
            console.log ('Error : ', err)
        }
    }
    const {onClose} = useContext (modalContext);
    return (<Stack spacing={4}>
        <Input variant='regular' value={content}  placeholder='subtask content' onChange={(e) => setContent (e.target.value)}/>
        <button className={`${ui.Grad} text-[#D6E4FC] rounded-full px-4 py-2 hover:opacity-80`} onClick={()=>{
        addSubTask ()
        onClose! ()
      }}>add</button>
    </Stack>)
}

export default AddSubtask