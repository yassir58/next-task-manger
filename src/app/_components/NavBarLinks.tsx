"use client";
import Link from "next/link";
import { trpc } from "../_trpc/client";
import { useSession } from "next-auth/react";
import { BsFillGridFill } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { BoardsSkeleton } from "./ui/Skeletons";
import { useEffect } from "react";
import ui from '../../styles/ui-module.module.css'
interface props {}

export const NavBarLinks: React.FC<props> = ({}) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const workspaceId = pathname.split("/")[2];
  const activeBoard =
    pathname.split("/").length >= 5 ? pathname.split("/")[4] : "";
  const router = useRouter();
  const { data, isLoading } = trpc.boardRouter.getBoards.useQuery({
    workspaceId: workspaceId!,
  });

  console.log("active board", activeBoard);
  useEffect(() => {
    if (data && data!.length >= 1 && pathname === "/boards")
      router.replace(`/boards/${data[0]?.id}`);
  }, [data]);
  if (isLoading) return <BoardsSkeleton />;
  return (
    <div className="flex  max-h-[50vh] flex-col gap-2 overflow-auto">
      {data?.length ? (
        data?.map((link) => {
          return (
              <Link
                key={link.name}
                href={`/w/${workspaceId}/boards/${link.id}`}
                className={`flex  w-[98%] grow items-center ${ui.gradientBorder} justify-center gap-2 rounded-[8px] bg-[#2A2D32] bg-opacity-50 p-2  text-sm font-medium text-[#A7A3A0] hover:bg-opacity-70  md:flex-none md:justify-start md:p-2 md:px-3 `}
              >
                <BsFillGridFill />

                <p className="hidden md:block">{link.name}</p>
              </Link>
          );
        })
      ) : (
        <p className="text-[#C4C1BB]"> you have no boards </p>
      )}
    </div>
  );
};
