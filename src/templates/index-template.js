import React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import { PostExcerpt } from "../components/post.js"


const IndexTemplate = ( { data } ) => {
  console.log(data) 
  return (
    <Layout>      
    {
      data.allMdx.nodes.map(node => (
          <PostExcerpt node={node} key={node.id}/>
      ))
    }
    </Layout>    
  )
}


export default IndexTemplate

