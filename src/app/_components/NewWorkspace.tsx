"use client";
import { useContext, useState } from "react";
import { Stack, Input, Text, HStack, Button } from "@chakra-ui/react";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaImage, FaPlus } from "react-icons/fa6";
import ui from "../../styles/ui-module.module.css";
import { SetCover } from "./SetCover";
import { Cover } from "./ui/Cover";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { MdOutlinePublic } from "react-icons/md";
import Modal, { modalContext } from "./ui/Modal";
import useAuth from "~/hooks/useAuth";

interface props {}

const NewWorkspace: React.FC<props> = ({}) => {
  const { user } = useAuth();
  const [cover, setCover] = useState("");
  const [visibility, setVisibility] = useState("Private");
  const [EditCoverOn, setEditCover] = useState (false)
  const [name, setName] = useState("");
  const { onClose } = useContext(modalContext);
  const utils = trpc.useUtils();

  const toggleVisiblity = () => {
    if (visibility === "Private") setVisibility("Public");
    else setVisibility("Private");
  };
  const NewWorkspaceMutation = trpc.workspaceRouter.newWorkspace.useMutation({
    onSuccess: () => {
      utils.workspaceRouter.invalidate();
      toast.success("Workspace created successfully");
    },
    onError: () => toast.error("Failed to create workspace"),
  });
  const handleSubmit = () => {
    NewWorkspaceMutation.mutateAsync({
      name: name,
      ownerId: user?.id!,
      visibility: visibility,
      cover: cover,
    });
    setName("");
    onClose!();
  };
  return (
    <>
      {EditCoverOn ? (
        <SetCover coverSetter={setCover} cancelHandler={setEditCover} />
      ) : (
        <div className="flex flex-col gap-5">
          {cover.length ? <Cover image={cover} /> : ""}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-veryDarkGray">
              Workspace name
            </h2>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Workspace name"
              className="input-regular"
            />
          </div>
          <div className="flex w-full gap-4">
            <button className="btn-action" onClick={ () => setEditCover (true)}>
              <div className="flex w-full justify-between item-center">
              <Text>Cover</Text>
              <FaImage />
              </div>
            </button>
            <button className="btn-action" onClick={toggleVisiblity}>
              <div className="flex w-full justify-between item-center">
              <Text>{visibility}</Text>
              {visibility === 'Private' ? <RiGitRepositoryPrivateFill/>: <MdOutlinePublic/>}
              </div>
            </button>
          </div>
          <button className="btn-primary w-full" onClick={handleSubmit}>Create Workspace</button>
        </div>
      )}
    </>
  );
};

export default NewWorkspace;

{
  /* <ModalWrapper title='Workspace cover' buttonWidth='100%' size='xs' variant='lightGhost' value={
  <>
  <Text>Cover</Text>
  <FaImage />
  </>
}>
  <SetCover coverSetter={setCover}/>
</ModalWrapper> */
}
