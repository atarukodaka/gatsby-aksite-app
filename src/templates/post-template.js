import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Grid from '@material-ui/core/Grid'

import Layout from "../components/layout.js"
import directoryLabel from '../utils/directory_label'
import Post from "../components/post.js"
import PostCard from '../components/post_card'
import Img from 'gatsby-image'

export const query = graphql`
    query ($slug: String!, $directory: String!) {
      site { siteMetadata { siteUrl }}
      mdx(fields: { slug: { eq: $slug }}){
        id
        tableOfContents
        body
        excerpt(pruneLength: 100)
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          description
          cover { 
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        fields {
          slug, directory
        }        
      }
      siblings: allMdx(filter: { fields: { directory: { eq: $directory} }}){
        nodes {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            description
            cover { 
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug, directory
          }
        }
      }
    }

`

const Siblings = ( { nodes }) => (
  <nav>
    <Grid container spacing={3}>
      {nodes.slice(0, 9).map(v =>
        (<Grid item xs={12} sm={6} key={v.id}><PostCard node={v} /></Grid>))
      }
    </Grid>
  </nav>
)

export default function PostTemplate({ data, pageContext }) {
  const node = data.mdx
  
  const { breadcrumb: { crumbs } } = pageContext
  
  console.log(`create/template: ${node.fields.slug}`)

  return (
    <Layout title={node.frontmatter.title} description={node.frontmatter.description || node.excerpt} 
     image={node.frontmatter.image} tableOfContents={node.tableOfContents} 
     >
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title} />

      <Post node={node} />

      <h4>Siblings on '{directoryLabel(node.fields.directory)}'</h4>
      <Siblings nodes={data.siblings.nodes.filter(v => v.fields.slug !== node.fields.slug)} />
    </Layout>
  )
}
