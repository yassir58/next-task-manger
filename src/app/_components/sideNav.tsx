"use client";
import { useContext, useState } from "react";
import { trpc } from "../_trpc/client";
import { authContext } from "../context/contexts";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { NavBarLinks } from "./NavBarLinks";
import { useSession } from "next-auth/react";
import Avatar from "react-avatar";
import Input from "./ui/Input";
import PrimaryButton, {DangerButton} from "./ui/Buttons";
import { signOut } from "next-auth/react";
import { Skeleton } from "@chakra-ui/react";
import {z} from 'zod'

interface props {}
export const SideNav: React.FC<props> = ({}) => {
  const [name, setName] = useState("");
  const utils = trpc.useUtils();
  const { data: session } = useSession();
  const schema = z.string ().min (5)

  const boardsMutation = trpc.boardRouter.createBoard.useMutation({
    onError: (err: any) => toast.error ('failed to create board'),
    onSuccess: (data: any) => {
      utils.boardRouter.invalidate();
      toast.success("success: board created succesfully");
    },
  });
  const newBoard = () =>
  {
    try {
      schema.parse (name)
      boardsMutation.mutateAsync({
        userid: session?.user?.id!,
        boardName: name,
      });
    setName ('')
    } catch (erro:any){
      toast.error ('Invalid input')
    }
  }

    const handleLogout = () => {
        signOut({
            redirect: true,
            callbackUrl: `http://localhost:3000/login`
        });
      }

      const handleEnter = (e:any)=>{
        if (e.key === 'Enter')
            newBoard ()
    }
      
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 gap-4">
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-md bg-[#2A2D32] p-4 md:h-20"
        href="/"
      >
        <div className="flex items-center justify-start gap-4 ">
          {session?.user ? 
          (
            <>
            <Avatar
            name={session?.user.name}
            size="60"
            color={"#6DB9EF"}
            round={true}
          />
          <p className="text-bold text-gray-50">{session?.user.name}</p>
            </>
          ) : <Skeleton height='10px' />}
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 h-full">
        <div className="flex flex-col gap-5 h-full">
          <Input
            input={name}
            setInput={setName}
            placeHolder="Your board name"
            handleEnter={handleEnter}
          />
          <PrimaryButton handleClick={newBoard} value='Create Board' />
        <NavBarLinks />
        </div>

      </div>
       <DangerButton handleClick={handleLogout} value='Logout' />
    </div>
  );
};
