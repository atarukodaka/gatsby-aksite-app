import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"
import DirectoryName from "../components/directory_name.js"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export default function DirectoryIndexTemplate( { data, pageContext }) {
    const directory = pageContext.directory || ""
    const { breadcrumb: { crumbs } } = pageContext
    //const directory_name = (<DirectoryName directory={directory}/>)
    const directory_name = directory.toString().split('/').pop()

    return (
        <Layout>
            <Breadcrumb crumbs={crumbs} crumbLabel={directory_name}/>
            <h2><DirectoryName directory={directory}/></h2>
                {
                    data.allMdx.nodes.map(node => (
                        <PostExcerpt node={node} key={node.id} />
                    ))
                }
            
        </Layout>
    )
}


export const query = graphql`
    query($directory: String!){
        allMdx(sort: {fields: frontmatter___date, order: DESC},
            filter: {fields: {directory: {eq: $directory}}}) {
            nodes{
                excerpt(truncate: true)
                frontmatter { date(formatString: "YYYY-MM-DD"), title }
                fields { slug, directory }
            }
        }
    }
`