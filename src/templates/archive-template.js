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
        data.allMarkdownRemark.nodes.map(node => (
          <PostExcerpt node={node} />
        ))
      }
    </Layout>
  )
}

export const query = graphql`
    query($fromDate: Date!, $toDate: Date!){        
      allMarkdownRemark(filter: { frontmatter: { date: { gte: $fromDate, lte: $toDate } }} ) {
        nodes { 
          excerpt(truncate: true, format: PLAIN)
          fields {
            slug, folder
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD"), title
          }        
          
        }
      }
    }
  `
