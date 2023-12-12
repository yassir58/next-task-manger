import { Avatar, HStack, Stack, Text, Icon, Editable, EditablePreview, EditableInput, Button,InputGroup, InputRightElement } from "@chakra-ui/react"
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPen } from "react-icons/fa6"
import { MdDelete } from "react-icons/md";
import { trpc } from "~/app/_trpc/client";

interface props {
    comment:_Comment
}
const CommentCard:React.FC<props> = ({comment}) =>{

    const utils = trpc.useUtils ()
    const ref = useRef <HTMLInputElement | null>(null)
    const [focused, setFocused] = useState (false)
    const [value, setValue] = useState (comment.content)
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
    return <HStack spacing={4} w='100%'>
        <Avatar src='' name='tmp' size='md' borderRadius={'md'}/>
        <Stack spacing={4} w='100%'>
            <Editable defaultValue={comment.content}>
                <EditablePreview fontSize='16px' color='veryLightGray.100'/>
                <InputGroup>
                <EditableInput outline='none' color='veryLightGray.100'  boxShadow='none' border='none' _hover={{outline:'none', boxShadow:'none', border:'none'}} onBlur={() => setFocused (false)} onFocus={() => setFocused (true)} ref={ref} onChange={(e) => setValue (e.target.value)}/>
                {focused ? <InputRightElement>
                <Button colorScheme='green' onClick={editComment}>
                    <Icon as={FaCheck} />
                </Button>
                </InputRightElement> : ''}
                </InputGroup>
            </Editable>
            <HStack justifyContent={'space-between'}>
                <Text fontSize='sm' color='gray.500'>{comment.createdAt}</Text>
                <HStack spacing={4}>
                    <Icon fontSize='18px' color='veryLightGray.100' _hover={{
                        transform:'scale(1.1)',
                        opacity:0.8
                    }}as={FaPen} onClick={()=>{
                        if (ref.current)
                            ref.current.focus ()
                    }}/>
                    <Icon fontSize='18px' color='veryLightGray.100' _hover={{
                        transform:'scale(1.1)',
                        opacity:0.8
                    }}as={MdDelete} onClick={deleteComment}/>
                </HStack>
            </HStack>

        </Stack>
    </HStack>
}

export default CommentCard