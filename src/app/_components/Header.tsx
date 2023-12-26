"use client";
import React, { useState } from "react";
import { MdTaskAlt } from "react-icons/md";
import ui from "../../styles/ui-module.module.css";
import { FaPlus } from "react-icons/fa6";
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

interface props {}

interface WorkspaceProps {}

const Header: React.FC<props> = ({}) => {
  const { user } = useAuth();
  

  console.log ('user : ', user)
  return (
    <div
      className={`bg-white flex w-[100%] items-center justify-between border-b-[1px] border-b-lines px-16 py-2`}
    >
      {/* <LightLogo /> */}
      <DarkLogo />

      <Avatar image={user?.profileImage!} name={user?.name!} />
    </div>
  );
};

export const WorkspaceHeader: React.FC<WorkspaceProps> = ({}) => {
  return <div className="w-full px-16 py-16 flex justify-between items-center">
    <h2 className="text-black font-semibold text-2xl">Your Workspaces</h2>

    <Modal value='create workspace' title="Create new workspace" variant="btn-primary" cardModal={false}>
      <NewWorkspace />
    </Modal>
  </div>;
};

export default Header;
