import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import { store } from "../src/redux";
import ProviderContext from "../src/context/provider.context";
import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ProviderContext.Consumer>
        {(provider) => (
          <Layout>
            <Component {...pageProps} provider={provider} />
          </Layout>
        )}
      </ProviderContext.Consumer>
    </Provider>
  );
}

export default MyApp;
