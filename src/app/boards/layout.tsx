import { SideNav } from "../_components/sideNav";
interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = async ({ children }) => {
  return (
   
       <div className="grid w-[100%] grid-cols-[25%_1fr]">
        <SideNav />
        <div className="bg-[#1A1B1F] w-[100%] flex justify-center items-center">{children}</div>
      </div>
  );
};

export default Layout;
