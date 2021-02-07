import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"

export default function FolderIndexTemplate( { data }) {
    const node = data.allMarkdownRemark.nodes[0]
    const folder = (node ) ? node.fields.folder : ""
    return (
        <Layout>
            <h2> { folder }</h2>
            <ul>
                {
                    data.allMarkdownRemark.nodes.map(node => (
                        <PostExcerpt node={node}/>

                    ))

                }
            </ul>
        </Layout>
    )
}


export const query = graphql`
query($folder: String!){
    allMarkdownRemark(filter: {fields: {folder: {eq: $folder}}}) {
        nodes{
            frontmatter {
                title
            }

          fields {
            slug
            folder
          }
        }
      }
    
    }        
`