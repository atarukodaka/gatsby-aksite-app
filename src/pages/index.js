import React from "react"
import Layout from "../components/layout.js"
import { graphql, Link } from "gatsby"

const IndexPage = ( { data } ) => {
  return (
    <div>
      <Layout>
      <h2>Gatsby Index Page</h2>

        {
          data.allMarkdownRemark.nodes.map(node => (
            <div key={node.id}>
              <h3>
                <Link to={node.fields.slug}>
                {node.frontmatter.title}
                </Link>
              </h3>
              <p>date: {node.frontmatter.date}</p>
              <p>{node.text}</p>
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

