import React from "react"
import Layout from "../components/layout.js"
import { graphql } from 'gatsby'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import SEO from "../components/seo.js"

const AboutPage = ( { data, location, pageContext }  )  => {
  const { breadcrumb: { crumbs } } = pageContext

  //
  return (
    <Layout>
      <SEO title="about"></SEO>
      <Breadcrumb crumbs={crumbs} crumbLabel='About'/>
      <h2>About</h2>
      <p>title: { data.site.siteMetadata.title } </p>
      <p>author: { data.site.siteMetadata.author } </p>
    </Layout>
  )
}

export const query= graphql`
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
