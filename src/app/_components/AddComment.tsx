
'use client'
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
import useAuth from "~/hooks/useAuth";
import Image from "next/image";
import Avatar from "./ui/Avatar";
interface props {
    task:Task
}
const AddComment:React.FC<props> = ({task}) => {

    const [value, setValue] = useState ('')
    const {user} = useAuth ()
    const utils =  trpc.useUtils ()
    const addCommentMutation = trpc.commentRouter.createComment.useMutation ({
        onSuccess: () => {
            toast.success ('Comment created successfully')
            utils.commentRouter.invalidate ()
            setValue ('')
        },
        onError: () => toast.error ('Failed to create comment')
    })

    const createComment = () =>{
        try {
            addCommentMutation.mutateAsync ({
                taskId: task.id,
                content: value,
                userId: user?.id!
            })
            setValue ('')
        }catch (error:any){
            console.log ('error ', error)
        }
    }
    return (
           <div className='relative w-full h-full rounded-md shadow-md'>
           <textarea className='placeholder:text-mediumGray dark:bg-mediumGray/5 dark:border-[1px] dark:border-[#3E3F4E] dark:text-white  placeholder:italic  px-4 pt-2 pb-6 border-nne w-full h-full' cols={30} placeholder="your comment on this task" rows={3}  onChange={(e) => setValue (e.target.value)}/>
            <button className='btn-regular-primary absolute bottom-2 right-2' onClick={createComment}>add comment</button>
            </div> )
}


export default AddComment