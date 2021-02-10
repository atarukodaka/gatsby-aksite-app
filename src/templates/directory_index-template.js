import React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import { PostExcerpt } from "../components/post.js"

export default function DirectoryTemplate({ data, pageContext }) {
  const { directory } = pageContext
  
  return (
    <Layout>
        <h2>DIRECTORY: {directory}</h2>
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
      allMdx(filter: {fields: {directory: {eq: $directory}}} ) {
        nodes { 
          id
          excerpt(truncate: true)

          frontmatter {
            date(formatString: "YYYY-MM-DD"), title
          }     
          fields { 
            directory
          }   
          slug
        }
      }
    }
  `
