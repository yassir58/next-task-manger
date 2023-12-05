import { Stack, Text } from "@chakra-ui/react"
import { Cover } from "./ui/Cover"
import { useRouter } from "next/navigation"

interface props {
    workspace: Workspace
}
const WorkspaceCard:React.FC<props> = ({workspace}) =>{

    const router = useRouter ()
    return (<Stack minW='300px' px={4} py={2} spacing={4} bg='Primary.100' borderRadius={'lg'} shadow={'sm'} _hover={{opacity:0.8}} _active={{transform:'scale(1.1)'}}
        onClick={() => router.push (`/w/${workspace.id}`)}
    >
        <Cover image={workspace.image} />
        <Text fontSize='20px' color='veryLightGray.100'>{workspace.name}</Text>
    </Stack>)
}

export default WorkspaceCard