import React from "react"
import { graphql, Link } from "gatsby"
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
        {previousPagePath ? <Link to={previousPagePath}>Prev Page</Link> : null }
			  {nextPagePath ? <Link to={nextPagePath}>Next Page</Link> : null }        
      </div>
    </Layout>    
  )
}


export default IndexTemplate

