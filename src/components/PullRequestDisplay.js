import React from "react"
import { Header, Card } from 'semantic-ui-react'

const PullRequestDisplay = ({repository}) => {
    // console.log('pull req repo', repository)
    const pullRequests = repository.pullRequests.nodes.map(pReq => {
        // console.log(pReq)
        return   <Card
        style={{width: "100%"}}
        key={pReq.id}
        header={pReq.title}
        meta={pReq.createdAt}
        description={pReq.state}
      />
    })
    return(
        <div>
            <Header as="h4">Number of Pull Requests: {repository.pullRequests.totalCount}</Header>
            <div>{pullRequests}</div>
        </div>
    )
}

export default PullRequestDisplay