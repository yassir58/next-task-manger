import { Stack } from "@chakra-ui/react"
import BoardHeader from "~/app/_components/BoardHeader"
import WorkspaceHeader from "~/app/_components/WokspceHeader"

interface props {
    children: React.ReactNode
}
const Layout:React.FC<props> = ({children}) => {
    return (<Stack spacing={2} w='100%' h='100%'>
    <WorkspaceHeader />
    <Stack w='98%' h='80vh' borderRadius={'12px'} bg='LightGray.100' justifyContent={'start'} spacing={4} alignItems={'center'}>
        {children}
    </Stack>
    </Stack>
    
   )
}

export default Layout