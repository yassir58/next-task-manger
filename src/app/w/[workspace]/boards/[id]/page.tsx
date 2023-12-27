"use client";
import { usePathname } from "next/navigation";
import { trpc } from "~/app/_trpc/client";
import { List } from "~/app/_components/List";
import BoardHeader from "~/app/_components/BoardHeader";
import { FaPlus } from "react-icons/fa6";
import NewColumn from "~/app/_components/NewColumn";
import Modal from "~/app/_components/ui/Modal";
import toast from "react-hot-toast";
interface props {}

const page: React.FC<props> = ({}) => {
  const pathname = usePathname();
  const boardId = pathname.split("/")[4];
  const { data: board } = trpc.boardRouter.getBoardById.useQuery({
    id: boardId!,
  });
  const { data: columns } = trpc.columnRouter.getAll.useQuery({
    boardId: boardId!,
  });

  return (
    <div className="flex flex-col h-full w-full">
      <BoardHeader board={board} />
    {columns && columns.length ? <div className='h-full relative z-10 w-full flex justify-start gap-2 items-start px-6 py-4 max-w-[75vw] overflow-x-auto'>
      {columns.map ((item, index) => {
        return <List column={item} key={index} />
      })}
      <Modal variant="btn-column" title="Add new column" cardModal={false} value={<div className="flex gap-3 items-center justify-center">
                <p>New Column</p>
                <FaPlus />
              </div>}>
      <NewColumn boardId={board?.id!} />
      </Modal>
    </div> : (
        <div className="flex h-[100%]  items-center justify-center ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="font-semibold text-mediumGray">
            This board is empty, create a column to get started.
          </p>
          <Modal
            variant="btn-primary max-w-[250px]"
            title="Add new column"
            cardModal={false}
            value={
              <div className="flex gap-3 items-center justify-center">
                <p>Add New Column</p>
                <FaPlus />
              </div>
            }
          >
            <NewColumn boardId={board?.id!} />
          </Modal>
        </div>
      </div>
    )}
    </div>
  );
};

export default page;
