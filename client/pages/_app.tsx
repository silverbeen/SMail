import { useState } from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient } from "react-query";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryContextProvider } from "../contexts/ReactQueryContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryContextProvider>
      <RecoilRoot>
        <ToastContainer />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </RecoilRoot>
    </ReactQueryContextProvider>
  );
}

export default MyApp;
