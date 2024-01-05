import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPen } from "react-icons/fa6"
import { MdDelete } from "react-icons/md";
import { trpc } from "~/app/_trpc/client";
import Avatar from "./Avatar";
import useAuth from "~/hooks/useAuth";
import { RxCross2 } from "react-icons/rx";
interface props {
    comment:_Comment
}
const CommentCard:React.FC<props> = ({comment}) =>{

    const utils = trpc.useUtils ()
    const ref = useRef <HTMLInputElement | null>(null)
    const [focused, setFocused] = useState (false)
    const [value, setValue] = useState (comment.content)
    const {user} = useAuth ()
    const deleteCommentMutation = trpc.commentRouter.deleteComment.useMutation ({
        onSuccess : ()=>{
            toast.success('Comment deleted successfully')
            utils.commentRouter.invalidate ()
        },
        onError: ()=>{
            toast.error ('Failed to delete comment')
        }
    })
    const editCommentMutation  =trpc.commentRouter.editComment.useMutation  ({
        onSuccess: ()=>{
            toast.success ('Comment edited successfully'),
            utils.commentRouter.invalidate ()
        }
    })

    const editComment = () => {
        editCommentMutation.mutateAsync ({
            id: comment.id,
            content: value
        })
    }
    const deleteComment = () =>{
        deleteCommentMutation.mutateAsync ({
            id: comment.id
        })
    }
    return (<div className='flex gap-4 px-2 py-4 w-full group '>
        <Avatar size='w-8 h-8' name={user?.name!} image={user?.profileImage!}/>
        <div className='flex justify-between items-center w-full'>
            <div className='flex flex-col gap-3'>
            <p className='text-veryDarkGray dark:text-white'>{comment.content}</p>
            <p className='font-semibold text-mediumGray text-xs'>{comment.createdAt}</p>
            </div>

            <RxCross2 className='text-mainRed  hover:scale-105 hidden group-hover:block  text-[18px]' onClick={deleteComment} />
        </div>
    </div>)
}

export default CommentCard