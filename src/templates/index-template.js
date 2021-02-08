import React from "react"
import { graphql, Link } from "gatsby"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"



export const data = graphql`
  query ($skip: Int!, $limit: Int!){
    allMdx (skip: $skip, limit: $limit){
      nodes {
        frontmatter { title, date(formatString: "YYYY-MM-DD") }
        excerpt(truncate: true)
        fields { slug, directory }
      }
    }
  }
`

const IndexTemplate = ( { data, pageContext } ) => {
  const { previousPagePath, nextPagePath } = pageContext;
  console.log(data) 
  return (
    <Layout>      
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

