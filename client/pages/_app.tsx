import { useState } from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RecoilRoot>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
