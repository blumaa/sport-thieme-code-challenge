import React from "react";
import { Card, Modal } from "semantic-ui-react";
import IssueDetails from "./IssueDetails";

const OpenIssuesDisplay = ({ repository }) => {
  // console.log('pull req repo', repository)
  const filteredRepos = repository.issues.nodes.filter(
    node => node.state === "CLOSED"
  );
  // console.log(filteredRepos)
  const issues = filteredRepos.map(iss => {
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
