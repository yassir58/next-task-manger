import { HStack, Stack } from "@chakra-ui/react";
import Header from "../_components/Header";
import { SideNav } from "../_components/sideNav";
interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = async ({ children }) => {

  return (
   
     <Stack w='100%' h='100vh'  bg='Primary.100'>
       <Header />
       <HStack w='100%' minH={'85%'} spacing={2}>
        <SideNav />
        <div className="bg-red w-[100%]  flex justify-center items-center">{children}</div>
      </HStack>
     </Stack>

  );
};

export default Layout;
