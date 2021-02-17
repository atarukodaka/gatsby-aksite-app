import React from "react"
import { graphql, Link } from "gatsby"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
// import { Card, CardContent, CardMedia } from '@material-ui/core'
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"
//import Test from "../../static/images/gatsby-4.png"
//import Img from 'gatsby-image'

export const data = graphql`
  query ($skip: Int!, $limit: Int!){
    allMdx (sort: {fields: frontmatter___date, order: DESC},
      skip: $skip, limit: $limit){
      nodes {
        id
        frontmatter { title, date(formatString: "YYYY-MM-DD") }
        excerpt(truncate: true, pruneLength: 500)
        fields { directory}
        slug
      }
    }
  }
`

const IndexTemplate = ( { data, pageContext } ) => {
  const { previousPagePath, nextPagePath, humanPageNumber } = pageContext;
  const { breadcrumb: { crumbs } } = pageContext
  //console.log("pageContext: ", pageContext) 
  //console.log("crumbs: ", crumbs)

  const label = (humanPageNumber === 1) ? crumbs[0].crumbLabel : `index [${humanPageNumber}]`

  return (
    <Layout title={label}>  
      <Breadcrumb crumbs={crumbs} crumbLabel={label}/>
      {
        data.allMdx.nodes.map(node => (
            <PostExcerpt node={node} key={node.id}/>
        ))
      }
      
      <div>
        <span>
          {previousPagePath ? <Link to={previousPagePath}><ArrowBackIcon/>BACK</Link> : null }
        </span>
        ----
        <span>
			    {nextPagePath ? <Link to={nextPagePath}>NEXT<ArrowForwardIcon/></Link> : null }        
          </span>
      </div>
    </Layout>    
  )
}

export default IndexTemplate

