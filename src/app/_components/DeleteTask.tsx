import { Stack, Heading , Button, HStack} from "@chakra-ui/react"
import { useContext } from "react";
import { modalContext } from "./ui/Modal";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";

interface props {
    task:Task
}

const DeleteTask:React.FC<props> = ({task}) => {

    const {onClose} = useContext (modalContext)
    const utils = trpc.useUtils ()
    const deleteTaskMutation = trpc.taskRouter.deleteTask.useMutation({
        onSuccess: (data: any) => {
          toast.success("Task deleted successfully");
          utils.taskRouter.invalidate();
        },
        onError: (err: any) => toast.error("Error : failed to delete task"),
      });
    const deleteTask = () => {
        deleteTaskMutation.mutateAsync({
          id: task.id,
        });
        onClose! ();
      };
    return (<Stack>
        <Heading color='veryLightGray.100' fontSize={'23px'}>Are you sure you want to delelet task ?</Heading>
        <HStack spacing={4}>
            <Button colorScheme='ghost' onClick={onClose}>cancel</Button>
            <Button colorScheme={'ghost'} color='red.500' onClick={deleteTask}>Delete</Button>
        </HStack>
    </Stack>)
}

export default DeleteTask 