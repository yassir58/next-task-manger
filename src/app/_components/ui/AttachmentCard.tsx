import { trpc } from "~/app/_trpc/client"
import toast from "react-hot-toast"
import Avatar from "./Avatar"
interface props {
    attachment: Attachment
}
const AttachmentCard:React.FC<props> = ({attachment}) => {

    const utils= trpc.useUtils ()
    const deleteAttachmentMutation = trpc.attachmentRouter.deleteAttachment.useMutation ({
        onSuccess: () => {
            toast.success ('Attachment created successfully')
            utils.attachmentRouter.invalidate ()
        },
        onError: () => {
            toast.error ('Failed to delete attachment')
        }
    })

    const deleteAttachment = () => {
        deleteAttachmentMutation.mutateAsync ({
            id: attachment.id
        })
    }
    return (<div className='flex gap-4 p-2 rounded-md bg-lines/30 dark:bg-veryDarkGray'>
        <img src={attachment.path} className='w-[80px] h-auto object-cover rounded-md'/>
        <div className="flex flex-col gap-3">
            <p className='text-veryDarkGray dark:text-mediumGray'>
                {attachment.name}
            </p>
            <div className='flex gap-4'>
                <button className="outline-danger" onClick={deleteAttachment}>Delete</button>
                <button className="outline-primary" >Download</button>
            </div>
        </div>
    </div>)

}

export default AttachmentCard