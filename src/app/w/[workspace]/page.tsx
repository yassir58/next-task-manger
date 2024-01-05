"use client";
import { Stack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import WorkspaceHeader from "~/app/_components/WokspceHeader";

interface props {}
const page: React.FC<props> = ({}) => {
  // const pathname = usePathname ()
  // const workspaceId = pathname.split ('/')[2]

  return (
    <div className={` flex h-[100vh] w-full flex-col items-center `} >
      <WorkspaceHeader />
      <div className='w-full h-full flex justify-center items-center dark:bg-veryDarkGray'>
      <p className='text-mediumGray text-md font-semibold'>This workspace is empty</p>
      </div>
    </div>
  );
};

export default page;
