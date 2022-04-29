import { QueryClient, QueryClientProvider } from "react-query";

type ReactQueryContextProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

export const ReactQueryContextProvider = ({
  children,
}: ReactQueryContextProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
