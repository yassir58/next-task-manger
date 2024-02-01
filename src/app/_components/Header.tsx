"use client";
import React, { useEffect, useState } from "react";
import { MdTaskAlt } from "react-icons/md";
import ui from "../../styles/ui-module.module.css";
import Modal from "./ui/Modal";
import NewWorkspace from "./NewWorkspace";
import { MdWorkspaces } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useAuth from "~/hooks/useAuth";
import LightLogo from "./ui/icons/lightLogo";
import DarkLogo from "./ui/icons/darkLogo";
import { trpc } from "../_trpc/client";
import Avatar from "./ui/Avatar";
import { TbBell } from "react-icons/tb";
import Popover from "./ui/Popover";
import { FaEllipsisV } from "react-icons/fa";
import { InvitesList } from "./InvitesList";
import { HomeSettings } from "./BoardSettings";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { useRouter } from "next/navigation";
import Logo from "./ui/icons/Logo";
interface props {}

interface WorkspaceProps {}

const Header: React.FC<props> = ({}) => {
  const { user, session } = useAuth();  
  const router = useRouter ()
  

  
  useEffect (()=> {
    if (!session?.user)
      router.push ('/login')
  })
    return (
    <div
      className={`bg-white dark:bg-darkGray dark:border-b-[#3E3F4E] flex w-[100%] items-center justify-between border-b-[1px] border-b-lines px-16 py-2`}
    >
      <Logo />
<div className='flex gap-8 justify-center items-center  h-full'>
 <DarkModeSwitcher /> 
      <Modal
          title="Invites"
          cardModal={false}
          size='md'
          value={
            <TbBell className="text-lg mt-2 text-mediumGray hover:text-mainPurple" />
          }
          variant="btn-unsyled mb-2"
        >
          <InvitesList />
        </Modal>
      <Avatar size='w-12 h-12' image={user?.profileImage!} name={user?.name!} />
        
        <Popover
          title="Workspace settings"
          value={
            <FaEllipsisV className="text-mediumGray hover:text-mainPurple" />
          }
          position="bottom"
          variant="btn-unsyled"
        >
          <HomeSettings />
        </Popover>
</div>
    </div>
  );
};

export const WorkspaceHeader: React.FC<WorkspaceProps> = ({}) => {
  return <div className="w-full px-16 py-16 flex justify-between items-center">
    <h2 className="text-verDarkGray font-semibold text-2xl dark:text-white">Your Workspaces</h2>

    <Modal value='create workspace' title="Create new workspace" variant="btn-primary" cardModal={false}>
      <NewWorkspace />
    </Modal>
  </div>;
};

export default Header;
