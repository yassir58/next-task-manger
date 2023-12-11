import { HStack, Icon, Stack, Text } from "@chakra-ui/react"
import { trpc } from "../_trpc/client"
import { BsCardChecklist } from "react-icons/bs";
import Subtask from "./ui/SubTask";

interface props {
    task:Task
}

const Subtasks:React.FC<props> = ({task}) =>{
    const {data:subtasks, isLoading} = trpc.subtaskRouter.getAll.useQuery ({
        taskId: task.id!
    })
    return (<Stack spacing={5}>
        <HStack spacing={4}>
            <Icon as={BsCardChecklist}  fontSize={'16px'} color='gray.500' />
            <Text fontSize='sm' color='gray.500' >Subtasks</Text>
        </HStack>
     <Stack spacing={2} >
        {subtasks && subtasks.map ((subtask:SubTask, index:number)=>{
            return <Subtask subtask={subtask} />
        }) }
     </Stack>
    </Stack>)
}

export default Subtasks