"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface props {}
const page: React.FC<props> = ({}) => {
  const router = useRouter();
  const {status} = useSession ()

  useEffect(() => {
   if (status !== 'loading'){
    if (status === 'unauthenticated') router.push("/login");
   }
  }, [status]);

  return (
    <div className="flex h-[100%] w-[100%] items-center justify-center">
      <p className="text-[#C4C1BB]"> there is no boards selected </p>
    </div>
  );
};

export default page;
