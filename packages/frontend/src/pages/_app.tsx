import Head from "next/head";
import Router from "next/router";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import ky from "ky-universal";
// @ts-ignore
import * as NProgress from "nprogress";
import theme from "../../theme";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const fetcher = async (url: string) => await ky(url).json();
const swrConfig = { fetcher };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <CSSReset />
      <SWRConfig value={swrConfig}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
