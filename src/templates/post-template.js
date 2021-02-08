import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import Post from "../components/post.js"

export default function PostTemplate ({ data }) {
  const node = data.mdx

  return (<Layout><Post node={node}/></Layout>)

}


export const query = graphql`
    query($slug: String!) {
      mdx(fields: { slug: { eq: $slug } }) {
        body
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        fields {
          folder
        }
      }
    }
  `