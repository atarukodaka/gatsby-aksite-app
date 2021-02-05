import React from "react"
import Layout from "../components/layout.js"
import { graphql } from 'gatsby'

const AboutPage = ( { data }  )  => {
  console.log(data)
  return (
    <Layout>
      <h1>About</h1>
      <p>title: { data.site.siteMetadata.title } </p>
      <p>author: { data.site.siteMetadata.author } </p>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`

export default AboutPage
