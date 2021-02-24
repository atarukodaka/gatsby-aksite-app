import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { useLocation } from "@reach/router"

import Layout from "../components/layout.js"
import { Post } from "../components/post.js"
import Siblings from '../components/siblings'
import directoryLabel from '../utils/directory_label'
import Share from '../components/share'

export const query = graphql`
    query ($slug: String!) {
      site { siteMetadata { siteUrl }}
      mdx(slug: { eq: $slug }){
        id
        slug
        tableOfContents
        body
        excerpt(pruneLength: 100)
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          toc
          image
        }
        fields {
          directory
        }        
      }
    }

`

export default function PostTemplate({ data, pageContext }) {
  const node = data.mdx
  const { breadcrumb: { crumbs } } = pageContext
  const { pathname } = useLocation()

  console.log(`create/template: ${node.slug} toc: ${node.frontmatter.toc}`)

  return (
    <Layout title={node.frontmatter.title} description={node.excerpt} image={node.frontmatter.image}>
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title} />

      <Post node={node} />

      <Share url={`${data.site.siteMetadata.siteUrl}${pathname}`} title={node.frontmatter.title} />

      <h4>Siblings on '{directoryLabel(node.fields.directory)}'</h4>
      <Siblings node={node} />
    </Layout>
  )
}
