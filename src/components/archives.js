import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { List, ListItem, ListItemText } from '@material-ui/core'


const Archives = () => {
    const data = useStaticQuery(graphql`
    {
    allSitePage(filter: {path: {regex: "/^/archives/.*/"}, context: {}}) {
        nodes {
            path
            context {
                year, month
                fromDate, toDate
            }
        }
      }
    }
    `)

    return (
        <div>
            <h3>Monthly Archives</h3>
            <List component="nav">
            {
                data.allSitePage.nodes.map(node => (
                    <ListItem button component={Link} to={node.path}>
                        <ListItemText>{node.context.year}/{node.context.month}</ListItemText>
                    </ListItem>
                ))
            }
            </List>
        </div>
        
    )
}
export default Archives