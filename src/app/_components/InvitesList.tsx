import { Stack, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import useAuth from "~/hooks/useAuth"
import { trpc } from "../_trpc/client"
import { LoaderIcon } from "react-hot-toast"
import Invite from "./Invite"


interface props {
    invites:Invite[]
}



const Invites:React.FC<props> = ({invites}) => {
   
    return <Stack spacing={3}>
        {invites && invites.map ((invite:Invite, index:number) => {
            return <Invite invite={invite} key={index} />
        })}
    </Stack>
}

export const InvitesList:React.FC = ({}) => {

    const {user} = useAuth ()

    const {data:sent} = trpc.invitationsRouter.getSent.useQuery ({
        id: user?.id!
    })   

    const {data:recieved} = trpc.invitationsRouter.getReceived.useQuery ({
        id:user?.id!
    })
    
    console.table (sent)
    console.table (recieved)
    return (<Tabs isFitted variant='soft-rounded'>
    <TabList mb='1em'>
      <Tab>Sent Invites</Tab>
      <Tab>Recieved Invites</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Invites invites={sent!}/>
      </TabPanel>
      <TabPanel>
        <Invites invites={recieved!}/>
      </TabPanel>
    </TabPanels>
  </Tabs>)
}