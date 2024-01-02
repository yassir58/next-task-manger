"use client";
import { HStack, Button, Icon, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { FaEllipsis, FaPlus } from "react-icons/fa6";
import { AddTask } from "./AddTask";
import Link from "next/link";
import { MdWorkspaces } from "react-icons/md";
import { trpc } from "../_trpc/client";
import ui from "../../styles/ui-module.module.css";
import { FaHome } from "react-icons/fa";
import { TbBell } from "react-icons/tb";
import Popover from "./ui/Popover";
import BoardSettings, { WorkspaceSettings } from "./BoardSettings";
import { FaEllipsisV } from "react-icons/fa";
import { InvitesList } from "./InvitesList";
import Modal from "./ui/Modal";

interface props {}
const WorkspaceHeader: React.FC<props> = ({}) => {
  const pathname = usePathname();
  const workspaceId = pathname.split("/")[2];
  const { data: workspace } = trpc.workspaceRouter.getWorkspaceById.useQuery({
    id: workspaceId!,
  });

  return (
    <div className="flex w-[100%] items-center justify-between border-b-[1px] border-b-lines bg-white px-12 py-4">
      <h2 className="text-lg font-semibold text-darkGray">{workspace?.name}</h2>

      <div className="flex items-center justify-center gap-6">
        <Modal
          title="Invites"
          cardModal={false}
          size='md'
          value={
            <TbBell className="text-lg mt-2 text-mediumGray hover:text-mainPurple" />
          }
          variant="btn-unsyled"
        >
          <InvitesList />
        </Modal>
        <Link href="/">
          <button className="btn-regular-primary">
            <FaHome className="text-md" />
          </button>
        </Link>
        <Popover
          title="Workspace settings"
          value={
            <FaEllipsisV className="text-mediumGray hover:text-mainPurple" />
          }
          position="bottom"
          variant="btn-unsyled"
        >
          <WorkspaceSettings />
        </Popover>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
