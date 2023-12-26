import { HStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { AddTask } from "./AddTask";
import { usePathname } from "next/navigation";
import { trpc } from "../_trpc/client";
import Modal from "./ui/Modal";
interface props {
  board: any;
}

const BoardHeader: React.FC<props> = ({ board }) => {
  return (
    <div className="bg-white flex w-[100%] items-center justify-between border-b-[1px] border-b-lines px-12 py-4">
      <h2 className="text-lg font-semibold text-darkGray">{board?.name}</h2>

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
    </div>
  );
};

export default BoardHeader;
