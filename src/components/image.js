import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const query = graphql`
    {
        images: allFile (filter: {sourceInstanceName: {eq: "images"}}){
            nodes {
                relativePath
                name
                childImageSharp {
                    fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }

    }
`

const Image = ( {filename} ) => {
    const data = useStaticQuery(query)
    
    const image = data.images.nodes.find(node => 
        node.relativePath === filename
    )

    if (!image) { 
        return (<span>NO SUCH IMAGE: {filename}</span>)
    } 
    return (<Img fluid={image.childImageSharp.fluid} />)
}

Image.propTypes = {
    filename: PropTypes.string.isRequired
}

export default Image