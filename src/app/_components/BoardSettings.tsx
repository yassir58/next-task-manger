import { usePathname, useRouter } from "next/navigation"
import Modal from "./ui/Modal"
import EditBoard from "./EditBoard"
import { trpc } from "../_trpc/client"
import DeleteBoard from "./DeleteBoard"
import { useEffect } from "react"
import { LoaderIcon } from "react-hot-toast"

interface props {

}
const BoardSettings:React.FC<props> = ({}) => {

    const settingsMap = new Map ()
    const pathname = usePathname ()
    const workspaceId = pathname.split ('/')[2] ;
    const router = useRouter ()
    const boardId = pathname.split ('/')[4]
    const settingsArray = ["Go to workspace", "See all workspaces","Edit Board", "Delete Board"]
    const {data:board, isLoading} = trpc.boardRouter.getBoardById.useQuery ({
        id: boardId!
    })

   
    if (isLoading)
        return <LoaderIcon />

    settingsMap.set ("Go to workspace", {type:'link', href:`/w/${workspaceId}`, variant:'btn-link'})
    settingsMap.set ("See all workspaces", {type:'link', href:'/', variant:'btn-link'})
    settingsMap.set ("Edit Board", {type:'modal', component:<EditBoard board={board!}/>, variant:'btn-link'})
    settingsMap.set ("Delete Board", {type:'modal', component:<DeleteBoard board={board!}/>, variant:'btn-danger'})
    return (<div className='flex flex-col justify-start items-start gap-2'>
        {settingsArray.map ((item, index) => {
           
            if (settingsMap.get (item)!.type === 'link')
                return <button className="btn-link" onClick={() => router.replace (settingsMap.get(item)!.href)} key={index}>{item}</button>
            return <Modal size='xl' title={item} cardModal={false} value={<p>{item}</p>} variant={settingsMap.get (item)!.variant}>
                {settingsMap.get (item)!.component}
            </Modal>
        })}
    </div>)
}

const WorkspaceSettings:React.FC<props> = ({}) => {
    const settingsMap = new Map ()
    const pathname = usePathname ()
    const workspaceId = pathname.split ('/')[2] ;
    return <div>
        </div>
}

export default BoardSettings