import React from "react";
import { Tab, Header } from "semantic-ui-react";
import PullRequestDisplay from "./PullRequestDisplay";
import OpenIssuesDisplay from "./OpenIssuesDisplay";
import ClosedIssuesDisplay from "./ClosedIssuesDisplay";

const RepoPanel = ({ repo, loading }) => {
 
  if (repo.length < 1 && loading === false) {
    return <div>Use the form to search for a repo</div>;
  } else if (loading) {
    return <div>loading data</div>;
  } else {
    const { repository } = repo[0].data;

    const panes = [
      {
        menuItem: "Pull Requests",
        render: () => (
          <Tab.Pane>
            <PullRequestDisplay repository={repository} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Open Issues",
        render: () => (
          <Tab.Pane>
            <OpenIssuesDisplay repository={repository} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Closed Issues",
        render: () => (
          <Tab.Pane>
            <ClosedIssuesDisplay repository={repository} />
          </Tab.Pane>
        )
      }
    ];


    return (
      <>
        <Header>Repo Owner/Name: {repository.nameWithOwner}</Header>
        <Tab panes={panes} repository={repository} />
      </>
    );
  }
};

export default RepoPanel;
