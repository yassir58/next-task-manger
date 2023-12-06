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
      <div className="mx-auto flex h-[90vh] w-[98%] justify-between rounded-[12px] bg-[#2A2D32]">
        {taskStatus.map((item: TaskStatus, index: number) => {
          return <List key={index} taskType={item.label} color={item.color} taskStatus={item.status} boardId={boardId!}/>;
        })}
      </div>
  );
};

export default page;
