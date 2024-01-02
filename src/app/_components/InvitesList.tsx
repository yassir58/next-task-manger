import useAuth from "~/hooks/useAuth"
import { trpc } from "../_trpc/client"
import { LoaderIcon } from "react-hot-toast"
import Invite from "./Invite"
import { useState } from "react"

interface props {
    invites:Invite[],
    received:boolean
}



const Invites:React.FC<props> = ({invites, received}) => {
   
    return <div className='flex flex-col gap-4'>
        {invites && invites.map ((invite:Invite, index:number) => {
            return <Invite received={received} invite={invite} key={index} />
        })}
    </div>
}

export const InvitesList:React.FC = ({}) => {

    const {user} = useAuth ()
    const [tab, setTab] = useState (1)

    const {data:sent} = trpc.invitationsRouter.getSent.useQuery ({
        id: user?.id!
    })   

    const {data:recieved} = trpc.invitationsRouter.getReceived.useQuery ({
        id:user?.id!
    })
    
    console.table (sent)
    console.table (recieved)
    return (
    <div className='flex w-full h-full gap-7 flex-col'>
      <div className='flex w-full'>
      <button className={`${tab === 1 ? 'btn-field-active' : 'btn-field' } w-full rounded-full`} onClick={() => setTab (1)}>Sent Invites</button>
      <button className={`${tab === 2 ? 'btn-field-active' : 'btn-field' } w-full rounded-full`} onClick={() => setTab (2)}>Recieved Invites</button>
    </div>
    <div className='px-2 py-4 w-full flex gap-2 flex-col'>
      <div className={`${tab === 1 ? 'block' : 'hidden' }`}>
        <Invites received={false} invites={sent!}/>
      </div>
      <div className={`${tab === 2 ? 'block' : 'hidden' }`}>
        <Invites received={true} invites={recieved!}/>
      </div>
    </div>
    </div>
  )
}