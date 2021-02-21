import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

import { PostExcerpt, PostCard } from "../components/post.js"
import Layout from "../components/layout.js"
import config from '../../config.js'
import { Grid } from '@material-ui/core'

export const query = graphql`
    query($fromDate: Date!, $toDate: Date!){        
      allMdx(sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate } }} ) {
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

export default function ArchiveTemplate({ data, pageContext }) {
  const { year, month } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const title = `MONTHLY ARCHIVE: ${year}/${month}`
  console.log(title)

  return (
    <Layout title={title}>
      <Breadcrumb crumbs={crumbs} crumbLabel={year + "-" + month}/>
      <h1 className="pageTitle">{title}</h1>
      <Grid container spacing={3}>
      {
        data.allMdx.nodes.map(node => (
          <Grid item xs={6} sm={4}>
          <PostCard node={node} key={node.id} showExcerpt={true}/>
          </Grid>
        ))
      }
      </Grid>
    </Layout>
  )
}

