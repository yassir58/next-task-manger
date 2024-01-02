import { useSession } from "next-auth/react"
import { UploadButton } from "~/utils/uploadThing"
import { trpc } from "../_trpc/client"
import { useState } from "react"
import toast from "react-hot-toast"
import useAuth from "~/hooks/useAuth"
import Avatar from "./ui/Avatar"

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
        <div className='flex flex-col gap-4 justify-start items-center w-full h-full'>

        <Avatar size='w-32 h-32' image={url!}  name={user?.name!}/>

        <p className='text-mainPurple font-semibold '>{user?.name}</p>
            <UploadButton
            className="mt-4 ut-button:bg-mainPurple ut-button:w-[350px] ut-button:ut-readying:bg-secondaryPurple"
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
        <div className='flex flex-col gap-4 w-full'>
            <div className='flex gap-2 flex-col'>
                <p className='text-mediumGray'>Change username</p>
                <input type='text' placeholder='type your username'  onChange={(e) => setUsername (e.target.value)} className='input-regular'  />
            </div>
            <div className='flex gap-2 flex-col'>
                <p className='text-mediumGray'>Change email</p>
                <input type='email' placeholder='type your email'  onChange={(e) => setEmail (e.target.value)} className='input-regular'  />
            </div>
            <button className='btn-primary w-full' onClick={updateProfile}>save</button>
        </div>
        </div>

    )
}

export default UserProfile