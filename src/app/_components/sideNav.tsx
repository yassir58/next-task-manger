"use client";
import { useContext, useState } from "react";
import { trpc } from "../_trpc/client";
import { authContext } from "../context/contexts";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { NavBarLinks } from "./NavBarLinks";
import { useSession } from "next-auth/react";
import Input from "./ui/Input";
import PrimaryButton, { DangerButton } from "./ui/Buttons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Skeleton,
  Avatar,
  HStack,
  Button,
  Text,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Modal from "./ui/Modal";

import { z } from "zod";
import DarkLogo from "./ui/icons/darkLogo";
import BoardIcon from "./ui/icons/BoardIcon";
import Popover from "./ui/Popover";

interface props {}

export const NewBoard: React.FC<props> = ({}) => {
  const [name, setName] = useState("");
  const utils = trpc.useUtils();
  const { data: session } = useSession();
  const schema = z.string().min(5);
  const pathname = usePathname();
  const workspaceId = pathname.split("/")[2];
  const { isLoading, data: workspace } =
    trpc.workspaceRouter.getWorkspaceById.useQuery({
      id: workspaceId!,
    });

  console.table(workspace);
  const boardsMutation = trpc.boardRouter.createBoard.useMutation({
    onError: (err: any) => toast.error("failed to create board"),
    onSuccess: (data: any) => {
      utils.boardRouter.invalidate();
      toast.success("success: board created succesfully");
    },
  });
  const newBoard = () => {
    try {
      schema.parse(name);
      boardsMutation.mutateAsync({
        workspaceId: workspaceId!,
        boardName: name,
      });
      setName("");
    } catch (erro: any) {
      toast.error("Invalid input");
    }
  };

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: `http://localhost:3000/login`,
    });
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") newBoard();
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4">
      <input
        className="input-regular"
        placeholder="your board's name"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleEnter}
      />
      <button className="btn-primary w-full" onClick={newBoard}>
        create board
      </button>
    </div>
  );
};

export const SideNav: React.FC<props> = ({}) => {
  const pathname = usePathname();
  const router = useRouter ()
  const workspaceId = pathname.split("/")[2];
  const { data: boards } = trpc.boardRouter.getBoards.useQuery({
    workspaceId: workspaceId!,
  });

  return (
    <div className="bg-white  fixed left-0 top-0 flex h-[100vh] w-[320px] flex-col gap-12 border-r-[1px] border-r-lines py-3">
      <div className="px-12 py-3">
        <DarkLogo />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-md px-12 py-4 text-mediumGray">ALL BOARDS ({boards ? boards!.length : 0})</h2>
        <div className="flex flex-col items-start justify-center gap-4 max-h-[50vh] overflow-y-auto pt-12">
          {boards && boards!.map((item, index) => {
            return (
                <button className="btn-nav" onClick={() => router.replace (`/w/${workspaceId}/boards/${item.id}`)} key={index}>
                <BoardIcon/>
                <p>{item.name}</p>  
                </button>
            );
          })}
        </div>
        <Popover
          header={true}
          title="Create new Board"
          variant="btn-ghost-primary"
          position='top'
          value={
            <div className="flex w-full items-center justify-between">
              <p>Create new board</p>
              <FaPlus />
            </div>
          }
        >
          <NewBoard />
        </Popover>
      </div>
    </div>
  );
};
