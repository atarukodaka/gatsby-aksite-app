import React from "react"
import { graphql, navigate } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Box from '@material-ui/core/Box'
import { Pagination } from '@material-ui/lab'

import { Post } from "../components/post.js"
import Layout from "../components/layout.js"
import { directoryArchivePath } from '../utils/archive_path'

export const query = graphql`
    query($regex: String!, $skip: Int!, $limit: Int!){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {fields: {directory: {regex: $regex}}},
        skip: $skip, limit: $limit
         ) {
        nodes { 
          ...postFields
        }
      }
    }
  `

const handleChange = (directory, p) => {
  const path = directoryArchivePath(directory)
  navigate((p === 1) ? path : `${path}/${p}`)
}

export default function DirectoryArchiveTemplate({ data, pageContext }) {
  const { directory, numberOfPages, humanPageNumber } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  //const current_directory = directory.split('/').slice(-1)
  const label = crumbs.slice(1).map(v => v.crumbLabel).join('/')
  const title = `DIRECTORY: ${label}`

  return (
    <Layout title={title}>
      <Breadcrumb crumbs={crumbs} />
      <h1 className="pageTitle">{title}</h1>
      {
        data.allMdx.nodes.map(node => (
          <Post excerptify={true} node={node} key={node.id} />
        ))
      }

      <Box display="flex" justifyContent="center" m={3}>
        <Pagination count={numberOfPages} page={humanPageNumber} onChange={(_e, p) => { handleChange(directory, p) }} />
      </Box>
    </Layout>
  )
}
