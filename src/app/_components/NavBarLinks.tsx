'use client'
import Link from "next/link";
import { trpc } from "../_trpc/client";
import { useContext } from "react";
import { authContext } from "../context/contexts";
interface props {}

export const NavBarLinks:React.FC<props> = ({})=>{
    const {loggedInUser} = useContext (authContext)
    const { data, isLoading } = trpc.boardRouter.getBoards.useQuery(
        { userid: loggedInUser?.id! },
        {
          onError: (error: any) => console.log("fetching error : ", error),
        },
      );
    return (<>
        {data?.map((link) => {
          return (
            <Link
              key={link.name}
              href={`/boards/${link.id}`}
              className={'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>)
}