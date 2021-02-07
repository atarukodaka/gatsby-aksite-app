import React from "react"
import Layout from "../components/layout.js"
import { graphql, Link } from "gatsby"

export default function ArchiveTemplate ({ data, pageContext }) {
    const { fromDate, toDate } = pageContext
    //const { year, month } = fromDate
    const dt = new Date(fromDate)
    const year = dt.getFullYear()
    const month = dt.getMonth() + 1
    
    console.log(`monthly archive template: ${year}/${month}`)
    return (
        <Layout>
            <h2>ARCHIVE ARCHIVE: {year}/{month}</h2>
            <ul>
                {
                data.allMarkdownRemark.nodes.map(node => (
                    <li key={node.id}>
                        <Link to={node.fields.slug}>
                        { node.frontmatter.title } [{node.frontmatter.date}]                 
                        </Link>
                        
                    </li>

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
          fields { slug }
          frontmatter { title, date }
        }
      }
    }
  `
