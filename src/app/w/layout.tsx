import { HStack, Stack } from "@chakra-ui/react";
import Header from "../_components/Header";
import { SideNav } from "../_components/sideNav";
import SideNavButton from "../_components/SideNavButton";
interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = async ({ children }) => {

  return (
       <div className='w-full h-[100vh] flex'>
        <SideNav />
        <div className="w-full  flex justify-center items-center bg-[#edf2fb]">{children}</div>
        <SideNavButton />
      </div>
  );
};

export default Layout;
