import { useState, useContext, useRef, useEffect } from "react";
import Modal, { modalContext } from "./ui/Modal";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
import { SelectInput } from "./ui/Input";
import { Cover } from "./ui/Cover";
import Popover from "./ui/Popover";
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
import { FaPen } from "react-icons/fa6";
import { FaImage, FaPaperclip } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
interface props {
  task: Task;
}

interface EditTaskSettingsProps {
  task: Task;
  setEditTitle: (value: boolean) => void;
  setEditDescription: (value: boolean) => void;
  setCover: (value: string) => void;
  changeCover: () => void;
}
const EditTaskSettings: React.FC<EditTaskSettingsProps> = ({
  setEditTitle,
  setEditDescription,
  task,
  setCover,
  changeCover,
}) => {
  const actionsMap = new Map();

  actionsMap.set("Edit title", {
    type: "button",
    func: () => setEditTitle(true),
  });
  actionsMap.set("Add Description", {
    type: "button",
    func: () => setEditDescription(true),
  });
  actionsMap.set("Edite Description", {
    type: "button",
    func: () => setEditDescription(true),
  });
  actionsMap.set("Delete Task", {
    type: "modal",
    component: <DeleteTask task={task} />,
    icon: <MdDelete />,
  });
  actionsMap.set("Add Subtask", {
    type: "modal",
    component: <AddSubtask task={task} />,
    icon: <IoMdCheckboxOutline />,
  });
  actionsMap.set("Add attachement", {
    type: "modal",
    component: <AddAttachements task={task} />,
    icon: <FaPaperclip />,
  });
  actionsMap.set("Change Cover", {
    type: "modal",
    component: <SetCover coverSetter={setCover} submitHandler={changeCover} />,
    icon: <FaImage />,
  });

  return (
    <div className={"flex flex-col items-start justify-center gap-2"}>
      {actions.map((action: any, index: number) => {
        if (actionsMap.get(action.actionName)?.type === "button")
          return (
            <button
              className="btn-link"
              onClick={actionsMap.get(action.actionName)?.func}
            >
              {action.actionName}
            </button>
          );
        return (
          <Modal
            title={action.actionName}
            cardModal={false}
            value={
              <div className="flex w-full items-center justify-between">
                <p>{action.actionName}</p>
                {actionsMap.get(action.actionName)?.icon}
              </div>
            }
            variant="btn-setting"
          >
            {actionsMap.get(action.actionName)?.component}
          </Modal>
        );
      })}
    </div>
  );
};

export const EditTask: React.FC<props> = ({ task }) => {
  const [input, setInput] = useState(task.content);
  const { onClose } = useContext(modalContext);
  const [onEdit, setOnEdit] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [ready, setReady] = useState(false);
  const [cover, setCover] = useState(task.coverImage);
  const utils = trpc.useUtils();

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
    <div className="mx-auto flex h-full w-full items-center justify-center px-16">
      <div className="flex h-full w-full  flex-col gap-8">
        {cover.length ? <Cover image={cover} /> : ""}
        <div className="flex  w-full flex-col  gap-8 py-16">
          <div className="flex w-full justify-between">
            {onEdit ? (
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <input
                  className="input-regular"
                  value={input}
                  onKeyDown={handleTitleSubmit}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      editTask();
                      setOnEdit(false);
                    }}
                  >
                    save
                  </button>
                  <button
                    className="btn-ghost-regular"
                    onClick={() => {
                      setOnEdit(false);
                    }}
                  >
                    cancel
                  </button>
                </div>
              </div>
            ) : (
              <h2 className="text-xl font-semibold text-veryDarkGray">
                {task.content}
              </h2>
            )}

            <Popover
              title="settings"
              value={
                <FaEllipsisV className="text-mediumGray hover:text-mainPurple" />
              }
              position="bottom"
              variant="btn-unsyled"
            >
              <EditTaskSettings
                task={task}
                setCover={setCover}
                changeCover={changeCover}
                setEditTitle={setOnEdit}
                setEditDescription={setEditDesc}
              />
            </Popover>
          </div>
          <AddDescription
            task={task}
            editDisc={editDesc}
            setEditDisc={setEditDesc}
          />
          <AddComment task={task} />

          <Subtasks task={task} />
          <CommentsList task={task} />

          <AttachmentsList task={task} />
        </div>
      </div>
    </div>
  );
};
