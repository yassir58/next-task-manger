import { HStack, Avatar, Stack , Text, Button} from "@chakra-ui/react"
import { trpc } from "~/app/_trpc/client"
import toast from "react-hot-toast"

interface props {
    attachment: Attachment
}
const AttachmentCard:React.FC<props> = ({attachment}) => {

    const utils= trpc.useUtils ()
    const deleteAttachmentMutation = trpc.attachmentRouter.deleteAttachment.useMutation ({
        onSuccess: () => {
            toast.success ('Attachment created successfully')
            utils.attachmentRouter.invalidate ()
        },
        onError: () => {
            toast.error ('Failed to delete attachment')
        }
    })

    const deleteAttachment = () => {
        deleteAttachmentMutation.mutateAsync ({
            id: attachment.id
        })
    }
    return (<HStack spacing={4} minH={'60px'} bg='Primary.100' w='100%' borderRadius={'md'}>
        <Avatar borderRadius={'md'} h='100%'  src={attachment.path} w='120px' />
        <Stack spacing={4}>
            <Text fontSize='18px' color='veryLightGray.100'>
                {attachment.name}
            </Text>
            <HStack spacing={3}>
                <Button 
                    onClick={deleteAttachment}
                _hover={{
                    color:'Primary.100',
                    bg:'veryLightGray.100'
                }} variant='outline' color='veryLightGray.100' borderColor={'veryLightGray.100'}>Delete</Button>
                <Button _hover={{
                    color:'Primary.100',
                    bg:'veryLightGray.100'
                }} variant='outline' color='veryLightGray.100' borderColor={'veryLightGray.100'}>Download</Button>
            </HStack>
        </Stack>
    </HStack>)

}

export default AttachmentCard