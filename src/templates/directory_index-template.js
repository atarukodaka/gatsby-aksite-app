import React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import { PostExcerpt, PostCards } from "../components/post.js"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { Grid } from '@material-ui/core'

export const query = graphql`
    query($regex: String!){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {fields: {directory: {regex: $regex}}} ) {
        nodes { 
          id
          excerpt(truncate: true, pruneLength: 200)

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

export default function DirectoryTemplate({ data, pageContext }) {
  const { directory } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const current_directory = directory.split('/').slice(-1)  

  return (
    <Layout title={"Directory: " + directory}>
      <Breadcrumb crumbs={crumbs} crumbLabel={current_directory}/>
      <h1 className="pageTitle">DIRECTORY: {directory}</h1>
      <PostCards node={data.allMdx.nodes} key={node.id} showExcerpt={true} />
    </Layout>
  )
}
