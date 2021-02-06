import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout.js"

export default function FolderIndex( { data }) {

    return (
        <Layout>
            <h2>FOLDER INDEX</h2>
            <ul>
                {
                    data.allMarkdownRemark.nodes.map(node => (
                        <li key={node.id}>
                            <Link to={ node.fields.slug}>
                                { node.frontmatter.title }
                            </Link>
                        </li>

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