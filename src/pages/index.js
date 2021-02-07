import React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import Post, { PostExcerpt } from "../components/post.js"

const IndexPage = ( { data } ) => {
  const node = data.allMarkdownRemark.nodes[0]
  return (
<Layout>    
      {
        
        data.allMarkdownRemark.nodes.map(node => (
          <PostExcerpt node={node}/>
          ))

      }
        </Layout>    
  )
}

export const query = graphql`
  {
    allMarkdownRemark(limit: 10, 
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { frontmatter: { date: {ne: null}}}
      ) 
      {
      nodes {
        excerpt(truncate: true, format: PLAIN)
        html
        fields {
          slug
          folder
        }
        frontmatter {
          date
          title
        }
      }
    }
  }
`

export default IndexPage

