import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { List, ListItem, ListItemText } from '@material-ui/core'


const Archives = () => {
    const data = useStaticQuery(graphql`
    {
    allSitePage(sort: {fields: context___fromDate, order: DESC}, 
        filter: {context: {archive: {eq: "monthly"} }}){
        
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
 
            <List component="nav">
            {
                data.allSitePage.nodes.map(node => (
                    <ListItem button component={Link} to={node.path} key={node.id}>
                        <ListItemText>{node.context.year}/{node.context.month}</ListItemText>
                    </ListItem>
                ))
            }
            </List>

    )
}
export default Archives