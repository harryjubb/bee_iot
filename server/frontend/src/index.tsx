import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";

// Apollo setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_APIARY_API_URL,
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
    watchQuery: {
      fetchPolicy: "cache-first",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
