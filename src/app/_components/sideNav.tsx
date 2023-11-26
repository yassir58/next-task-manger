"use client";
import { useContext, useState } from "react";
import { trpc } from "../_trpc/client";
import { authContext } from "../context/contexts";
import { toast } from "react-hot-toast";
import Link from "next/link";
interface props {}
import { NavBarLinks } from "./NavBarLinks";

export const SideNav: React.FC<props> = ({}) => {
    const [name, setName] = useState("");
  const { loggedInUser } = useContext(authContext);
  const utils = trpc.useUtils();
  const boardsMutation = trpc.boardRouter.createBoard.useMutation({
    onError: (err: any) => console.log("mutation err: ", err),
    onSuccess: (data: any) => {
      utils.boardRouter.invalidate();
      toast.success("success: board created succesfully");
    },
  });
  console.log ('this is logged in user : ', loggedInUser)
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <p>task manager</p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className='flex flex-col gap-3'>
        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-gray-700"
      />
      <button
        className="bg-blue-600"
        onClick={() =>
          boardsMutation.mutateAsync({
            userid: loggedInUser?.id!,
            boardName: name,
          })
        }
      >
        new Board
      </button>
        </div>
        <NavBarLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
      </div>
    </div>
  );
};
