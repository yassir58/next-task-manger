"use client";
import {  Stack, Input } from "@chakra-ui/react";
import ui from '../../styles/ui-module.module.css'
import { UploadButton } from "../../utils/uploadThing";
import { useContext, useState } from "react";
import { modalContext } from "./ui/Modal";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";


interface props {
  task: Task;
}
const AddAttachements: React.FC<props> = ({ task }) => {

  const [value, setValue] = useState("");
  const {onClose} = useContext (modalContext)
  const utils = trpc.useUtils ()
  const addAttachmentMutation = trpc.attachmentRouter.createAttachment.useMutation ({
    onSuccess: () => {
      utils.attachmentRouter.invalidate ()
      toast.success ('Attachment created successfully')},
    onError: () => toast.error ('Failed to create attachment')
  })
  const createAttachment = (path:string) =>{
    try {
        addAttachmentMutation.mutateAsync ({
          taskId: task.id,
          name: value,
          path:path
        })
        onClose! ()
    }catch (error:any){
        console.log ('error : ', error)
    } 
  }
  return (
    <Stack w={'100%'} justifyContent={"center"} alignItems={"center"} spacing={10}>
        <Input
          w='100%'
          value={value}
          placeholder="your attachment name"
          variant={"regular"}
          onChange={(e) => setValue(e.target.value)}
        />
        <UploadButton
          endpoint="attachmentUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            createAttachment (res[0]?.url!)
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log ('upload error: ', error)
          }}

        />
    
    </Stack>
  );
};
export default AddAttachements;
