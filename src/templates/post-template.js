import React from "react"
import { Link } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { Grid } from '@material-ui/core'

import Layout from "../components/layout.js"
import { Post, PostCard } from "../components/post.js"


export default function PostTemplate ({ pageContext }) {
  const { node, siblings } = pageContext
  const { breadcrumb: { crumbs } } = pageContext

  console.log(`create/template: ${node.slug} toc: ${node.frontmatter.toc}`)
  //const siblings = node.filter(v=>v.fields.directory == node.fields.directory)

  console.log("siblings: ", siblings.length)
  const numberShow = 9
  //(v.slug === node.slug) ? v.frontmatter.title : <Link to={'/' + v.slug}>{v.frontmatter.title}</Link>
  return (
    <Layout title={node.frontmatter.title}>
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title}/>
      <Post node={node}/>

      <h4>Siblings on '{node.fields.directory}'</h4>
      <nav>
        <Grid container spacing={3}>
        {siblings && (siblings.slice(0, numberShow).map(v=>
          (<Grid item xs={4}><PostCard node={v} showExcerpt={true} disableLink={v.slug === node.slug}/></Grid>)))}

        </Grid>
      </nav>
    </Layout>
  )
}
