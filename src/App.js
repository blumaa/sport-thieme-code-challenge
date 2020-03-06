import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";
import { gql } from "apollo-boost";


const API_KEY = process.env.REACT_APP_API_KEY;

console.log(API_KEY)
function App() {
  const [repo, setRepo] = useState({});

  console.log("app loaded");

  useEffect(() => {
    const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

    const authLink = new ApolloLink((operation, forward) => {
      // Retrieve the authorization token from local storage.
      const token = API_KEY;

      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ""
        }
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink), // Chain it with the HttpLink
      cache: new InMemoryCache()
    });

    try {
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
      .then(result => {
        console.log(result)
        setRepo(result)
      });
    } catch (error) {
      console.log(error)
    }
    

    // fetch("BookApiUrl")
    //   .then(res => res.json())
    //   .then(setBook)
  }, []);


  console.log(repo)
  return (
    <div className="main">
      <h1 className="title">Search for a repo on Github</h1>
      <form className="search-form">
        <input type="text" name="repo" placeholder="repo" />
        <input type="text" name="oauth" placeholder="oauth" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
