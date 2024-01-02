import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { trpc } from "~/app/_trpc/client";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
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
    <div className="flex w-full justify-between items-center btn-del-col group">
      <div className='flex gap-4 justify-center items-center'>
        {subtask.done === false? (
          <MdCheckBoxOutlineBlank
            onClick={editeSubtask}
            className='text-mediumGray text-[18px] hover:scale-105'
          />
        ) : (
          <IoMdCheckboxOutline
            onClick={editeSubtask}
            className='text-mainPurple hover:scale-105 text-[18px]'
          />
        )}
        <p className='text-mediumGray font-semibold'>
          {subtask.content}
        </p>
      </div>

      <RxCross2 className='text-mainRed hidden  hover:scale-105 group-hover:block  text-[18px]' onClick={deleteSubtask} />

    </div>
  );
};

export default Subtask;
