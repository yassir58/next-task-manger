import { SideNav } from "../_components/sideNav";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { AuthProvider } from "../providers/authProvider";
interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  return (
    <AuthProvider
      user={{
        name: session?.user.name,
        email: session?.user.email!,
        id: session?.user.id,
      }}
    >
      <div className="grid w-[100%] grid-cols-[20%_1fr]">
        <SideNav />
        <div>{children}</div>
      </div>
    </AuthProvider>
  );
};

export default Layout;
