import React, { useEffect, useState } from "react";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { gql } from "apollo-boost";

function App() {
  const [repo, setRepo] = useState({})

  console.log("app loaded");

  useEffect(() =>{
 
    // fetch("BookApiUrl")
    //   .then(res => res.json())
    //   .then(setBook)
 
  }, [])

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

