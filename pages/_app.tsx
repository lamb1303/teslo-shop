import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { AuthProvider, CartProvider, UiProvider } from "../context";
import { lightTheme, darkTheme } from "../themes";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
