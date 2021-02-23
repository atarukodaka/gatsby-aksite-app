import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
//import { Grid } from '@material-ui/core'

import { PostCards } from "../components/post.js"
import Layout from "../components/layout.js"

export const query = graphql`
    query($regex: String!, $pruneLength: Int!=200){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {fields: {directory: {regex: $regex}}} ) {
        nodes { 
          id
          excerpt(truncate: true, pruneLength: $pruneLength)
          slug
          frontmatter {
            date(formatString: "YYYY-MM-DD"), title, image
          }     
          fields { 
            directory, directory_name
          }   
          
        }
      }
    }
  `

export default function DirectoryTemplate({ data, pageContext }) {
  const { directory, directory_name } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const current_directory = directory.split('/').slice(-1)  

  return (
    <Layout title={"Directory: " + directory}>
      <Breadcrumb crumbs={crumbs} crumbLabel={current_directory}/>
      <h1 className="pageTitle">DIRECTORY: {directory_name}</h1>
      <PostCards nodes={data.allMdx.nodes} showExcerpt={true} />
    </Layout>
  )
}
