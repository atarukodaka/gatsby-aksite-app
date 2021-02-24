import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
//import { Grid } from '@material-ui/core'

import Layout from "../components/layout.js"
import { Post } from "../components/post.js"
import Siblings from '../components/siblings'
import DirectoryLabel from '../components/directory_label'

export const query = graphql`
    query ($slug: String!) {
      mdx(slug: { eq: $slug }){
        id
        slug
        tableOfContents
        body
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
  //const { node } = pageContext
  const node = data.mdx
  const { breadcrumb: { crumbs } } = pageContext

  console.log(`create/template: ${node.slug} toc: ${node.frontmatter.toc}`)
  //const siblings = node.filter(v=>v.fields.directory == node.fields.directory)

  //console.log("siblings: ", siblings.length)

  //(v.slug === node.slug) ? v.frontmatter.title : <Link to={'/' + v.slug}>{v.frontmatter.title}</Link>
  return (
    <Layout title={node.frontmatter.title}>
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title} />

      <Post node={node} />

      <h4>Siblings on '{DirectoryLabel(node.fields.directory)}'</h4>
      <Siblings node={node} />
    </Layout>
  )
}
