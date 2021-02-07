import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { List, ListItem, ListItemText } from '@material-ui/core'
import Recent from "./recent.js"
import Archives from "./archives.js"

const Sidebar = () => {
    
    const data = useStaticQuery(
        graphql`
            {
                site {
                    siteMetadata {
                        title
                        author
                    }                    
                }
                allMarkdownRemark {
                    nodes {
                        fields {
                            slug
                            folder
                        }

                    }
                }
            }

        `
    )
    
    const folders = [...new Set(data.allMarkdownRemark.nodes.map ( 
        node => node.fields.folder))
    ].filter(v=>v).sort()

    return (
        <div>
            <h2>Profile</h2>
            <List component="nav">
                <ListItem key="author">
                    <ListItemText>{data.site.siteMetadata.author}</ListItemText>
                </ListItem>
                <ListItem key="email">
                    <ListItemText>{data.site.siteMetadata.email}</ListItemText>
                </ListItem>
            </List>

            <h3>Directories</h3>
            <List component="nav">
                {
                    
                    folders.map( folder =>
                        (
                            <ListItem button component={Link} to={'/' + folder} key={folder.id}>
                                <ListItemText>{folder}</ListItemText>
                            </ListItem>
                        )
                    )
                }
            </List>

            <Recent/>

            <Archives/>

        </div>
    )
}

export default Sidebar