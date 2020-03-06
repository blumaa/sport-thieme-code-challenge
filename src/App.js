import React from "react";
import SearchForm from "./components/SearchForm";


function App() {
  console.log("app loaded");
  return (
    <div>
      <h1 className="title">Search for a repo on Github</h1>
      <SearchForm />
    </div>
  );
}

export default App;



// {
//   repository(owner: "nuwave", name: "lighthouse") {
//     description
//     url
//     pullRequests(states: [OPEN, CLOSED], first: 20) {
//       totalCount
//       nodes{
//         title
//         state
//         body
//         createdAt
//       }
//     }
//     issues(states: [OPEN, CLOSED], first: 20) {
//       totalCount
//       nodes {
//         title
//         state
//         url
//         comments(first: 20) {
//           nodes {
//             url
//             body
//             createdAt
//           }
//         }
//       }
//     }
//   }
// }
