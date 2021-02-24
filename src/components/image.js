import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'


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

const Image = ( props ) => {
    const data = useStaticQuery(query)
    
    const image = data.images.nodes.find(node => 
        node.relativePath === props.filename
    )

    if (!image) { return (<span>NO SUCH IMAGE: {props.filename}</span>)}
    //return (<div>{image.childImageSharp.sizes.src}</div>)
    
    return (<Img fluid={image.childImageSharp.fluid} />)
}

export default Image