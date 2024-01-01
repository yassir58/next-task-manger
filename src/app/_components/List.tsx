import { GoDotFill } from "react-icons/go";
import { trpc } from "../_trpc/client";
import { Card } from "./ui/Cards";
import Modal from "./ui/Modal";
import { EditTask } from "./EditTask";

interface props {
  column: any;
}

export const List: React.FC<props> = ({ column }) => {
  const { data: tasks } = trpc.taskRouter.getTasks.useQuery({
    columnId: column.id!,
  });
  return (
    <div className="flex h-[100%] min-w-[250px] max-w-[300px] flex-col gap-6">
      <div className="flex items-center justify-start gap-3">
        <GoDotFill fontSize="18px" color={column.color} />
        <p className=" text-l font-semibold text-mediumGray">
          {tasks?.length ? `${column.name} (${tasks?.length})` : column.name}
        </p>
      </div>
      <div className="flex max-h-[90%] w-[98%] flex-col justify-start gap-4 overflow-y-auto p-4">
        {tasks &&
          tasks!.map((item: any, index: number) => {
            return (
              <Modal
                size='xl'
                title=""
                card={<Card task={item} key={index} />}
                cardModal={true}
              >
                <EditTask task={item} />
              </Modal>
            );
          })}
      </div>
    </div>
  );
};
