import React from "react"
import { useStaticQuery } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { Grid } from '@material-ui/core'

import Layout from "../components/layout.js"
import { Post, PostCard } from "../components/post.js"

const Siblings = ({ node }) => {
  const data = useStaticQuery(graphql`
  {
    allMdx {
      nodes {
        id
        slug
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        fields { directory }
        excerpt(pruneLength: 100)
      }
    }
  }
  `)
  const siblings = data.allMdx.nodes.filter(v=> (v.fields.directory === node.fields.directory) && v.slug !== node.slug)
  const numberShow = 9
  return (
    <nav>
      <Grid container spacing={3}>
        { siblings.slice(0, numberShow).map(v =>
          (<Grid item xs={4} key={v.id}><PostCard node={v} /></Grid>))}

      </Grid>
    </nav>
  )

}

export default function PostTemplate({ pageContext }) {
  const { node } = pageContext
  const { breadcrumb: { crumbs } } = pageContext

  console.log(`create/template: ${node.slug} toc: ${node.frontmatter.toc}`)
  //const siblings = node.filter(v=>v.fields.directory == node.fields.directory)

  //console.log("siblings: ", siblings.length)
  
  //(v.slug === node.slug) ? v.frontmatter.title : <Link to={'/' + v.slug}>{v.frontmatter.title}</Link>
  return (
    <Layout title={node.frontmatter.title}>
      <Breadcrumb crumbs={crumbs} crumbLabel={node.frontmatter.title} />

      <Post node={node} />

      <h4>Siblings on '{node.fields.directory}'</h4>
      <Siblings node={node} />
    </Layout>
  )
}
