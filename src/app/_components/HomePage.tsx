"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";
interface props {
  user: User;
}
const HomePage: React.FC<props> = ({ user }) => {
  const router = useRouter();
  const {status} = useSession ()


  useEffect(() => {
    if (status !== 'loading'){
      if (status === 'authenticated') {
        router.push("/boards");
      } else router.push("/login");
    }
  }, [status]);

  return (
    <div className="flex flex-col gap-4">
      <LoaderIcon />
    </div>
  );
};

export default HomePage;
