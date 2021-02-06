import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import Post from "../components/post.js"

export default function PostTemplate ({ data }) {
  const node = data.markdownRemark

  return (<Layout><Post node={node}/></Layout>)

}


export const query = graphql`
    query($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        frontmatter {
          title
          date
        }
        fields {
          folder
        }
      }
    }
  `