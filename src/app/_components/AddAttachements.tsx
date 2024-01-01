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
  const [uploaded, setUploaded] = useState<string | null> (null)
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
    <div className="flex flex-col gap-6">
      <div>
      <label htmlFor="title">Attachement title</label>
        <input
          id='title'
          className='input-regular'
          value={value}
          placeholder="your attachment name"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
            
       {uploaded ? <button className='btn-primary w-full' onClick={() => createAttachment (uploaded)}>create attachement</button> : <UploadButton
        className="mt-4 ut-button:bg-mainPurple ut-button:w-full ut-button:ut-readying:bg-secondaryPurple"
          endpoint="attachmentUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            setUploaded (res[0]?.url!)
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log ('upload error: ', error)
          }}

        />}
    
    </div>
  );
};
export default AddAttachements;
