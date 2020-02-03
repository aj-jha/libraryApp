import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";

// tells apolloprovider connect info for backend database

let apolloClient = null;

const setCSRFToken = csrfToken => {
  if (csrfToken) {
    // will run if csrfToken is true
    localStorage.setItem("token", csrfToken);
    // local storage is a built in JS function
  } else {
    localStorage.removeItem("token");
    // removes previous login token
  }
};

const authorizedFetch = (uri, options) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : ""
  };
  return fetch(uri, { ...options, headers });
  //creates new options object, but replaces old headers object with new header (w Authorization token)
};

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  // single line if statement. If gralQLErrors = true, console.log every error message in the errors.
});

const authLink = new ApolloLink((operation, forward) => {
  // operation is the query/mutation that we are running
  // forward is the function that sends & receives the results from the server

  const responses = forward(operation);
  // forward the operation from the server & stores response into responses const.

  return responses.filter(responses => {
    const data = responses.data || {};
    // || ensures data will be either data or empty object. An operation run on an undefined or null will cause the program to crash.
    const { csrfToken } = data.login || data.signup || {};

    if (csrfToken != null) {
      //setCsrfToken will store the CSRF token into local storage. The token from local storage will be sent with every request to the server. Authenticate & CSRF Token only happens at login & signup from the client side
      setCSRFToken(csrfToken);
      console.log("logged in");
    }
    if (responses.errors == null) {
      return true;
    }
    const authError = responses.errors.some(
      err => err.extensions.code === "UNAUTHENTICATED"
    );
    if (authError) {
      console.log("unauthenticated");
      setCSRFToken(null);
      //setCSRFToken to null which deletes token
    }
    return !authError;
  });
});

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
  fetch: authorizedFetch
});

apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

export default apolloClient;
