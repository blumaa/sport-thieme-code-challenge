import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { gql } from "apollo-boost";
// import gql from 'graphql-tag'

// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql"
// });


const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = '0012d7abd79599e50f846f422b9df73ff5b86522'

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});


client
  .query({
    query: gql`
      {
        repository(owner: "nuwave", name: "lighthouse") {
          description
          url
          pullRequests(states: [OPEN, CLOSED], first: 20) {
            totalCount
            nodes {
              title
              state
              body
              createdAt
            }
          }
          issues(states: [OPEN, CLOSED], first: 20) {
            totalCount
            nodes {
              title
              state
              url
              comments(first: 20) {
                nodes {
                  url
                  body
                  createdAt
                }
              }
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// 0012d7abd79599e50f846f422b9df73ff5b86522