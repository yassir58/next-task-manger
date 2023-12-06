'use client'
import { useContext, useState } from "react";
import { Stack, Input, Text, HStack, Button } from "@chakra-ui/react";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaImage, FaPlus } from "react-icons/fa6";
import ui from "../../styles/ui-module.module.css";
import { ModalWrapper } from "./ui/Modal";
import { SetCover } from "./SetCover";
import { Cover } from "./ui/Cover";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { MdOutlinePublic } from "react-icons/md";
import { modalContext } from "./ui/Modal";

interface props {}

const NewWorkspace: React.FC<props> = ({}) => {

    const {data:session} = useSession ()
    const [cover, setCover] = useState ('')
    const [visibility, setVisibility] = useState ('Private')
    const [name, setName] = useState ('')
    const {onClose} = useContext (modalContext)
    const utils = trpc.useUtils ()

    const toggleVisiblity = () => {
        if (visibility === 'Private')
            setVisibility ('Public')
        else
            setVisibility ('Private')
    }
    const NewWorkspaceMutation = trpc.workspaceRouter.newWorkspace.useMutation ({
        onSuccess: () => {
            utils.workspaceRouter.invalidate ()
            toast.success ('Workspace created successfully')},
        onError: () => toast.error ('Failed to create workspace')
    })
    const handleSubmit  = () =>{
        NewWorkspaceMutation.mutateAsync ({
            name:name,
            ownerId:session?.user.id!,
            visibility: visibility,
            cover: cover
        })
        setName ('')
        onClose!()
    }
  return (
    <Stack spacing={4} justifyContent="center" alignItems="center">
        {cover.length && <Cover image={cover} />}
      <Stack spacing={3} w="100%">
        <Text fontSize="14px" color="veryLightGray.100">
          Workspace name:{" "}
        </Text>
        <Input placeholder="your workspace name" variant="regular" value={name} onChange={(e) => setName (e.target.value)} />
      </Stack>
      <HStack spacing={4} w='100%'>
        <Button w='100%' variant="lightGhost" onClick={() => toggleVisiblity ()}>
            <Text>{visibility}</Text>
            {visibility === 'Public' ? <MdOutlinePublic /> : <RiGitRepositoryPrivateFill />}
        </Button>
        <ModalWrapper title='Workspace cover' size='xs' variant='lightGhost' value={
            <>
            <Text>Cover</Text>
            <FaImage />
            </>
        }>
            <SetCover coverSetter={setCover}/>
        </ModalWrapper>
      </HStack>
      <Button className={`${ui.Grad}`} variant='action' onClick={handleSubmit}>
        <Text>Create</Text>
      </Button>
    </Stack>
  );
};

export default NewWorkspace;
