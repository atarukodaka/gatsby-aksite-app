import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const query = graphql`
  {
    file(relativePath: { eq: "wot.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400){
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const ImageTest = () => {
    const data = useStaticQuery(query)
    
    return (
    <div>
      <h1>Hello gatsby-image</h1>
      <Img fluid={data.file.childImageSharp.fluid} />
    </div>
  )
   }


  export default () => (
    <ImageTest/>
  )