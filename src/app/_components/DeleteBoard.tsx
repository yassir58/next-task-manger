import toast from "react-hot-toast"
import { trpc } from "../_trpc/client"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { modalContext } from "./ui/Modal"

interface props {
    board:any
}

const DeleteBoard:React.FC<props> = ({board}) => {

    const utils = trpc.useUtils ()
    const pathname = usePathname ()
    const router = useRouter ()
    const workspaceId = pathname.split ('/')[2]
    const {onClose} = useContext (modalContext)
    const deleteBoardMutation = trpc.boardRouter.deleteBoard.useMutation ({
        onSuccess: () => {
            utils.boardRouter.invalidate ()
            toast.success ('Board deleted successfully')
            router.replace (`/w/${workspaceId!}`)
            onClose! ()
        }
    })

    const deleteBoard = () => {
        deleteBoardMutation.mutateAsync ({
            boardId: board?.id!
        })
    }
    return (<div className="flex flex-col gap-4 min-w-[400px]">
        <p className='font-semibold text-mainRed text-lg'>Delete this board ?</p>
        <p className="font-semibold text-mediumGray">Are you sure you want to delete the ‘{board.name}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="flex  gap-2 w-full justify-center items-center">
            <button className='btn-red-primary' onClick={deleteBoard}>Delete</button>
            <button className='btn-ghost-regular w-full' onClick={onClose}>Cancel</button>
        </div>

    </div>)
}


export default DeleteBoard