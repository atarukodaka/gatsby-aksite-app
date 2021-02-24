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
                    sizes(maxWidth: 800){
                        ...GatsbyImageSharpSizes
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

    if (!image) { return (<>NO SUCH IMAGE: {filename}</>)}
    //return (<div>{image.childImageSharp.sizes.src}</div>)
    const imageSizes = image.childImageSharp.sizes
    return (<Img sizes={imageSizes} />)
}

export default Image