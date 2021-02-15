import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

import { PostExcerpt } from "../components/post.js"
import Layout from "../components/layout.js"

export const query = graphql`
    query($fromDate: Date!, $toDate: Date!){        
      allMdx(sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate } }} ) {
        nodes { 
          id
          excerpt(truncate: true)

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
      <h2>{title}</h2>
      {
        data.allMdx.nodes.map(node => (
          <PostExcerpt node={node} key={node.id} />
        ))
      }
    </Layout>
  )
}

