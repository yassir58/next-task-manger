import { Stack } from "@chakra-ui/react"

interface props {
    children: React.ReactNode
}
const Layout:React.FC<props> = ({children}) => {
    return (<Stack w='98%' h='82vh' borderRadius={'12px'} bg='LightGray.100' justifyContent={'center'} alignItems={'center'}>
        {children}
    </Stack>)
}

export default Layout