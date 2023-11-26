"use client";
import { signOut } from "next-auth/react";
import { AuthProvider } from "../providers/authProvider";
interface props {
  user: User;
}
const HomePage: React.FC<props> = ({ user }) => {

console.table (user)
  return (
    <AuthProvider user={user!}>
      <div className="flex flex-col gap-4">
        <p>hello {user?.name}</p>
        <button
          className="bg-black px-6 py-2"
          onClick={() => {
            signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/login`
            });
          }}
        >
          signout
        </button>
      </div>
    </AuthProvider>
  );
};

export default HomePage;
