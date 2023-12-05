"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { MdTaskAlt } from "react-icons/md";
import UserNavBar from "./UserNavBar";
import ui from "../../styles/ui-module.module.css";
import { Text, HStack, Icon } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa6";
import { ModalWrapper } from "./ui/Modal";
import NewWorkspace from "./NewWorkspace";

interface props {
}

interface WorkspaceProps {}

const Header: React.FC<props> = ({  }) => {

  return (
    <div
      className={`${ui.Header} ${ui.Grad} flex w-[100%] items-center justify-between px-6 py-2`}
    >
      <HStack alignItems="center" w='96%'>
        <Icon as={MdTaskAlt} fontSize="20px" color='veryLightGray.100' />
        <Text fontSize="19px" fontWeight={"bold"} color='veryLightGray.100'>
          TaskManager
        </Text>
      </HStack>
      <UserNavBar />
    </div>
  );
};


export const WorkspaceHeader:React.FC<WorkspaceProps> = ({})=>{
  return (<HStack justifyContent={'space-between'} w='96%' mx={'auto'} my={16}>
    <Text fontSize="24px" fontWeight={"bold"} color='veryLightGray.100'>Workspaces</Text>
    <ModalWrapper value={<HStack spacing={4}>
        <Text fontSize={'15px'} color='secondary'>Add Workspace</Text>
        <FaPlus fontSize='18px'/> 
      </HStack>} title='Create Workspace' variant='regular'>
      <NewWorkspace />
    </ModalWrapper>
  </HStack>)
}

export default Header;
