import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"

export default function FolderIndexTemplate( { data }) {
    const node = data.allMarkdownRemark.nodes[0]
    const folder = (node ) ? node.fields.folder : ""
    return (
        <Layout>
            <h2> { folder }</h2>
            
                {
                    data.allMarkdownRemark.nodes.map(node => (
                        <PostExcerpt node={node}/>

                    ))

                }
            
        </Layout>
    )
}


export const query = graphql`
    query($folder: String!){
        allMarkdownRemark(filter: {fields: {folder: {eq: $folder}}}) {
            
            nodes{
                excerpt(truncate: true, format: PLAIN)            
                frontmatter { date(formatString: "YYYY-MM-DD"), title }
                fields { slug, folder }
            }
        }
    }
`