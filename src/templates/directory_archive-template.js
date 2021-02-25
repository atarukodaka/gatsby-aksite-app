import React from "react"
import { graphql, navigate } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Box from '@material-ui/core/Box'
import { Pagination } from '@material-ui/lab'

import { PostExcerpt } from "../components/post.js"
import Layout from "../components/layout.js"
import { directoryArchivePath } from '../utils/archive_path'

//const config = require('../../config')

export const query = graphql`
    query($regex: String!, $pruneLength: Int!=100, $skip: Int!, $limit: Int!){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {fields: {directory: {regex: $regex}}},
        skip: $skip, limit: $limit
         ) {
        nodes { 
          id
          excerpt(truncate: true, pruneLength: $pruneLength)
          slug
          tableOfContents
          frontmatter {
            date(formatString: "YYYY-MM-DD"), title, image, description
          }     
          fields { 
            directory
          }   
          
        }
      }
    }
  `

const handleChange = (directory, p) => {
  const path = directoryArchivePath(directory)
  navigate((p === 1) ? path : `${path}/${p}`)
}

export default function DirectoryTemplate({ data, pageContext }) {
  const { directory, numberOfPages, humanPageNumber } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  //const current_directory = directory.split('/').slice(-1)
  const label = crumbs.slice(1).map(v=> v.crumbLabel).join('/')
  const title = `DIRECTORY: ${label}`

  return (
    <Layout title={title}>
      <Breadcrumb crumbs={crumbs} />
      <h1 className="pageTitle">{title}</h1>
      { /* <PostCards nodes={data.allMdx.nodes} showExcerpt={true} /> */}
      {
        data.allMdx.nodes.map(node=>(
          <PostExcerpt node={node}/>
        ))
      }

      <Box display="flex" justifyContent="center" m={3}>
        <Pagination count={numberOfPages} page={humanPageNumber} onChange={(_e,p) => { handleChange(directory, p) }} />
      </Box>
    </Layout>
  )
}
