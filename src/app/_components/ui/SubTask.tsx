import { HStack, Text, Icon } from "@chakra-ui/react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { trpc } from "~/app/_trpc/client";
import toast from "react-hot-toast";

interface props {
  subtask: SubTask;
}
const Subtask: React.FC<props> = ({ subtask }) => {

    const utils = trpc.useUtils ()
  const editSubtaskMutation = trpc.subtaskRouter.editeSubtask.useMutation({
    onSuccess: () => {
        utils.subtaskRouter.invalidate ();
        toast.success("Subtask edited successfully")},
    onError: () => toast.error("Failed to edit subtask"),
  });

  const deleteSubtaskMutation = trpc.subtaskRouter.deleteSubtask.useMutation({
    onSuccess: () => {
        utils.subtaskRouter.invalidate ();
        toast.success("Subtask deleted successfully")},
    onError: () => toast.error("Failed to delete subtask"),
  });

  const editeSubtask = () => {
    try {
      editSubtaskMutation.mutateAsync({
        id: subtask.id,
        content: subtask.content,
        done: !subtask.done,
      });
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  const deleteSubtask = () => {
    try {
      deleteSubtaskMutation.mutateAsync({
        id: subtask.id,
      });
    } catch (error: any) {
      console.log("error: ", error);
    }
  };
  return (
    <HStack justifyContent={"space-between"}>
      <HStack spacing={4}>
        {subtask.done === false? (
          <Icon
            onClick={editeSubtask}
            as={MdCheckBoxOutlineBlank}
            color="gray.400"
            fontSize="18px"
            _hover={{
                opacity:0.8,
                transform:'scale(1.1)'
            }}
          />
        ) : (
          <Icon
            onClick={editeSubtask}
            as={IoMdCheckboxOutline}
            color="green.400"
            fontSize="18px"
            _hover={{
                opacity:0.8,
                transform:'scale(1.1)'
            }}
          />
        )}
        <Text color="veryLightGray.100" fontSize="16px">
          {subtask.content}
        </Text>
      </HStack>

      <Icon
        onClick={deleteSubtask}
        as={MdDelete}
        color="gray.400"
        fontSize="18px"
        _hover={{ opacity: 0.8 , transform:'scale(1.1)'}}
      />
    </HStack>
  );
};

export default Subtask;
