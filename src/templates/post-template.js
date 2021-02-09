import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import Post from "../components/post.js"

import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export default function PostTemplate ({ pageContext }) {
  //const node = data.mdx
  const { node } = pageContext
  const directory = pageContext.directory || ""
  const { breadcrumb: { crumbs } } = pageContext
  const directory_name = directory.toString().split('/').pop()
  //const directory_name = "asdf"


  return (
    <Layout>
      <Breadcrumb crumbs={crumbs} crumbLabel={directory_name}/>      
      <Post node={node}/>
    </Layout>)
}

/*
export const query = graphql`
    query($slug: String!) {
      mdx(fields: { slug: { eq: $slug } }) {
        body
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        fields {
          directory
        }
      }
    }
  `
  */