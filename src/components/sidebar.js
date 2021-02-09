import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

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
                        slug

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
            <li key="author">{data.site.siteMetadata.author}</li>
            <li key="description">{data.site.siteMetadata.descriptino}</li>
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