import React from "react"
import { graphql, navigate } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { Box, Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

import { PostCards } from "../components/post.js"
import Layout from "../components/layout.js"

export const query = graphql`
    query($regex: String!, $pruneLength: Int!=200, $skip: Int!, $limit: Int!){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {fields: {directory: {regex: $regex}}},
        skip: $skip, limit: $limit
         ) {
        nodes { 
          id
          excerpt(truncate: true, pruneLength: $pruneLength)
          slug
          frontmatter {
            date(formatString: "YYYY-MM-DD"), title, image
          }     
          fields { 
            directory
          }   
          
        }
      }
    }
  `

const handleChange = (directory, p) => {
  navigate((p === 1) ? `/${directory}` : `/${directory}/${p}`)
}

export default function DirectoryTemplate({ data, pageContext }) {
  const { directory, numberOfPages, humanPageNumber } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const current_directory = directory.split('/').slice(-1)

  console.log("directory template: ", directory)

  return (
    <Layout title={"Directory: " + directory}>
      <Breadcrumb crumbs={crumbs} />
      <h1 className="pageTitle">DIRECTORY: {directory}</h1>
      <PostCards nodes={data.allMdx.nodes} showExcerpt={true} />

       <Box display="flex" justifyContent="center" alignItems="center">
        <Pagination count={numberOfPages} page={humanPageNumber} onChange={(e,p) => { handleChange(directory, p) }} />
      </Box>
    </Layout>
  )
}
