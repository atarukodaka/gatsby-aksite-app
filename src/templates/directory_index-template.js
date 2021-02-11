import React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import { PostExcerpt } from "../components/post.js"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export default function DirectoryTemplate({ data, pageContext }) {
  const { directory } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const current_directory = directory.split('/').slice(-1)

  return (
    <Layout>
      <Breadcrumb crumbs={crumbs} crumbLabel={current_directory}/>
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
