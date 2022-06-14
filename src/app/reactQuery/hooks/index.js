import * as allKeys from "./keys";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 1 day
      refetchOnWindowFocus: false,
      // staleTime: 1000 * 84600,
    },
  },
});
export const ReactQueryWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export const keys = allKeys;
