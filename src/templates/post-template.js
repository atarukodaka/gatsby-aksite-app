import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { useLocation } from "@reach/router"
import Grid from '@material-ui/core/Grid'

import Layout from "../components/layout.js"
import { Post } from "../components/post.js"
import directoryLabel from '../utils/directory_label'
import Share from '../components/share'
import PostCard from '../components/post_card'

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
          toc
          image
          description
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
            image
            description
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
  const { pathname } = useLocation()

  console.log(`create/template: ${node.fields.slug}`)

  return (
    <Layout title={node.frontmatter.title} description={node.frontmatter.description || node.excerpt} image={node.frontmatter.image} node={node}>
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title} />

      <Post node={node} />

      <Share url={`${data.site.siteMetadata.siteUrl}${pathname}`} title={node.frontmatter.title} />

      <h4>Siblings on '{directoryLabel(node.fields.directory)}'</h4>
      <Siblings nodes={data.siblings.nodes.filter(v => v.fields.slug !== node.fields.slug)} />
    </Layout>
  )
}
