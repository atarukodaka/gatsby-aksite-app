import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

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
                allMdx(
                    sort: {fields: frontmatter___date, order: DESC},
                    ) {
                    nodes {
                        frontmatter { title }
                        slug
                        fields { directory }

                    }
                }
                allSitePage(sort: {fields: context___fromDate, order: DESC}, 
                    filter: {context: {archive: {eq: "monthly"} }}){
                    
                    nodes {
                        id
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
            
            <h3>Recent Posts</h3>
            <ul>
            {
                data.allMdx.nodes.slice(0, 10).map(node => (
                    <li key={node.id}>
                        <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                    </li>
                ))
            }
            </ul>
            <h3>Directories</h3>
            <ul>
            {
                uniq_directories(data.allMdx.nodes).map(directory => (
                    <li key={directory}>
                        <Link to={'/' + directory}>{directory}</Link>
                    </li>
                ))
                
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