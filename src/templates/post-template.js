import React from "react"

import Layout from "../components/layout.js"
import Post from "../components/post.js"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export default function PostTemplate ({ pageContext }) {
  const { node } = pageContext
  const { breadcrumb: { crumbs } } = pageContext

  return (
    <Layout title={node.frontmatter.title}>
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title}/>
      <Post node={node}/>
    </Layout>
  )
}
