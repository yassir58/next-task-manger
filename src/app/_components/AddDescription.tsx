import toast from "react-hot-toast";
import { trpc } from "../_trpc/client";
import {
  Stack,
  EditableTextarea,
  Icon,
  Text,
  HStack,
  Editable,
  EditablePreview,
  Button,
  Textarea,
  EditableInput,
} from "@chakra-ui/react";
import { MdOutlineDescription } from "react-icons/md";
import { useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa6";

interface props {
  task: Task;
}
const AddDescription: React.FC<props> = ({ task }) => {
  const utils = trpc.useUtils();
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false)
  const addDescriptionMutation = trpc.taskRouter.editeTask.useMutation({
    onSuccess: () => {
      toast.success("description added succesfully");
      utils.taskRouter.invalidate();
    },
    onError: (err: any) => toast.error("Failed to add description"),
  });

  const editTask = () => {
    addDescriptionMutation.mutateAsync({
      id: task.id,
      content: task.content,
      status: task.status,
      description: value,
      cover:task.coverImage
    });
  };
  return (
    <Stack spacing={3}>
      <HStack justifyContent='space-between'>
      <HStack spacing={4}>
        <Icon as={MdOutlineDescription} color="gray.500" fontSize={"16px"} />
        <Text fontSize="sm" color="gray.500">
          Description
        </Text>
      </HStack>

      {task.Description === '' ? <Button onClick={() => setAdd (true)} colorScheme='blue'>
        <Icon as={FaPlus} />
      </Button> : <Button onClick={() => setEdit (true)} colorScheme='blue'>
        <Icon as={FaPen} />
      </Button> }
      </HStack>
      {add ? <Textarea 
        borderRadius="8px"
        px={4}
        py={2}
        bg="rgba(255,255,255,0.1)"
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setEdit(true)}
        color="gray.400"
        fontSize="18px"
        placeholder="Add task description"
        _placeholder={{
          fontStyle: "italic",
          color: "veryLightGray.100",
          fontSize: "sm",
        }}
      /> : ''}
    {task.Description !== '' ?  <Editable defaultValue={task.Description}>
        <EditablePreview color="veryLightGray.100" fontSize="18px" />
        <Textarea
          as={EditableTextarea}
          borderRadius="8px"
          px="4px"
          py="2px"
          bg="rgba(255,255,255,0.1)"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setEdit(true)}
          color="veryLightGray.100"
          fontSize="18px"
          placeholder="Edit task description"
          _placeholder={{
            fontStyle: "italic",
            color: "gray.400",
            fontSize: "sm",
          }}
        /> 
        </Editable>
        : ''}
      
      {edit || add ? (
        <HStack spacing={4}>
          <Button
            colorScheme="green"
            onClick={() => {
                setAdd (false);
              setEdit(false);
              editTask();
            }}
          >
            save
          </Button>
          <Button colorScheme="ghost" onClick={() => {
            setAdd (false)
            setEdit(false)}}>
            cancel
          </Button>
        </HStack>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default AddDescription;
