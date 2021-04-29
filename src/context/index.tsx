import { ReactNode } from "react";
import { AuthProvider } from "./auth_context";
import { QueryClientProvider, QueryClient } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
