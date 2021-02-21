import React from "react"
import { graphql, navigate } from "gatsby"
//import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
// import { Card, CardContent, CardMedia } from '@material-ui/core'
import Layout from "../components/layout.js"
import { PostExcerpt, PostCard } from "../components/post.js"
//import Test from "../../static/images/gatsby-4.png"
//import Img from 'gatsby-image'
import { Pagination } from '@material-ui/lab'

export const data = graphql`
  query ($skip: Int!, $limit: Int!){
    allMdx (sort: {fields: frontmatter___date, order: DESC},
      skip: $skip, limit: $limit){
      nodes {
        id
        frontmatter { title, date(formatString: "YYYY-MM-DD") }
        excerpt(pruneLength: 300)
        fields { directory}
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

  
  const handleChange = (event, p) => {
    navigate((p === 1) ? '/' : `/${p}`)
    //alert(p)
    /*
    if (p === 1){
      navigate('/')
    } else {
      navigate(`/${p}`)
    }
    */
    
          //setPage(value)
  }

  return (
    <Layout title={label}>  
      <Breadcrumb crumbs={crumbs} crumbLabel={label}/>
      {
        data.allMdx.nodes.map(node => (
            <PostExcerpt node={node} key={node.id}/>
        ))
      }
      
      <Pagination style={{}} count={numberOfPages} page={humanPageNumber} onChange={handleChange}/>
    </Layout>    
  )
}

export default IndexTemplate

