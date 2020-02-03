import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import App from "./App";
import apolloClient from "./components/apolloClient";

const AppContainer = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

export default AppContainer;
