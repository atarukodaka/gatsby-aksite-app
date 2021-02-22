import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

import { PostExcerpt, PostCards } from "../components/post.js"
import Layout from "../components/layout.js"
import config from '../../config.js'


export const query = graphql`
    query($fromDate: Date!, $toDate: Date!, $pruneLength: Int!=200){        
      allMdx(sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate } }} ) {
        nodes { 
          id
          excerpt(truncate: true, pruneLength: $pruneLength)

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
      <PostCards nodes={data.allMdx.nodes} showExcerpt={true}/>
    </Layout>
  )
}

