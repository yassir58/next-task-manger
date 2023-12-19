import { Stack , Avatar, Text, Input, HStack} from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { UploadButton } from "~/utils/uploadThing"
import { trpc } from "../_trpc/client"
import { useState } from "react"
import toast from "react-hot-toast"
import useAuth from "~/hooks/useAuth"


interface props {

}
const UserProfile:React.FC<props> = ({}) => {
    
    const utils = trpc.useUtils ()
    const {user} = useAuth ()
    const updateProfileMutation = trpc.userRouter.updateUser.useMutation ({
        onSuccess: () => { 
            toast.success ('User Profile updated successfully')
            utils.userRouter.invalidate ()
        }
    })
    const [username, setUsername] = useState (user?.name)
    const [email, setEmail] = useState (user?.email)
    const [url, setUrl] = useState (user?.profileImage)

    const updateProfile = () => {
        try {
            updateProfileMutation.mutateAsync ({
                id: user?.id!,
                profileImage:url!,
                username: username!,
                email: email!
            })
        }catch (err: any){
            console.log ('error : ', err)
        }
    }
    return (
        <Stack spacing={6}>

        <HStack justifyContent='start' alignItems='center' spacing={4}>
        <Avatar src={url!} size='2xl'  name={user?.name}/>
            <UploadButton
          endpoint="userRoute"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            setUrl (res[0]?.url)
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log ('upload error: ', error)
          }}

        />
        </HStack>    
        <Stack spacing={5} justifyContent={'center'} alignItems={'start'} w='100%'>
            <Stack spacing={3} w='100%'>
                <Text fontSize='17px' color='veryLightGray.100'>Change username</Text>
                <Input type='text' placeholder='type your username' value={username} onChange={(e) => setUsername (e.target.value)} variant='regular' w='100%' />
            </Stack>
            <Stack spacing={3} w='100%'>
                <Text fontSize='17px' color='veryLightGray.100'>Change email</Text>
                <Input type='email' placeholder='type your email' value={email} onChange={(e) => setEmail (e.target.value)} variant='regular' w='100%' />
            </Stack>
            <button className='btn-primary' onClick={updateProfile}>save</button>
        </Stack>
        </Stack>

    )
}

export default UserProfile