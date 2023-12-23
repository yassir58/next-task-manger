"use client";
import { usePathname } from "next/navigation";
import { trpc } from "~/app/_trpc/client";
import { List } from "~/app/_components/List";
import { taskStatus } from "../../../../../../constants";
import { Stack } from "@chakra-ui/react";
import BoardHeader from "~/app/_components/BoardHeader";
interface props {}

const page: React.FC<props> = ({}) => {
  const pathname = usePathname();
  const boardId = pathname.split("/")[4];
  const { data:board } = trpc.boardRouter.getBoardById.useQuery({
    id: boardId!,
  });

  return (
    <Stack spacing={3}>
      <BoardHeader board={board!}/>

      <div className="mx-auto flex h-[90vh] w-[98%] justify-between rounded-[12px] bg-[#2A2D32]">
        {taskStatus.map((item: TaskStatus, index: number) => {
          return (
            <List
              key={index}
              taskType={item.label}
              color={item.color}
              taskStatus={item.status}
              boardId={boardId!}
            />
          );
        })}
      </div>
    </Stack>
  );
};

export default page;
