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
  editDisc: boolean
  setEditDisc: (value:boolean) => void
}
const AddDescription: React.FC<props> = ({ task, editDisc, setEditDisc }) => {
  const utils = trpc.useUtils();
  const [value, setValue] = useState(task.Description);
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
          
      {editDisc ? (
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
                setEditDisc(false);
              }}
            >
              save
            </button>
            <button
              className="btn-ghost-regular"
              onClick={() => {
                setEditDisc(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <h2 className="text-sm  text-mediumGray">
          {task.Description}
        </h2>
      )}
    </div>
  );
};

export default AddDescription;
