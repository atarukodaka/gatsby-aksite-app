import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { List, ListItem, ListItemText } from '@material-ui/core'
import DirectoryName from "./directory_name.js"

const uniq_directories = ( nodes ) => {
    return [...new Set(nodes.map ( 
        node => node.fields.directory))
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
                allMdx {
                    nodes {
                        fields {
                            slug
                            directory
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
                <ListItem key="description">
                    <ListItemText>{data.site.siteMetadata.description}</ListItemText>
                </ListItem>                
            </List>

            <h3>Directories</h3>            
            <List component="nav">
                {
                    
                    uniq_directories(data.allMdx.nodes).map( directory =>
                        (
                            <ListItem button component={Link} to={'/' + directory} key={directory.id}>
                                <ListItemText>
                                    <DirectoryName directory={directory}/>
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