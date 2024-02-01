import { useSession } from "next-auth/react"
import { trpc } from "~/app/_trpc/client"

const useAuth = () => {
    const {data:session} = useSession ()
    const {data:user} = trpc.userRouter.getUserById.useQuery ({
        userId: session?.user.id!
    })

    return {user, session}
}

export default useAuth