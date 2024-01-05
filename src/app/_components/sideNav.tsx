"use client";
import { useContext, useState } from "react";
import { trpc } from "../_trpc/client";
import { authContext, sideNavContext } from "../context/contexts";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { NavBarLinks } from "./NavBarLinks";
import { useSession } from "next-auth/react";
import Input from "./ui/Input";
import PrimaryButton, { DangerButton } from "./ui/Buttons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { BiHide } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Modal, { modalContext } from "./ui/Modal";

import { z } from "zod";
import DarkLogo from "./ui/icons/darkLogo";
import BoardIcon from "./ui/icons/BoardIcon";
import Popover from "./ui/Popover";
import DarkModeSwitcher from "./DarkModeSwitcher";
import LightLogo from "./ui/icons/lightLogo";
import Logo from "./ui/icons/Logo";
interface props {}

export const NewBoard: React.FC<props> = ({}) => {
  const [name, setName] = useState("");
  const utils = trpc.useUtils();
  const { data: session } = useSession();
  const schema = z.string().min(5);
  const pathname = usePathname();
  const workspaceId = pathname.split("/")[2];
  const {onClose} = useContext (modalContext)
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
      setName ('')
      onClose && onClose ()
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
  const boardId = pathname.split ("/")[4]
  const {visible, setVisible} = useContext (sideNavContext)
  const { data: boards } = trpc.boardRouter.getBoards.useQuery({
    workspaceId: workspaceId!,
  });

  return (
    <div className={`dark:bg-darkGray bg-white hidden  ${visible ? 'md:flex' : ''} h-[100vh] w-[320px] flex-col gap-4 dark:border-r-[#3E3F4E] border-r-[1px] border-r-lines py-3`}>
      <div className="px-12 py-3">
    <Logo />
      </div>
        <h2 className="text-md px-12 py-4 text-mediumGray">ALL BOARDS ({boards ? boards!.length : 0})</h2>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-col items-start justify-start gap-4 max-h-[40vh] overflow-y-auto">
          {boards && boards!.map((item, index) => {
            return (
                <button className={`${item.id === boardId! ? 'btn-nav-active' : 'btn-nav'}`} onClick={() => router.replace (`/w/${workspaceId}/boards/${item.id}`)} key={index}>
                <BoardIcon active={item.id === boardId!}/>
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

      <div className='flex flex-col gap-2'>
      <button className='btn-ghost-primary' onClick={() => setVisible && setVisible (false)}>
      <div className="flex w-full items-center justify-between">
              <p>Hide sidenav</p>
              <BiHide />
            </div>
      </button>
      <DarkModeSwitcher />
      </div>
    </div>
  );
};
