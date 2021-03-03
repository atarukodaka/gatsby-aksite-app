import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

// images: allFile (filter: {sourceInstanceName: {eq: "images"}}){
const query = graphql`
    {
        images: allFile {
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

const Image = ( {filename, maxWidth = "100%"} ) => {
    const data = useStaticQuery(query)
    const styles = {
        maxWidth: maxWidth
    }
    
    const image = data.images.nodes.find(node => 
        node.relativePath === filename
    )

    if (!image) { 
        return (<span>NO SUCH IMAGE: {filename}</span>)
    } 
    //return (<Img fluid={image.childImageSharp.fluid} />)
    return (<div style={styles}><Img fluid={image.childImageSharp.fluid} /></div>)
}

Image.propTypes = {
    filename: PropTypes.string.isRequired,
    maxWidth: PropTypes.number
}

export default Image