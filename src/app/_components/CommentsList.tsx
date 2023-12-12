
import { Stack } from "@chakra-ui/react"
import { trpc } from "../_trpc/client"
import CommentCard from "./ui/CommentCard"
interface props     {
    task:Task
}
const CommentsList:React.FC<props> = ({task}) =>{

    const {data:comments, isLoading}= trpc.commentRouter.getAll.useQuery ({
        taskId: task.id
    })

    return (<Stack spacing={4} w='100%'>
        {comments && comments.map ((comment:_Comment, index:number)=>{
            return <CommentCard comment={comment} key={index} />
        })}
    </Stack>)
}

export default CommentsList