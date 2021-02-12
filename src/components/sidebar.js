import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import './sidebar.module.css'

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

                directories: allMdx(sort: {fields: fields___directory, order: ASC}, filter: {fields: {directory: {ne: ""}}}) {
                    group(field: fields___directory) {
                      directory: fieldValue
                    }
                }
                recentPosts: allMdx(
                    limit: 10,
                    sort: {fields: frontmatter___date, order: DESC}
                    ) {
                    nodes {
                        frontmatter { title }
                        slug
                        fields { directory }
                        id
                    }
                }
                monthlyArchives: allSitePage(sort: {fields: context___fromDate, order: DESC}, 
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
            <h3>Profile</h3>
            <ul>
            <li key="author">{data.site.siteMetadata.author}</li>
            <li key="description">{data.site.siteMetadata.descriptino}</li>
            </ul>
            
            <h3>Recent Posts</h3>
            <ul>
            {
                data.recentPosts.nodes.map(node => (
                    <li key={node.id}>
                        <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                    </li>
                ))
            }
            </ul>
            <h3>Directories</h3>
            <ul>
            {
                data.directories.group.map( ({directory}) => (
                    <li key={directory}>
                        <Link to={'/' + directory}>{directory}</Link>
                    </li>
                ))
                
            }    
            </ul>
            <h3>Monthly Archives</h3>
            <ul>
            {
                data.monthlyArchives.nodes.map(node => (
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