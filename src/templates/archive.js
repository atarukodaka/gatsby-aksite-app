import React from "react"
import Layout from "../components/layout.js"
import { graphql, Link } from "gatsby"

export default function Archive({ data }) {
    console.log(`archive template: ${data}`)
    return (
        <Layout>
            ARCHIVE
            <ul>
                {
                data.allMarkdownRemark.nodes.map(node => (
                    <li>
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
    {
      allMarkdownRemark(filter: {fields: {slug: {regex: "/workout/"}}}) {
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
