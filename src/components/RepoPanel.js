import React from "react";
import { Tab, Button, Input, Header } from "semantic-ui-react";
import PullRequestDisplay from "./PullRequestDisplay";
import OpenIssuesDisplay from "./OpenIssuesDisplay";
import ClosedIssuesDisplay from "./ClosedIssuesDisplay";

const RepoPanel = ({ repo }) => {
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

  console.log(repo);

  return (
    <>
      <Header>Repo Owner/Name: {repository.nameWithOwner}</Header>
      <Tab panes={panes} repository={repository} />
    </>
  );
};

export default RepoPanel;
