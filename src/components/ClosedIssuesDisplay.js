import React from "react"
import { Header, Card } from 'semantic-ui-react'

const OpenIssuesDisplay = ({repository}) => {
    // console.log('pull req repo', repository)
    const filteredRepos = repository.issues.nodes.filter(node => node.state === "CLOSED")
    // console.log(filteredRepos)
    const issues = filteredRepos.map(iss => {
        // console.log(iss)
        return   <Card
        style={{width: "100%"}}
        key={iss.id}
        header={iss.title}
        meta={iss.createdAt}
        description={iss.state}
        description={iss.body}
      />
    })
    return(
        <div>
            <div>{issues}</div>
        </div>
    )
}

export default OpenIssuesDisplay