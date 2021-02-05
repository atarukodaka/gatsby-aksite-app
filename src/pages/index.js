import React from "react"
import Layout from "../components/layout.js"
import { graphql, Link } from "gatsby"

const IndexPage = ( { data } ) => {
  return (
    <div>
      <Layout>
      <h1>Gatsby Index Page</h1>

      <h2>Markup Files</h2>
      
        {
          data.allMarkdownRemark.nodes.map(node => (
            <div key={node.id}>
              <h2>
                <Link to={node.fields.slug}>
                {node.frontmatter.title}
                </Link>
              </h2>
              <p>{node.frontmatter.date}</p>
            </div>
            )
          )
        }


      </Layout>


    </div>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      nodes {
        html
        fields {
          slug
        }
        frontmatter {
          date
          title
        }
      }
    }
  }
`

export default IndexPage

