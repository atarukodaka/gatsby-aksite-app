import React from "react"
import { graphql, navigate } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"
import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'

export const data = graphql`
  query ($skip: Int!, $limit: Int!, $pruneLength: Int!=200){
    site {
      siteMetadata {
        description
      }
    }
    allMdx (sort: {fields: frontmatter___date, order: DESC},
      skip: $skip, limit: $limit){
      nodes {
        id
        frontmatter { title, date(formatString: "YYYY-MM-DD"), image }
        excerpt(pruneLength: $pruneLength)
        fields { directory }
        tableOfContents
        slug
      }
    }
  }
`

const IndexTemplate = ( { data, pageContext } ) => {
  const { humanPageNumber, numberOfPages } = pageContext;
  const { breadcrumb: { crumbs } } = pageContext
  //console.log("pageContext: ", pageContext) 
  //console.log("crumbs: ", crumbs)

  const label = (humanPageNumber === 1) ? crumbs[0].crumbLabel : `index [${humanPageNumber}]`

  
  const handleChange = (_event, p) => {
    navigate((p === 1) ? '/' : `/${p}`)
  }

  return (
    <Layout title={label}>  
      <Breadcrumb crumbs={crumbs} crumbLabel={label}/>
      
      {data.allMdx.nodes.map(node=>(
        <PostExcerpt node={node}/>
      ))}
      {/* <PostCards nodes={data.allMdx.nodes} showExcerpt={true}/> */}
      
      <Box justifyContent="center">
      <Pagination style={{}} count={numberOfPages} page={humanPageNumber} onChange={handleChange}/>
      </Box>
    </Layout>    
  )
}

export default IndexTemplate

