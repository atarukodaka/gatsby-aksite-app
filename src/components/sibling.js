import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const query = graphql`
{
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
            id
            frontmatter {
                title
            }
            fields { 
                directory
            }
            slug
        }

    }
}
`

const Sibling = ( { node }) => {
    const data = useStaticQuery(query)

    return (
        <div>
            <h4>SIBLINGS in '{node.fields.directory}'</h4>
            <ul>
            {
                data.allMdx.nodes.filter(v => v.fields.directory === node.fields.directory).map(v=>
                    {
                        if (node.slug === v.slug ){
                            return (<li key={v.id}>{v.frontmatter.title}</li>)
                        } else {
                        return (<li key={v.id}>
                            <Link to={'/' + v.slug}>
                            {v.frontmatter.title}
                        </Link>             

                        </li>)  
                        }
                    }
                )
            }
            </ul>
        </div>
)}

export default Sibling