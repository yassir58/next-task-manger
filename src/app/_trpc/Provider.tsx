"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/styles/theme";
import { AuthProvider } from "../providers/authProvider";
import { SessionProvider } from "next-auth/react";
export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {" "}
          <AuthProvider>
            <SessionProvider>{children}</SessionProvider>
          </AuthProvider>{" "}
        </QueryClientProvider>
      </ChakraProvider>
    </trpc.Provider>
  );
}
