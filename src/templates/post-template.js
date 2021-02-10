import React from "react"

import Layout from "../components/layout.js"
import Post from "../components/post.js"

export default function PostTemplate ({ pageContext }) {
  const { node } = pageContext

  return (
    <Layout>
      <Post node={node}/>
    </Layout>
  )
}
