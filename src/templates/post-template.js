import React from "react"

import Layout from "../components/layout.js"
import Post from "../components/post.js"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import SEO from "../components/seo.js"
import Sibling from "../components/sibling.js"

export default function PostTemplate ({ pageContext }) {
  const { node } = pageContext
  const { breadcrumb: { crumbs } } = pageContext

  return (
    <Layout>
      <SEO title={node.frontmatter.title}></SEO>
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title}/>
      <Post node={node}/>

      <Sibling node={node}/>
    </Layout>
  )
}
