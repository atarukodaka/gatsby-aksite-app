import React from "react"
import Layout from "../components/layout.js"
import { graphql, Link } from "gatsby"
import { PostExcerpt } from "../components/post.js"

export default function ArchiveTemplate ({ data, pageContext }) {
    //const { fromDate, toDate } = pageContext
    const { year, month } = pageContext
    //const dt = new Date(fromDate)
    //const year = dt.getFullYear()
    //const month = dt.getMonth() + 1
    
    console.log(`monthly archive template: ${year}/${month}`)
    return (
        <Layout>
            <h2>MONTHLY ARCHIVE: {year}/{month}</h2>
            <ul>
                {
                data.allMarkdownRemark.nodes.map(node => (
                   <PostExcerpt node={node}/>

                ))

                }
            </ul>
            
        </Layout>
    )
}

export const query = graphql`
    query($fromDate: Date!, $toDate: Date!){
        
      allMarkdownRemark(filter: { frontmatter: { date: { gte: $fromDate, lte: $toDate } }} ) {
        totalCount
        nodes { 
          fields { slug, folder }
          frontmatter { title, date }
        }
      }
    }
  `
