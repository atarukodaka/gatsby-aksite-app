import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

import Layout from "../components/Layout"
import Post from "../components/Post"

export const query = graphql`
    query ($slug: String!) {
      site { siteMetadata { siteUrl }}
      mdx(fields: { slug: { eq: $slug }}){
        ...postFieldsBody
               
      }

      allMdx(sort: {fields: frontmatter___date, order: ASC}) {
        nodes {
          ...postFields
        }
      }
    }

`

export default function PostTemplate({ data, pageContext }) {
  console.log(`create/template: ${data.mdx.fields.slug}`)
  const node = data.mdx
  const { breadcrumb: { crumbs } } = pageContext
  
  const image_url = node.frontmatter.cover?.publicURL
  const index = data.allMdx.nodes.map(v=>v.id).indexOf(node.id)
  const prevPost = (index > 0) ? data.allMdx.nodes[index-1] : null
  const nextPost = (index < data.allMdx.nodes.length) ? data.allMdx.nodes[index+1] : null
  const siblings = data.allMdx.nodes.filter(v=> 
      (v.id !== node.id) && (v.fields.directory === node.fields.directory))

  return (
    <Layout title={node.frontmatter.title} 
      description={node.frontmatter.description || node.excerpt} 
      image={image_url} tableOfContents={node.tableOfContents} >
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title} />

      <Post node={node} siblings={siblings}
        prevPost={prevPost} nextPost={nextPost}/>
    </Layout>
  )
}
