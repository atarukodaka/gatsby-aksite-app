import React from "react"
import Layout from "../components/layout.js"
import { graphql } from 'gatsby'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

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

const AboutPage = ( { data, pageContext }  )  => {
  const { breadcrumb: { crumbs } } = pageContext

  //
  return (
    <Layout title="about">
      <Breadcrumb crumbs={crumbs} crumbLabel='About'/>
      <h2 className="pageTitle">About</h2>
      <p>title: { data.site.siteMetadata.title } </p>
      <p>author: { data.site.siteMetadata.author } </p>
      <p>description: { data.site.siteMetadata.description } </p>
    </Layout>
  )
}


export default AboutPage
