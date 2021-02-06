import React from "react"
import Layout from "../components/layout.js"
import { graphql, Link } from "gatsby"
import { List, ListItem, ListItemText} from '@material-ui/core'
import Post from "../components/post.js"

const IndexPage = ( { data } ) => {
  const node = data.allMarkdownRemark.nodes[0]
  return (
    <Layout>
      <Post node={node}/>
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

