import React from "react"
import Layout from "../components/layout.js"
import { graphql } from 'gatsby'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'


const AboutPage = ( { data, location, pageContext }  )  => {
  const { breadcrumb: { crumbs } } = pageContext

  return (
    <Layout location={location}>
      <Breadcrumb crumbs={crumbs} crumbLabel='About'/>
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
