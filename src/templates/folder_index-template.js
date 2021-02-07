import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"
import FolderName from "../components/foldername.js"

export default function FolderIndexTemplate( { data, pageContext }) {
    //const node = data.allMarkdownRemark.nodes[0]
    //const folder = (node) ? node.fields.folder : ""
    const folder = pageContext.folder
    

    return (
        <Layout>
            <h2><FolderName folder={folder}/></h2>
                {
                    data.allMarkdownRemark.nodes.map(node => (
                        <PostExcerpt node={node} key={node.id} />
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