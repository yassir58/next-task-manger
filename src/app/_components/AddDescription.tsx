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
  const [value, setValue] = useState(task.Description);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
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
      cover: task.coverImage,
    });
  };
  return (
    <div className="group relative">
          <div onClick={() => setEdit (true)} className={`hidden absolute right-0 group-hover:${edit ? 'hidden' : 'flex'} bg-lines/30 text-mainPurple px-6 py-8 justify-center items-center w-full h-full `}>
            <button className='btn-regular-primary rounded-full' >
                <FaPen className='text-sm'/>
            </button>
          </div>
      {edit ? (
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <textarea
          rows={3}
          cols={30}
            className="input-regular"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="btn-primary"
              onClick={() => {
                editTask();
                setEdit(false);
              }}
            >
              save
            </button>
            <button
              className="btn-ghost-regular"
              onClick={() => {
                setEdit(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <h2 className="text-sm font-semibold text-mediumGray">
          {task.Description}
        </h2>
      )}
    </div>
  );
};

export default AddDescription;
