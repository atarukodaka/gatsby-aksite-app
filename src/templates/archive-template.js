import React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import { PostExcerpt } from "../components/post.js"

export default function ArchiveTemplate({ data, pageContext }) {
  const { year, month } = pageContext
  console.log(`monthly archive template: ${year}/${month}`)
  return (
    <Layout>
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
      allMdx(filter: { frontmatter: { date: { gte: $fromDate, lte: $toDate } }} ) {
        nodes { 
          excerpt(truncate: true)
          fields {
            slug, directory
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD"), title
          }        
          
        }
      }
    }
  `
