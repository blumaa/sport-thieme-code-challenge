import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";
import { gql } from "apollo-boost";
import { Tab, Button, Input, Header } from "semantic-ui-react";
import RepoPanel from "./components/RepoPanel"

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [repo, setRepo] = useState([]);
  const [ownerRepo, setOwnerRepo] = useState("");
  const [oauth, setOauth] = useState("");

  console.log("app loaded");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    console.log(ownerRepo);
    console.log(oauth);
    const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

    const authLink = new ApolloLink((operation, forward) => {
      // Retrieve the authorization token from local storage.
      const token = { oauth };

      // Use the setContext method to set the HTTP headers.
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${oauth}` : ""
        }
      });

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink), // Chain it with the HttpLink
      cache: new InMemoryCache()
    });

    const owner = ownerRepo.split("/")[0];
    console.log(owner);
    try {
      const query = gql`
        query GET_REPO($owner: String!, $name: String!) {
          rateLimit {
            cost
            remaining
            resetAt
          }
          repository(owner: $owner, name: $name) {
            nameWithOwner
            description
            url
            pullRequests(states: [OPEN, CLOSED], first: 20) {
              totalCount
              nodes {
                id
                title
                state
                body
                createdAt
              }
            }
            issues(states: [OPEN, CLOSED], first: 100) {
              totalCount
              nodes {
                id
                title
                body
                state
                url
                createdAt
                comments(first: 20) {
                  nodes {
                    id
                    url
                    body
                    createdAt
                  }
                }
              }
            }
          }
        }
      `;
      client
        .query({
          query: query,
          variables: {
            owner: `${ownerRepo.split("/")[0]}`,
            name: `${ownerRepo.split("/")[1]}`
          }
        })
        .then(result => {
          console.log(result);
          setRepo([result]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const panes = [
    {
      menuItem: "Pull Requests",
      render: () => <Tab.Pane>Pull Requests</Tab.Pane>
    },
    {
      menuItem: "Open Issues",
      render: () => <Tab.Pane>Open Issues</Tab.Pane>
    },
    {
      menuItem: "Closed Issues",
      render: () => <Tab.Pane>Closed Issues</Tab.Pane>
    }
  ];

  console.log(repo.length);
  return (
    <div className="main">
      <h1 className="title">Search for a repo on Github</h1>
      <form
        className="search-form"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <Input
          className="form-elements"
          type="text"
          name="repo"
          placeholder="owner/repo"
          value={ownerRepo}
          onChange={e => setOwnerRepo(e.target.value)}
        />
        <Input
          className="form-elements"
          type="text"
          name="oauth"
          placeholder="oauth"
          value={oauth}
          onChange={e => setOauth(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="panel">
        {repo.length > 0 ? <RepoPanel repo={repo ? repo : null} /> : <div>Use the form to search for a repo</div>}
        
      </div>
    </div>
  );
}

export default App;
