import React from "react"
import { Header, Card } from 'semantic-ui-react'
import IssueDetails from "./IssueDetails"

const OpenIssuesDisplay = ({repository}) => {
    const issDetails = (iss) => {
        console.log('issue details', iss)
        
    }

    // console.log('pull req repo', repository)
    const filteredRepos = repository.issues.nodes.filter(node => node.state === "OPEN")
    // console.log(filteredRepos)
    const issues = filteredRepos.map(iss => {
        console.log(iss)
        return   <Card
        style={{width: "100%"}}
        key={iss.id}
        header={iss.title}
        meta={iss.createdAt}
        description={iss.state}
        description={iss.body}
        onClick={()=>issDetails(iss)}
      />
    })
    return(
        <div>
            <div>{issues}</div>
        </div>
    )
}

export default OpenIssuesDisplay