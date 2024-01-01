import { useState } from "react"
import { trpc } from "../_trpc/client"
import useAuth from "~/hooks/useAuth"
import toast from "react-hot-toast"
import Avatar from "./ui/Avatar"
interface props {
    workspace:Workspace
}

interface InviteFieldProps {
    user:User
    selected: User |  null
    handleClick: (user:User) => void
}

export const InviteFeild:React.FC<InviteFieldProps> = ({user, handleClick, selected}) => {
    return (<button className={`${user.id === selected?.id ? 'btn-field-active' :'btn-field'}`} onClick={() => handleClick (user)}>
       <div className='flex gap-5 w-full h-full justify-start items-center'>
       <Avatar image={user.profileImage!} name={user.name!}  />
        <p className='font-semibold'>{user.name}</p>
       </div>
    </button>)
}

export const InviteUser:React.FC<props> = ({workspace}) => {

    const {user:owner} = useAuth ()
    const [selected, setUser] = useState<User | null> (null)
    const utils  = trpc.useUtils ()
    const {data:users} = trpc.userRouter.getAllUsers.useQuery ();
    const [search , setSearch] = useState ('')
    const [members , setMembers] = useState<User[]> ([])
    const inviteMutation = trpc.invitationsRouter.sendInvite.useMutation ({
      onSuccess: () => {
          toast.success ('Invite sent successfully')
          utils.invitationsRouter.invalidate ()
      }, 
      onError: () => {
          toast.error ('Failed to send invite')
      }

    })

    const sendInvite = () => {
      try {
        inviteMutation.mutateAsync ({
          ownerId: owner?.id!,
          receiverId: selected?.id!,
          workspaceId: workspace?.id!
        })
      }catch (error:any){
        console.log ('error: ', error);
      }
    }

    const filterMembers = () => {
      const filterdMembers = users ? users?.filter ((user) => user.name.includes (search)) : [] ;
      setMembers (filterdMembers!);
    }
    return (<div className='flex flex-col gap-8'> 
            <input className='input-regular' value={search} placeholder='search for users' onChange={(e) => {
              setSearch (e.target.value)
              filterMembers ()
            }}/>

            <div className='flex flex-col gap-2'>
                {members && members.map ((user:any, index:number)=>{
                    return <InviteFeild user={user} handleClick={setUser} selected={selected} key={index}/>
                })}
            </div>
            <button className='btn-primary' onClick={sendInvite}> invite </button>
    </div>)
}



