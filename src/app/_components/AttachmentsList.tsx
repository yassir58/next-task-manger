import { FaPaperclip } from "react-icons/fa"
import { trpc } from "../_trpc/client"
import { Stack, Icon, HStack, Text } from "@chakra-ui/react"
import AttachmentCard from "./ui/AttachmentCard"

interface props {
    task:Task
}
const AttachmentsList:React.FC<props> = ({task}) =>{
    const {data:attachments} = trpc.attachmentRouter.getAll.useQuery ({
        taskId: task.id
    })
    return (<Stack spacing={4}>
        <HStack spacing={4}>
            <Icon as={FaPaperclip} color="gray.500" fontSize={"16px"}/>
            <Text fontSize="sm" color="gray.500">Attachments</Text>
        </HStack>

        <Stack spacing={3} >
            {attachments && attachments.map ((attachment:Attachment, index:number) =>{
                return <AttachmentCard attachment={attachment} key={index} />
            })}
        </Stack>
    </Stack>)
}

export default AttachmentsList