import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"


const Sidebar = ( ) => {

    const data = useStaticQuery(
        graphql`
            {
                allMarkdownRemark {
                    nodes {
                        fields {
                            slug
                            folder
                        }

                    }
                }
            }

        `
    )
    //const folders = [...new Set(data.allMarkdownRemark.nodes.map ( node => node.fields.slug.split('/')[1]))]

    const hierarcies = [...new Set(data.allMarkdownRemark.nodes.map ( 
        node => node.fields.folder))
    ].filter(v=>v).sort()

    return (
        <div>
            <h2>Sidebar</h2>
            <ul>
                {
                    
                    hierarcies.map( hierarcy =>
                        (
                            //<li> { hierarcy }</li>
                            //<li><Link to="/workout">workout</Link></li>
                            <li key={hierarcy.id}>
                                <Link to={'/' + hierarcy}>{hierarcy}</Link>
                            </li>
                        )
                    )
                }
            </ul>

        </div>
    )
}

export default Sidebar