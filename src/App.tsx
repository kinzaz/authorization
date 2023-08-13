import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthorizationProvider } from "Core/Authorization/AuthorizationProvider";
import { RootStoreContext, stores } from "Store";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <RootStoreContext.Provider value={stores}>
      <QueryClientProvider client={queryClient}>
        <AuthorizationProvider />
      </QueryClientProvider>
    </RootStoreContext.Provider>
  );
};
