import { Stack, Text } from "@chakra-ui/react"
import { Cover } from "./ui/Cover"

interface props {
    workspace: Workspace
}
const WorkspaceCard:React.FC<props> = ({workspace}) =>{
    return (<Stack minW='300px' px={4} py={2} spacing={4} bg='Primary.100' borderRadius={'lg'} shadow={'sm'} _hover={{opacity:0.8}} _active={{transform:'scale(1.1)'}}>
        <Cover image={workspace.image} />
        <Text fontSize='20px' color='veryLightGray.100'>{workspace.name}</Text>
    </Stack>)
}

export default WorkspaceCard