import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { AuthProvider, CartProvider, UiProvider } from "../context";
import { lightTheme, darkTheme } from "../themes";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
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
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
