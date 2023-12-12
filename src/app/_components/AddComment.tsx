
'use client'
import { Stack ,Text , Icon, HStack, InputGroup, Textarea, InputLeftElement, Avatar, InputRightAddon, InputRightElement} from "@chakra-ui/react"
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
interface props {
    task:Task
}
const AddComment:React.FC<props> = ({task}) => {

    const [value, setValue] = useState ('')
    const {data:session} = useSession ()
    const utils =  trpc.useUtils ()
    // const {data:comments} = trpc.commentRouter.getAll.useQuery ({
    //     taskId: task.id
    // })
    const addCommentMutation = trpc.commentRouter.createComment.useMutation ({
        onSuccess: () => {
            toast.success ('Comment created successfully')
            utils.commentRouter.invalidate ()
        },
        onError: () => toast.error ('Failed to create comment')
    })

    const createComment = () =>{
        try {
            addCommentMutation.mutateAsync ({
                taskId: task.id,
                content: value,
                userId: session?.user.id!
            })
            setValue ('')
        }catch (error:any){
            console.log ('error ', error)
        }
    }
    return (<Stack spacing={4}>
        <HStack spacing={4}>
        <Icon as={FaComment} color="gray.500" fontSize={"16px"} />
        <Text fontSize="sm" color="gray.500">
          Comments
        </Text>
      </HStack>

        
      <InputGroup  >
        <Textarea placeholder='Add a comment' 
        outline='none'
        border='none'
        shadow='none'
        pl={16}
        value={value}
        py={2}
        bg="rgba(255,255,255,0.1)"
        color="veryLightGray.100"
        fontSize="18px"
        _placeholder={{
          fontStyle: "italic",
          color: "veryLightGray.100",
          fontSize: "sm",
        }}
         onChange={(e) => setValue (e.target.value)}/>
        <InputLeftElement ml='10px' mt={2}>
        <Avatar src='' name={session?.user.name} borderRadius='md'/>
        </InputLeftElement>
        <InputRightElement mr={4} mt={2}>
        <button className='btn-primary' onClick={createComment}>add</button>
        </InputRightElement>
      </InputGroup>
    </Stack>)
}


export default AddComment