import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { List, ListItem, ListItemText } from '@material-ui/core'
import FolderName from "./foldername.js"

const uniq_folders = ( nodes ) => {
    return [...new Set(nodes.map ( 
        node => node.fields.folder))
    ].filter(v=>v).sort()
}
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

        `
    )
    
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
                    
                    uniq_folders(data.allMarkdownRemark.nodes).map( folder =>
                        (
                            <ListItem button component={Link} to={'/' + folder} key={folder.id}>
                                <ListItemText>
                                    <FolderName folder={folder}/>
                                </ListItemText>
                            </ListItem>
                        )
                    )
                }
            </List>

            <h3>Monthly Archives</h3>
            <List component="nav">
            {
                data.allSitePage.nodes.map(node => (
                    <ListItem button component={Link} to={node.path} key={node.id}>
                        <ListItemText>{node.context.year}/{node.context.month}</ListItemText>
                    </ListItem>
                ))
            }
            </List>
         

        </div>
    )
}

export default Sidebar