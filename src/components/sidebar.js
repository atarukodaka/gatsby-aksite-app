import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
//import { List, ListItem, ListItemText } from '@material-ui/core'
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
        <div className="sidebar">
            <h2>Profile</h2>
            <ul>
            <li>{data.site.siteMetadata.author}</li>
            <li>{data.site.siteMetadata.descriptino}</li>
            </ul>
            
            <h3>Directories</h3>         
            <ul>
                { 
                    uniq_directories(data.allMdx.nodes).map( directory =>
                        (
                            <li key={directory.id}>
                                <Link to={'/' + directory} >
                                    <DirectoryName directory={directory}/>
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>   

            <h3>Monthly Archives</h3>
                <ul>
            {
                data.allSitePage.nodes.map(node => (
                    <li key={node.id}>
                        <Link to={node.path}>{node.context.year}/{node.context.month}</Link>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default Sidebar