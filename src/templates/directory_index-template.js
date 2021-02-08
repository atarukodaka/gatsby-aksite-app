import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"
import DirectoryName from "../components/directory_name.js"

export default function DirectoryIndexTemplate( { data, pageContext }) {
    const directory = pageContext.directory

    return (
        <Layout>
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
        allMdx(filter: {fields: {directory: {eq: $directory}}}) {
            nodes{
                excerpt(truncate: true)
                frontmatter { date(formatString: "YYYY-MM-DD"), title }
                fields { slug, directory }
            }
        }
    }
`