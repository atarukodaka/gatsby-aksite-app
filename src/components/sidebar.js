import React from "react"
import { useStaticQuery } from "gatsby"

const Sidebar = ( ) => {

    const data = useStaticQuery(
        graphql`
            {
                allMarkdownRemark {
                    nodes {
                        fields {
                            slug
                        }

                    }
                }
            }

        `
    )
    const folders = [...new Set(data.allMarkdownRemark.nodes.map ( node => node.fields.slug.split('/')[1]))]




    return (
        <div>
            <h2>Sidebar</h2>
            <ul>
                {
                    folders.map( folder => (
                        <li> { folder }</li>
                    )

                    )
                }
            </ul>

        </div>
    )
}

export default Sidebar