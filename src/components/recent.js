import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { List, ListItem, ListItemText} from "@material-ui/core"

const Recent = () => {
    const data = useStaticQuery(graphql`
    {
        allMarkdownRemark(filter: {frontmatter: { date: {ne: null} } } ,
          limit: 10, 
          sort: {fields: frontmatter___date, order: DESC}
        ) {
            nodes {
                frontmatter {
                    title
                }
                fields {
                    slug
                }
            }
        }
    }
    `)


    return (

        <List component="nav">
                {
                    data.allMarkdownRemark.nodes.map( node =>
                        (
                            <ListItem button component={Link} to={node.fields.slug} key={node.id}>
                                <ListItemText>{node.frontmatter.title}</ListItemText>
                            </ListItem>
                        )
                    )
                }
            </List>        

    )
}

export default Recent