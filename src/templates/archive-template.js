import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

import { PostExcerpt } from "../components/post.js"
import Layout from "../components/layout.js"


export default function ArchiveTemplate({ data, pageContext }) {
  const { year, month } = pageContext
  

  console.log(`monthly archive template: ${year}/${month}`)
  const { breadcrumb: { crumbs } } = pageContext

  return (
    <Layout>
      <Breadcrumb crumbs={crumbs} crumbLabel={year + "-" + month}/>
      <h2>MONTHLY ARCHIVE: {year}/{month}</h2>
      {
        data.allMdx.nodes.map(node => (
          <PostExcerpt node={node} key={node.id} />
        ))
      }
    </Layout>
  )
}

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
