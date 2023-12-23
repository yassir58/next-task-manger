import { Button, Stack, Avatar, Text, Input,HStack, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, PopoverHeader, Icon, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { trpc } from "../_trpc/client"
import { FaPlus } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"
import useAuth from "~/hooks/useAuth"
import toast from "react-hot-toast"

interface props {
    workspace:Workspace
}

interface InviteFieldProps {
    user:User
    selected: User |  null
    handleClick: (user:User) => void
}

export const InviteFeild:React.FC<InviteFieldProps> = ({user, handleClick, selected}) => {
    return (<Button w='100%' border={`${user.id === selected?.id ? '2px': 'none' }`} borderColor='BlueSky.100' variant='userField' onClick={() => handleClick! (user)}>
       <HStack w='100%' spacing={4} justifyContent='start' alignItems='center'>
       <Avatar src={user.profileImage} name={user.name} size='md' borderRadius='md' />
        <Text color='veryLightGray.100' fontSize='17px'>{user.name}</Text>
       </HStack>
    </Button>)
}

export const InviteUser:React.FC<props> = ({workspace}) => {

    const {user:owner} = useAuth ()
    const [selected, setUser] = useState<User | null> (null)
    const utils  = trpc.useUtils ()
    const {data:users} = trpc.userRouter.getAllUsers.useQuery ();
    const [search , setSearch] = useState ('')
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

    return (<Stack w='100%' spacing={6} justifyContent={'center'} alignItems='center'> 
            <InputGroup>
            <Input variant='regular' placeholder='search for users'/>
            <InputRightElement>
            <Icon as={FaSearch} fontSize={'15px'} color='gray.500' />
            </InputRightElement>
            </InputGroup>

            <Stack spacing={3} w='100%'>
                {users && users.map ((user:any, index:number)=>{
                    return <InviteFeild user={user} handleClick={setUser} selected={selected} key={index}/>
                })}
            </Stack>
            <button className='btn-primary' onClick={sendInvite}> invite </button>
    </Stack>)
}

export const InviteToWorkspace:React.FC<props> = ({workspace}) => {
    return (<Popover>
        <PopoverTrigger>
          <button className='btn-primary'>
            <Icon as={FaPlus} fontSize='17px'/>
          </button>
        </PopoverTrigger>
        <PopoverContent bg='Primary.100' color='veryLightGray.100' border='none'>
          <PopoverCloseButton />
          <PopoverHeader border={'none'}>Invite to {workspace?.name!}</PopoverHeader>
          <PopoverBody>
            <InviteUser workspace={workspace}/>
          </PopoverBody>
        </PopoverContent>
      </Popover>)
}

interface InvitesProps {

}

