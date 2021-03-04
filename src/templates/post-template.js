import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

import Layout from "../components/Layout"
import Post from "../components/Post"

export const query = graphql`
    query ($slug: String!, $directory: String!) {
      site { siteMetadata { siteUrl }}
      mdx(fields: { slug: { eq: $slug }}){
        ...postFieldsBody
               
      }
      siblings: allMdx(filter: { fields: { directory: { eq: $directory} }}){
        nodes {
          ...postFields
        }
      }
    }

`

export default function PostTemplate({ data, pageContext }) {
  const node = data.mdx
  const { breadcrumb: { crumbs } } = pageContext
  
  console.log(`create/template: ${node.fields.slug}`)
  const image_url = node.frontmatter.cover?.publicURL

  return (
    <Layout title={node.frontmatter.title} description={node.frontmatter.description || node.excerpt} 
     image={image_url} tableOfContents={node.tableOfContents} >
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title} />

      <Post node={node} siblings={data.siblings} />

    </Layout>
  )
}
