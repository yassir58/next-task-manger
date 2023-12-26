import { Stack, Text } from "@chakra-ui/react"
import { Cover } from "./ui/Cover"
import { useRouter } from "next/navigation"

interface props {
    workspace: Workspace
}
const WorkspaceCard:React.FC<props> = ({workspace}) =>{

    const router = useRouter ()
    return (<div 
        className='bg-white min-w-[300px] rounded-md shadow-sm hover:shadow-md hover:bg-opacity-90 px-4 py-2 flex flex-col items-start justify-center gap-4'
        onClick={() => router.push (`/w/${workspace.id}`)}
    >
        <Cover image={workspace.image} />
        <p className="text-lg text-darkGray   font-semibold">{workspace.name}</p>
    </div>)
}

export default WorkspaceCard