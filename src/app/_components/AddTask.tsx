"use client";
import { useContext, useRef, useState } from "react";
import { SelectInput } from "./ui/Input";
import { trpc } from "../_trpc/client";
import { modalContext } from "./ui/Modal";
import toast from "react-hot-toast";
import { z } from "zod";
import { SetCover } from "./SetCover";
import { HStack, Text } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import { Cover } from "./ui/Cover";
import ui from "../../styles/ui-module.module.css";
import Modal from "./ui/Modal";
import { taskStatus } from "../../../constants";
import { GoDotFill } from "react-icons/go";
interface props {
  boardId: string;
}
export const AddTask: React.FC<props> = ({ boardId }) => {
  const [input, setInput] = useState("");
  const schema = z.string().min(5);
  const { onClose } = useContext(modalContext);
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const utils = trpc.useUtils();
  const { data: columns } = trpc.columnRouter.getAll.useQuery({
    boardId: boardId!,
  });
  const [status, setStatus] = useState(columns ? columns[0]?.name! : "");
  const createTaskMutation = trpc.taskRouter.createTask.useMutation({
    onSuccess: (data: any) => {
      toast.success("Task created successfully");
      utils.taskRouter.invalidate();
    },
    onError: (err: any) => toast.error("Error: failed to create task"),
  });

  const addTask = () => {

    if (status === '')
      toast.error ('you must select a column')
    else  {
      try {
        schema.parse(input);
        createTaskMutation.mutateAsync({
          columnId:columns?.find (column => column.name === status)?.id!,
          content: input,
          status: status,
          coverImage: cover!,
          description: description!,
        });
      } catch (err: any) {
        toast.error("Error: Invalid input");
      }
    }
  };
  return (
    <div className="flex flex-col gap-6">
      {cover.length ? <Cover image={cover} /> : ""}
      <div className="flex flex-col items-start justify-start gap-3">
        <label htmlFor="title" className="font-semibold text-mediumGray">
          Task title
        </label>
        <input
          id={"title"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="task exmp:finish x project"
          className="input-regular"
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-3">
        <label htmlFor="description" className="font-semibold text-mediumGray">
          Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
        recharge the batteries a little."
          className="input-regular"
          id="description"
          cols={30}
          rows={4}
        />
      </div>
      <Modal
        title="Set cover"
        cardModal={false}
        variant="btn-action"
        value={
          <div className="item-center flex w-full justify-between">
            <Text>Cover</Text>
            <FaImage />
          </div>
        }
      >
        <SetCover coverSetter={setCover} />
      </Modal>
      <select
        className="rounded-sm border-2 border-mediumGray/25 bg-transparent px-4 py-2 font-semibold text-darkGray  active:ring-2 active:ring-mainPurple"
        onChange={(e) => setStatus(e.target.value)}
      >
        {columns &&
          columns.map((item, index) => {
            return (
              <option
                key={index}
                value={`${item.name}`}
                className="flex gap-4 border-[1px] border-lines px-6 py-4 font-semibold text-mediumGray"
              >
                <p className="font-semi-bold text-l">{item.name}</p>
              </option>
            );
          })}
      </select>
      <button
        className={`btn-primary`}
        onClick={() => {
          addTask();
          onClose!();
        }}
      >
        add
      </button>
    </div>
  );
};
