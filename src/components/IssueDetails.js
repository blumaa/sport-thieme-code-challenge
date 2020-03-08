import React, { useState } from "react";
import { Card, List } from "semantic-ui-react";

const IssueDetails = ({ iss }) => {
  const [issue, setIssue] = useState(iss);
  console.log(issue);

  let filteredComments = issue.comments.nodes.map(comment => {
    return (<List.Item key={comment.id}>
        <List.Content>
            <List.Description>{comment.body}</List.Description>
            <List.Description>{comment.createdAt}</List.Description>
        </List.Content>
    </List.Item>);
  });

  const filterComments = e => {
    console.log(e.target.value);
  };

  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>{iss.title}</Card.Header>
          <Card.Meta>{iss.createdAt}</Card.Meta>
          <Card.Description>{iss.body}</Card.Description>
          <Card.Description>{iss.state}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header>Comments</Card.Header>
          <input
            type="text"
            onChange={filterComments}
            placeholder="filter search"
          />
          <List>{filteredComments}</List>
        </Card.Content>
      </Card>
    </>
  );
};

export default IssueDetails;
