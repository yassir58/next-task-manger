"use client";
import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { FaEllipsis, FaPlus } from "react-icons/fa6";
import { AddTask } from "./AddTask";
import Link from "next/link";
import { MdWorkspaces } from "react-icons/md";
import { trpc } from "../_trpc/client";
import ui from '../../styles/ui-module.module.css'
import { InviteToWorkspace } from "./InviteUser";
import { FaHome } from "react-icons/fa";


interface props {}
const WorkspaceHeader: React.FC<props> = ({}) => {

  const pathname = usePathname ()
  const workspaceId = pathname.split("/")[2];
  const {data:workspace} = trpc.workspaceRouter.getWorkspaceById.useQuery ({
    id : workspaceId!
  })

  return (
    <div className='bg-white flex w-[100%] items-center justify-between border-b-[1px] border-b-lines px-12 py-4'>
      <h2 className='text-darkGray text-lg font-semibold'>{workspace?.name}</h2>

     <div className='flex gap-6 justify-center items-center'>
    <Link href='/'>
    <button className="btn-regular-primary">
      <FaHome className='text-md'/>
     </button>
    </Link>
      <FaEllipsis className='text-mediumGray text-md hover:scale-105' />
     </div>
    </div>
  );
};

export default WorkspaceHeader;
