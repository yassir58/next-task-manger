import { useState, useContext, useRef } from "react";
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
import { FaImage, FaPaperclip } from 'react-icons/fa6';
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
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
  
  actionsMap.set("Delete Task", {component:<DeleteTask task={task} />, icon:<MdDelete/>});
  actionsMap.set("Add Subtask", {component:<AddSubtask task={task} />, icon:<IoMdCheckboxOutline/>});
  actionsMap.set("Add attachement", {component:<AddAttachements task={task} />, icon:<FaPaperclip/>});
  actionsMap.set(
    "Change Cover",
    {component: <SetCover coverSetter={setCover} submitHandler={changeCover} />, icon:<FaImage/>},
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
    <div className="flex h-full w-full items-center justify-center mx-auto">
      <div className="flex h-full w-full  flex-col gap-6">
        {cover.length ? <Cover image={cover} /> : ""}
        <div className="grid h-full w-full grid-flow-row gap-8 md:grid-cols-[1fr_200px]">
          <div className="flex max-h-[55vh] min-h-[50vh] w-full flex-col  gap-8 py-3">
            <div className="flex w-full justify-between">
              {onEdit ? (
                <div className="flex flex-col items-start justify-start gap-2 w-full">
                  <input className="input-regular" value={input} onKeyDown={handleTitleSubmit} onChange={(e) => setInput (e.target.value)}/>
                  <div className="flex gap-2">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        editTask ();
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

  <Popover title='settings' value={<FaEllipsisV className='text-mediumGray hover:text-mainPurple' />} position="bottom" variant="btn-unsyled">
    <p>some settings</p>    
    </Popover>
            </div>
            <AddDescription task={task} />
            {/* <AddComment task={task} /> */}
            <Subtasks task={task} />
          {/*
          <CommentsList task={task} />
          <AttachmentsList task={task} />
           */}
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            {actions.map((action: any, index: number) => {
            return (
              <Modal  title={action.actionName} cardModal={false} value={<div className='flex w-full justify-between items-center' > 
                <p>{action.actionName}</p>
                {actionsMap.get (action.actionName).icon}
              </div>} variant="btn-action">
                    {actionsMap.get (action.actionName).component}
              </Modal>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};
