import React from "react";
import { Header, Card, Modal, Button, Icon } from "semantic-ui-react";
import IssueDetails from "./IssueDetails";

const OpenIssuesDisplay = ({ repository }) => {
  const issDetails = iss => {
    console.log("issue details", iss);
  };

  // console.log('pull req repo', repository)
  const filteredRepos = repository.issues.nodes.filter(
    node => node.state === "OPEN"
  );
  // console.log(filteredRepos)
  const issues = filteredRepos.map(iss => {
    console.log(iss);
    return (
      <Modal
        key={iss.id}
        trigger={
          <Card
            style={{ width: "100%" }}
            key={iss.id}
            header={iss.title}
            meta={iss.createdAt}
            description={iss.state}
            description={iss.body}
          />
        }
      >
        <Modal.Content>
          <IssueDetails iss={iss} />
        </Modal.Content>
      </Modal>
    );
  });
  return (
    <div>
      <div>{issues}</div>
    </div>
  );
};

export default OpenIssuesDisplay;
