import { Stack } from "@chakra-ui/react"
import WorkspaceHeader from "~/app/_components/WokspceHeader"

interface props {
    children: React.ReactNode
}
const Layout:React.FC<props> = ({children}) => {
    return (<Stack w='98%' h='82vh' borderRadius={'12px'} bg='LightGray.100' justifyContent={'start'} spacing={4} alignItems={'center'}>
        <WorkspaceHeader />
        {children}
    </Stack>)
}

export default Layout