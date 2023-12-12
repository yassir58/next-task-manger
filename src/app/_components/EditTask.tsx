import { useState, useContext, useRef } from "react";
import { ModalWrapper, modalContext } from "./ui/Modal";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
import { SelectInput } from "./ui/Input";
import { Cover } from "./ui/Cover";
import {
  Icon,
  Stack,
  Text,
  EditablePreview,
  EditableInput,
  Editable,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { actions } from "../../../constants";
import DeleteTask from "./DeleteTask";
import { FaCheck } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import AddSubtask from "./AddSubtask";
import { SetCover } from "./SetCover";
import Subtasks from "./Subtasks";
import AddDescription from "./AddDescription";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import AddAttachements from "./AddAttachements";
import AttachmentsList from "./AttachmentsList";
interface props {
  task: Task;
}

export const EditTask: React.FC<props> = ({ task }) => {
  const [input, setInput] = useState(task.content);
  const { onClose } = useContext(modalContext);
  const [onEdit, setOnEdit] = useState(false);
  const [ready, setReady] = useState(false);
  const [cover, setCover] = useState(task.coverImage);
  const utils = trpc.useUtils();
  const actionsMap = new Map();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const changeCover = () => {
    editTaskMutation.mutateAsync({
      id: task.id!,
      content: input,
      status: task.status,
      description: task.Description,
      cover: cover,
    });
  };
  actionsMap.set("Delete Task", <DeleteTask task={task} />);
  actionsMap.set("Add Subtask", <AddSubtask task={task} />);
  actionsMap.set ('Add attachement', <AddAttachements task={task} />)
  actionsMap.set(
    "Change Cover",
    <SetCover coverSetter={setCover} submitHandler={changeCover} />,
  );

  const editTaskMutation = trpc.taskRouter.editeTask.useMutation({
    onSuccess: (data: any) => {
      toast.success("Task edited successfully");
      utils.taskRouter.invalidate();
    },
    onError: (err: any) => toast.error("Error: failed to edite task"),
  });

  const editTask = () => {
    editTaskMutation.mutateAsync({
      id: task.id!,
      content: input,
      status: task.status!,
      description: task.Description,
      cover: task.coverImage,
    });
    // if (inputRef.current) inputRef.current.blur();
  };

  const handleTitleSubmit = (e: any) => {
    if (e.key === "Enter") {
      editTask();
    }
  };
  return (
    <div className="minH-[60vh] maxH-[60vh] flex w-full flex-col gap-6">
      {cover.length ? <Cover image={cover} /> : ""}
      <div className="grid h-full w-full grid-flow-row md:grid-cols-[1fr_200px] gap-4">
        <Stack
          spacing={12}
          maxH={"55vh"}
          minH="50vh"
          overflowY={"auto"}
          px={6}
          py={4}
        >
          // Click the text to edit
          <Editable defaultValue={task.content}>
            <EditablePreview
              color="veryLightGray.100"
              fontSize="24px"
              fontWeight={"bold"}
            />
            <InputGroup>
              <EditableInput
                bg="rgba(255,255,255,0.1)"
                px={2}
                _focus={{
                  outline: "none",
                  userselect: "none",
                  boxShadow: "none",
                }}
                onKeyDown={handleTitleSubmit}
                onBlur={() => {
                  setOnEdit(false);
                  setReady(true);
                }}
                onChange={(e) => setInput(e.target.value)}
                ref={titleInputRef!}
                onFocus={() => {
                  setOnEdit(true);
                }}
                color="veryLightGray.100"
                fontSize="24px"
              />
              {onEdit ? (
                <InputRightElement>
                  <IconButton
                    colorScheme="green"
                    aria-label=""
                    icon={<FaCheck />}
                  />
                </InputRightElement>
              ) : (
                ""
              )}
            </InputGroup>
          </Editable>
          {ready ? (
            <ButtonGroup>
              <Button
                colorScheme="green"
                onClick={() => {
                  setReady(false);
                  editTask();
                }}
              >
                save
              </Button>
              <Button colorScheme="ghost" onClick={() => setReady(false)}>
                cancel
              </Button>
            </ButtonGroup>
          ) : (
            ""
          )}
          <AddDescription task={task} />
          <AddComment task={task} />
          <CommentsList task={task} />
          <AttachmentsList task={task} />
          <Subtasks task={task} />
        </Stack>
        <Stack spacing={2}>
          {actions.map((action: any, index: number) => {
            return (
              <ModalWrapper
                title={action.actionName}
                variant="unstyled"
                value={
                  <div
                    key={index}
                    className="${ui.gradientBorder}  flex w-[98%] grow items-center justify-center gap-2 rounded-[8px] bg-gray-100 bg-opacity-10 p-2  text-sm font-medium text-[#A7A3A0] hover:bg-opacity-20  md:flex-none md:justify-start md:p-2 md:px-3 "
                  >
                    <Icon
                      as={action.icon}
                      color={action.status === "danger" ? "red.500" : "#A7A3A0"}
                    />
                    <Text
                      color={action.status === "danger" ? "red.500" : "#A7A3A0"}
                    >
                      {action.actionName}
                    </Text>
                  </div>
                }
              >
                {actionsMap.get(action.actionName)}
              </ModalWrapper>
            );
          })}
        </Stack>
      </div>
    </div>
  );
};
