import React from "react"
import Layout from "../components/layout.js"
import { graphql, Link } from "gatsby"

export default function ArchiveTemplate ({ data }) {
    console.log(`archive template: ${data}`)
    return (
        <Layout>
            ARCHIVE
            <ul>
                {
                data.allMarkdownRemark.nodes.map(node => (
                    <li key={node.id}>
                        <Link to={node.fields.slug}>
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
    query($slug: String!){
        allMarkdownRemark(filter: {fields: {slug: {regex: $slug }}}) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }          
        }
      }
    }
  `
