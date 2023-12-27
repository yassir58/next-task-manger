import { FaPlus } from "react-icons/fa6";
import { AddTask } from "./AddTask";
import { usePathname } from "next/navigation";
import { trpc } from "../_trpc/client";
import Modal from "./ui/Modal";
import Popover from "./ui/Popover";
import { FaEllipsisV } from "react-icons/fa";
import BoardSettings from "./BoardSettings";
interface props {
  board: any;
}

const BoardHeader: React.FC<props> = ({ board }) => {
  return (
    <div className="bg-white flex w-[100%] items-center justify-between border-b-[1px] border-b-lines px-12 py-4">
      <h2 className="text-lg font-semibold text-darkGray">{board?.name}</h2>

     <div className='flex gap-4 justify-center items-center'>
     <Modal
        title="Add new task"
        cardModal={false}
        variant="btn-primary"
        size="lg"
        value={
          <div className="flex justify-center items-center gap-4">
            <p>Add Task</p>
            <FaPlus />
          </div>
        }
      >
        <AddTask boardId={board?.id!} />
      </Modal>
      <Popover title='settings' value={<FaEllipsisV className='text-mediumGray hover:text-mainPurple' />} position="bottom" variant="btn-unsyled">
        <BoardSettings />
      </Popover>
     </div>
    </div>
  );
};

export default BoardHeader;
