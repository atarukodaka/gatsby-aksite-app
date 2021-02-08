import React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import { PostExcerpt } from "../components/post.js"

const IndexPage = ( { data } ) => {
  return (
    <Layout>    
    {
      data.allMdx.nodes.map(node => (
          <PostExcerpt node={node} key={node.id}/>
      ))
    }
    </Layout>    
  )
}

export const query = graphql`
  {
    allMdx(limit: 10, 
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { frontmatter: { date: {ne: null}}}
      ) 
      {
      nodes {
        excerpt(truncate: true)
        body
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

