import { UserProvider } from "@auth0/nextjs-auth0";
import { MetaMaskProvider } from "metamask-react";
import { AppProps } from "next/app";
import React from "react";

import "/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MetaMaskProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </MetaMaskProvider>
  );
};

export default App;
