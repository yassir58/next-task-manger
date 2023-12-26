import { Stack } from "@chakra-ui/react"
import BoardHeader from "~/app/_components/BoardHeader"
import WorkspaceHeader from "~/app/_components/WokspceHeader"

interface props {
    children: React.ReactNode
}
const Layout:React.FC<props> = ({children}) => {
    return (<div className='w-full h-full'>
        {children}
    </div>
    
   )
}

export default Layout