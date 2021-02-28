import React from "react"
import { graphql, navigate } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Pagination from '@material-ui/lab/Pagination'
import Box from '@material-ui/core/Box'

import { Post } from "../components/post.js"
import Layout from "../components/layout.js"
import { monthlyArchivePath } from '../utils/archive_path'

export const query = graphql`
    query($fromDate: Date!, $toDate: Date!, $pruneLength: Int!=200, $skip: Int!, $limit: Int!){        
      allMdx(sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate } }},
        skip: $skip, limit: $limit) {
        nodes { 
          id
          excerpt(truncate: true, pruneLength: $pruneLength)

          frontmatter {
            date(formatString: "YYYY-MM-DD"), title, image, description
          }        
          fields { 
            directory
          }
          slug
          tableOfContents
        }
      }
    }
  `
const handleChange = (year, month, p) => {
  //const pathPrefix = `/archives/${year}${month.toString().padStart(2, 0)}`
  const pathPrefix = monthlyArchivePath(year, month)
  navigate((p === 1) ? pathPrefix : `${pathPrefix}/${p}`)
}

export default function MonthlyArchiveTemplate({ data, pageContext }) {
  const { year, month, numberOfPages, humanPageNumber } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const title = `MONTHLY ARCHIVE: ${year}/${month}`
  //console.log(title)

  return (
    <Layout title={title}>
      <Breadcrumb crumbs={crumbs}/>
      <h1 className="pageTitle">{title}</h1>
      {
        data.allMdx.nodes.map(node=>(
          <Post excerptify={true} node={node} key={node.id}/>
        ))
      }

      <Box display="flex" justifyContent="center" alignItems="center">
        <Pagination count={numberOfPages} page={humanPageNumber} onChange={(e, p) => { handleChange(year, month, p) }} />
      </Box>
    </Layout>
  )
}

