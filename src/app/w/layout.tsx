import { HStack, Stack } from "@chakra-ui/react";
import Header from "../_components/Header";
import { SideNav } from "../_components/sideNav";
interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = async ({ children }) => {

  return (
       <div className='w-full h-[100vh] flex'>
        <SideNav />
        <div className="w-full  flex justify-center items-center bg-[#edf2fb] ml-[320px]">{children}</div>
      </div>
  );
};

export default Layout;
