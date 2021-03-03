import React from 'react'
import Img from 'gatsby-image'

const CoverImage = ( {node, ...props}) => (
    <div {...props}>
        {node.frontmatter.cover &&
         (<Img fluid={node.frontmatter.cover.childImageSharp.fluid}/>)}
    </div>
)

export default CoverImage
