"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { trpc } from "~/app/_trpc/client";
import { FaPlus } from "react-icons/fa6";
import { List } from "~/app/_components/List";
import { taskStatus } from "../../../../../../constants";
import { ModalWrapper } from "~/app/_components/ui/Modal";
import { AddTask } from "~/app/_components/AddTask";

interface props {}

const page: React.FC<props> = ({}) => {
  const pathname = usePathname();
  const boardId = pathname.split("/")[4];
  const { data } = trpc.boardRouter.getBoardById.useQuery({
    id: boardId!,
  });

  return (
    <div className="mx-auto mt-4 grid h-[96vh] w-[98%] grid-rows-[10vh_1fr] items-center gap-6 rounded-[12px]  bg-[#2A2D32]">
      <div className="flex w-[100%] items-center justify-between px-4">
        
        {<h2 className="text-3xl font-bold text-[#C4C1BB]">{data?.name}</h2>}
        <ModalWrapper
          title="Create task"
          value={
            <div className="flex gap-4">
              <p className="text-sm">add task</p>
              <FaPlus fontSize="16px" />
            </div>
          }
          variant='regular'
        >
          <AddTask boardId={boardId!} />
        </ModalWrapper>
      </div>
      <div className="mx-auto flex h-[98%] w-[98%] justify-between rounded-[12px] bg-[#2A2D32]">
        {taskStatus.map((item: TaskStatus, index: number) => {
          return <List key={index} taskType={item.label} color={item.color} taskStatus={item.status} boardId={boardId!}/>;
        })}
      </div>
    </div>
  );
};

export default page;
