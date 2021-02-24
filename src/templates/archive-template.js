import React from "react"
import { graphql, navigate } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'

import { PostCards } from "../components/post.js"
import Layout from "../components/layout.js"



export const query = graphql`
    query($fromDate: Date!, $toDate: Date!, $pruneLength: Int!=200, $skip: Int!, $limit: Int!){        
      allMdx(sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate } }},
        skip: $skip, limit: $limit) {
        nodes { 
          id
          excerpt(truncate: true, pruneLength: $pruneLength)

          frontmatter {
            date(formatString: "YYYY-MM-DD"), title, image
          }        
          fields { 
            directory
          }
          slug
        }
      }
    }
  `
const handleChange = (year, month, p) => {
  const pathPrefix = `/archives/${year}${month.toString().padStart(2, 0)}`
  navigate((p === 1) ? pathPrefix : `${pathPrefix}/${p}`)
}

export default function ArchiveTemplate({ data, pageContext }) {
  const { year, month, numberOfPages, humanPageNumber } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const title = `MONTHLY ARCHIVE: ${year}/${month}`
  //console.log(title)

  return (
    <Layout title={title}>
      <Breadcrumb crumbs={crumbs} crumbLabel={year + "-" + month} />
      <h1 className="pageTitle">{title}</h1>
      <PostCards nodes={data.allMdx.nodes} showExcerpt={true} />

      <Box display="flex" justifyContent="center" alignItems="center">
        <Pagination count={numberOfPages} page={humanPageNumber} onChange={(e, p) => { handleChange(year, month, p) }} />
      </Box>
    </Layout>
  )
}

