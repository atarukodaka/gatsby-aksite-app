import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import Post from "../components/post.js"

import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export default function PostTemplate ({ pageContext }) {
  //const node = data.mdx
  const { node } = pageContext


  return (
    <Layout>
      <Post node={node}/>
    </Layout>)
}
