import React, { useState } from "react";
import { Card, List } from "semantic-ui-react";

const IssueDetails = ({ iss }) => {
  const [issue, setIssue] = useState(iss);
  const [comments, setComments ] = useState(issue.comments.nodes)
  const [ filter, setFilter ] = useState()
//   console.log(issue);

  let sortedComments = filter ? filter.sort((a, b) => b.createdAt - a.createdAt) : comments.sort((a, b) => b.createdAt - a.createdAt)

  let renderComments = sortedComments.map(comment => {
    return (<List.Item key={comment.id}>
        <List.Content>
            <List.Description>{comment.body}</List.Description>
            <List.Description>{comment.createdAt}</List.Description>
        </List.Content>
    </List.Item>);
  });

  const filterComments = e => {
    // console.log(e.target.value);
    const filteredComments = comments.filter(comment => {
        return comment.body.includes(e.target.value)
    })
    filteredComments.sort((a,b)=> b.createdAt - a.createdAt)
    if (!e.target.value) {
        setComments(iss.comments.nodes)
    } else {
    setFilter(filteredComments)
    }
    // console.log(comments)
  };

  return (
    <>
      <Card style={{width: "100%"}}>
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
          <List>{renderComments}</List>
        </Card.Content>
      </Card>
    </>
  );
};

export default IssueDetails;
