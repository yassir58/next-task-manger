'use client'
import { Stack, Text } from "@chakra-ui/react"
import { usePathname } from "next/navigation"


interface props {

} const page:React.FC<props> = ({}) =>{ 

    const pathname = usePathname ()
    const workspaceId = pathname.split ('/')[2]
        return (<Text color='veryLightGray.100'>workspace {workspaceId}</Text>)
   
}

export default page