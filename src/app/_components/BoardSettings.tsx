import { usePathname, useRouter } from "next/navigation"
import Modal from "./ui/Modal"
import EditBoard from "./EditBoard"
import { trpc } from "../_trpc/client"
import DeleteBoard from "./DeleteBoard"
import { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import {InviteUser } from "./InviteUser"
import { SetCover } from "./SetCover"
import { FaImage } from "react-icons/fa6"
import { Cover } from "./ui/Cover"
import { signOut } from "next-auth/react"
import UserProfile from "./UserProfile"

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
    settingsMap.set ("Edit Board", {type:'modal', component:<EditBoard board={board!}/>, variant:'btn-link', size:'md'})
    settingsMap.set ("Delete Board", {type:'modal', component:<DeleteBoard board={board!}/>, variant:'btn-danger', size:'sm'})
    return (<div className='flex flex-col justify-start items-start gap-2'>
        {settingsArray.map ((item, index) => {
           
            if (settingsMap.get (item)!.type === 'link')
                return <button className="btn-link" onClick={() => router.replace (settingsMap.get(item)!.href)} key={index}>{item}</button>
            return <Modal size={settingsMap.get (item)!.size} title={item} cardModal={false} value={<p>{item}</p>} variant={settingsMap.get (item)!.variant}>
                {settingsMap.get (item)!.component}
            </Modal>
        })}
    </div>)
}

interface EditWorkspace {
    workspace:Workspace
}
const EditWorkspace:React.FC<EditWorkspace> = ({workspace}) => {

    const [title, setTitle] = useState (workspace?.name)
    const [cover, setCover] = useState (workspace?.image)
    return (<div className="flex flex-col gap-6">

        {cover ?<Cover image={cover} /> : ""}
        <div className='flex flex-col gap-2'>
            <label>Workspace name</label>
            <input className="input-regular"  value={title}/>
        </div>
        <Modal
        title="Set cover"
        cardModal={false}
        variant="btn-action"
        value={
          <div className="item-center flex w-full justify-between">
            <p>Cover</p>
            <FaImage />
          </div>
        }
      >
        <SetCover coverSetter={setCover} />
      </Modal>
      <button className="btn-primary w-full">Update workspace</button>
    </div>)
}

export const WorkspaceSettings:React.FC<props> = ({}) => {
    const settingsMap = new Map ()
    const pathname = usePathname ()
    const router= useRouter ()
    const workspaceId = pathname.split ('/')[2] ;
    const {data:workspace} = trpc.workspaceRouter.getWorkspaceById.useQuery ({
        id: workspaceId!
    })
    const settingsArray = ["See all workspaces","Edit Workspace","Invite to Workspace", "Delete Workspace" ]


    settingsMap.set ("See all workspaces", {type:'link', href:'/', variant:'btn-link'})
    settingsMap.set ("Edit Workspace", {type:'modal', component:<EditWorkspace workspace={workspace!} />, variant:'btn-link', size:'md'})
    settingsMap.set ("Delete Workspace", {type:'modal', component:<></>, variant:'btn-danger', size:'sm'})
    settingsMap.set ("Invite to Workspace", {type:'modal', component:<InviteUser workspace={workspace!}/>, variant:'btn-link', size:'sm'})

   return (<div className='flex flex-col justify-start items-start gap-2'>
   {settingsArray.map ((item, index) => {
      
       if (settingsMap.get (item)!.type === 'link')
           return <button className="btn-link" onClick={() => router.replace (settingsMap.get(item)!.href)} key={index}>{item}</button>
       return <Modal size={settingsMap.get (item)!.size} title={item} cardModal={false} value={<p>{item}</p>} variant={settingsMap.get (item)!.variant}>
           {settingsMap.get (item)!.component}
       </Modal>
   })}
</div>)
}


export const HomeSettings:React.FC = ({}) => {

    const settingsMap = new Map ()
    const pathname = usePathname ()
    const router= useRouter ()
    const settingsArray = ["Profile settings", "Logout"]


    const handleLogout = () => {
        signOut({
          redirect: true,
          callbackUrl: `http://localhost:3000/login`,
        });
      };
    settingsMap.set ("Logout", {type:'link', func:handleLogout, variant:'btn-danger'})
    settingsMap.set ("Profile settings", {type:'modal', component:<UserProfile />, variant:'btn-link', size:'md'})

   return (<div className='flex flex-col justify-start items-start gap-2'>
   {settingsArray.map ((item, index) => {
      
       if (settingsMap.get (item)!.type === 'link')
           return <button className={`${settingsMap.get(item)!.variant}`} onClick={() => settingsMap.get(item)!.func ()} key={index}>{item}</button>
       return <Modal size={settingsMap.get (item)!.size} title={item} cardModal={false} value={<p>{item}</p>} variant={settingsMap.get (item)!.variant}>
           {settingsMap.get (item)!.component}
       </Modal>
   })}
</div>)
}

export default BoardSettings